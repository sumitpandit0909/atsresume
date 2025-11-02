import { VercelRequest, VercelResponse } from '@vercel/node';

// Inline rate limiter for serverless environment (same as in other routes)
interface RateLimitEntry {
  ip: string;
  lastAnalysis: number; // timestamp
  attempts: number;
}

interface RateLimitData {
  [ip: string]: RateLimitEntry;
}

class ServerlessRateLimiter {
  private rateLimitData: RateLimitData = {};
  private readonly COOLDOWN_HOURS = 1; // 1 hour cooldown
  private readonly COOLDOWN_MS = this.COOLDOWN_HOURS * 60 * 60 * 1000;

  constructor() {
    // Clean up old entries every 5 minutes
    setInterval(() => this.cleanupOldEntries(), 5 * 60 * 1000);
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

  // Reset method for testing
  public reset(): void {
    this.rateLimitData = {};
    console.log('🔄 Rate limit data reset');
  }

  // Reset specific IP
  public resetIP(ip: string): void {
    if (this.rateLimitData[ip]) {
      delete this.rateLimitData[ip];
      console.log(`🔄 Rate limit reset for IP: ${ip}`);
    }
  }
}

const rateLimiter = new ServerlessRateLimiter();

// Main API handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers for Vercel deployment
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { ip: targetIP } = req.body;
    const clientIP = rateLimiter.getClientIP(req);

    // If no specific IP provided, reset the current client's rate limit
    const ipToReset = targetIP || clientIP;

    // Reset the rate limit for the specified IP
    rateLimiter.resetIP(ipToReset);

    res.json({
      success: true,
      message: `Rate limit reset for IP: ${ipToReset}`,
      resetIP: ipToReset,
      clientIP: clientIP
    });
  } catch (error) {
    console.error("Reset rate limit route error:", error);
    res.status(500).json({
      error: "Failed to reset rate limit",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
