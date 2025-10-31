import fs from 'fs/promises';
import path from 'path';

interface RateLimitEntry {
  ip: string;
  lastAnalysis: number; // timestamp
  attempts: number;
}

interface RateLimitData {
  [ip: string]: RateLimitEntry;
}

export class RateLimiter {
  private dataPath: string;
  private rateLimitData: RateLimitData = {};
  private readonly COOLDOWN_HOURS = 1; // 1 hour cooldown
  private readonly COOLDOWN_MS = this.COOLDOWN_HOURS * 60 * 60 * 1000;

  constructor() {
    this.dataPath = path.join(process.cwd(), 'rate-limit-data.json');
    this.loadData();
    
    // Clean up old entries every 5 minutes
    setInterval(() => this.cleanupOldEntries(), 5 * 60 * 1000);
  }

  public async loadData(): Promise<void> {
    try {
      const data = await fs.readFile(this.dataPath, 'utf-8');
      this.rateLimitData = JSON.parse(data);
      console.log('✅ Rate limit data loaded:', Object.keys(this.rateLimitData).length, 'entries');
    } catch (error) {
      // File doesn't exist or is invalid, start with empty data
      this.rateLimitData = {};
      console.log('📝 Starting with empty rate limit data');
    }
  }

  private async saveData(): Promise<void> {
    try {
      await fs.writeFile(this.dataPath, JSON.stringify(this.rateLimitData, null, 2));
    } catch (error) {
      console.error('❌ Failed to save rate limit data:', error);
    }
  }

  private cleanupOldEntries(): void {
    const now = Date.now();
    const cooldownAgo = now - this.COOLDOWN_MS;
    let cleanedCount = 0;
    
    Object.keys(this.rateLimitData).forEach(ip => {
      const entry = this.rateLimitData[ip];
      if (entry.lastAnalysis < cooldownAgo) {
        delete this.rateLimitData[ip];
        cleanedCount++;
      }
    });
    
    if (cleanedCount > 0) {
      console.log(`🧹 Cleaned ${cleanedCount} old rate limit entries`);
      this.saveData();
    }
  }

  public getClientIP(req: any): string {
    // Simple and reliable IP detection
    let ip = 'unknown';
    
    // Try common IP headers in order
    if (req.headers['x-forwarded-for']) {
      ip = req.headers['x-forwarded-for'].split(',')[0].trim();
      console.log('🌐 IP from x-forwarded-for:', ip);
    } else if (req.headers['x-real-ip']) {
      ip = req.headers['x-real-ip'];
      console.log('🌐 IP from x-real-ip:', ip);
    } else if (req.ip) {
      ip = req.ip;
      console.log('🌐 IP from req.ip:', ip);
    } else if (req.connection?.remoteAddress) {
      ip = req.connection.remoteAddress;
      console.log('🌐 IP from connection.remoteAddress:', ip);
    } else if (req.socket?.remoteAddress) {
      ip = req.socket.remoteAddress;
      console.log('🌐 IP from socket.remoteAddress:', ip);
    } else {
      console.log('⚠️  Could not detect IP, using "unknown"');
    }
    
    // Handle IPv6 format
    if (ip.includes('::ffff:')) {
      ip = ip.split(':').pop() || ip;
    }
    
    // For localhost testing, use a consistent identifier
    if (ip === '::1' || ip === '127.0.0.1' || ip === 'localhost') {
      ip = 'localhost';
    }
    
    return ip;
  }

  public canAnalyze(ip: string): { allowed: boolean; remainingTime?: number; nextAvailable?: Date } {
    const now = Date.now();
    const entry = this.rateLimitData[ip];

    console.log(`🔍 Rate limit check for IP: ${ip}`, entry ? 'has entry' : 'no entry');

    if (!entry) {
      console.log('✅ Rate limit: Allowed (no previous analysis)');
      return { allowed: true };
    }

    const cooldownEnd = entry.lastAnalysis + this.COOLDOWN_MS;
    
    if (now < cooldownEnd) {
      const remainingTime = cooldownEnd - now;
      const minutes = Math.floor(remainingTime / 60000);
      const seconds = Math.floor((remainingTime % 60000) / 1000);
      
      console.log(`⏰ Rate limit: Denied - ${minutes}m ${seconds}s remaining`);
      return { 
        allowed: false, 
        remainingTime,
        nextAvailable: new Date(cooldownEnd)
      };
    }

    console.log('✅ Rate limit: Allowed (cooldown expired)');
    return { allowed: true };
  }

  public async recordAnalysis(ip: string): Promise<void> {
    const now = Date.now();
    
    this.rateLimitData[ip] = {
      ip,
      lastAnalysis: now,
      attempts: (this.rateLimitData[ip]?.attempts || 0) + 1
    };

    console.log(`📝 Recorded analysis for IP: ${ip}, attempts: ${this.rateLimitData[ip].attempts}`);
    
    await this.saveData();
  }

  public getRemainingTime(ip: string): number | null {
    const entry = this.rateLimitData[ip];
    if (!entry) return null;

    const now = Date.now();
    const cooldownEnd = entry.lastAnalysis + this.COOLDOWN_MS;
    
    return Math.max(0, cooldownEnd - now);
  }

  public checkRateLimit(req: any): { 
    allowed: boolean; 
    remainingTime?: number; 
    nextAvailable?: Date;
    ip: string;
  } {
    const ip = this.getClientIP(req);
    const result = this.canAnalyze(ip);
    
    return {
      ...result,
      ip
    };
  }

  // Debug method to get current rate limit status
  public getStatus(): { totalEntries: number; entries: RateLimitData } {
    return {
      totalEntries: Object.keys(this.rateLimitData).length,
      entries: this.rateLimitData
    };
  }
}

export const rateLimiter = new RateLimiter();
