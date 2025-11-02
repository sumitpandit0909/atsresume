import { VercelRequest, VercelResponse } from '@vercel/node';

// Inline rate limiter for serverless environment
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

  public async recordAnalysis(ip: string): Promise<void> {
    const now = Date.now();
    
    this.rateLimitData[ip] = {
      ip,
      lastAnalysis: now,
      attempts: (this.rateLimitData[ip]?.attempts || 0) + 1
    };

    console.log(`📝 Recorded analysis for IP: ${ip}, attempts: ${this.rateLimitData[ip].attempts}`);
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
}

// Global rate limiter instance (shared across all serverless functions)
// Note: In serverless environment, this is per-instance, not truly global
// For production, consider using Redis or similar external storage
const rateLimiter = new ServerlessRateLimiter();

// Inline DeepSeek service for serverless environment
interface AIAnalysisResult {
  overallAssessment: string;
  contentQuality: {
    score: number;
    strengths: string[];
    weaknesses: string[];
  };
  industryAlignment: {
    suggestedIndustries: string[];
    alignmentScore: number;
  };
  skillGaps: {
    missingSkills: string[];
    recommendations: string[];
  };
  improvementSuggestions: string[];
  atsOptimization: string[];
  summary: string;
}

interface DeepSeekMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface DeepSeekResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

class DeepSeekService {
  private DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || "sk-bdf489701de9456db33589432a13fadf";
  private DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

  private async callDeepSeekAPI(messages: DeepSeekMessage[]): Promise<string> {
    try {
      const response = await fetch(this.DEEPSEEK_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages,
          temperature: 0.7,
          max_tokens: 4000,
        }),
      });

      if (!response.ok) {
        throw new Error(`DeepSeek API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json() as DeepSeekResponse;
      
      if (!data.choices?.[0]?.message?.content) {
        throw new Error("Invalid response format from DeepSeek API");
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.error("DeepSeek API call failed:", error);
      throw new Error(`Failed to analyze resume with AI: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  async analyzeResume(resumeText: string): Promise<AIAnalysisResult> {
    const systemPrompt = `You are an expert resume analyst and career coach. Analyze the provided resume and provide comprehensive feedback in the following structured JSON format:

{
  "overallAssessment": "A comprehensive summary of the resume's strengths and overall quality",
  "contentQuality": {
    "score": 85,
    "strengths": ["List of 3-5 key strengths"],
    "weaknesses": ["List of 3-5 areas needing improvement"]
  },
  "industryAlignment": {
    "suggestedIndustries": ["List of 3-5 suitable industries"],
    "alignmentScore": 80
  },
  "skillGaps": {
    "missingSkills": ["List of 3-5 missing skills for target roles"],
    "recommendations": ["List of 3-5 skill development recommendations"]
  },
  "improvementSuggestions": ["List of 5-7 specific improvement suggestions"],
  "atsOptimization": ["List of 3-5 ATS optimization tips"],
  "summary": "A brief concluding summary with key recommendations"
}

Focus on:
1. Professional impact and achievement language
2. Skills relevance to current job market
3. Career progression and growth potential
4. Industry trends and requirements
5. ATS compatibility beyond basic formatting

Provide honest, constructive feedback that helps the candidate improve their resume.`;

    const userPrompt = `Please analyze this resume and provide the structured feedback as requested:

${resumeText.substring(0, 12000)}`; // Limit text length to avoid token limits

    const messages: DeepSeekMessage[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ];

    try {
      const aiResponse = await this.callDeepSeekAPI(messages);
      
      // Parse the JSON response from AI
      let parsedResult;
      try {
        // Extract JSON from the response (in case there's additional text)
        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedResult = JSON.parse(jsonMatch[0]);
        } else {
          parsedResult = JSON.parse(aiResponse);
        }
      } catch (parseError) {
        console.error("Failed to parse AI response:", aiResponse);
        throw new Error("AI analysis returned invalid format");
      }

      // Validate and return the result
      return {
        overallAssessment: parsedResult.overallAssessment || "No assessment provided",
        contentQuality: {
          score: parsedResult.contentQuality?.score || 0,
          strengths: parsedResult.contentQuality?.strengths || [],
          weaknesses: parsedResult.contentQuality?.weaknesses || []
        },
        industryAlignment: {
          suggestedIndustries: parsedResult.industryAlignment?.suggestedIndustries || [],
          alignmentScore: parsedResult.industryAlignment?.alignmentScore || 0
        },
        skillGaps: {
          missingSkills: parsedResult.skillGaps?.missingSkills || [],
          recommendations: parsedResult.skillGaps?.recommendations || []
        },
        improvementSuggestions: parsedResult.improvementSuggestions || [],
        atsOptimization: parsedResult.atsOptimization || [],
        summary: parsedResult.summary || "No summary provided"
      };
    } catch (error) {
      console.error("DeepSeek analysis failed:", error);
      // Return a fallback analysis if AI fails
      return this.getFallbackAnalysis(resumeText);
    }
  }

  private getFallbackAnalysis(resumeText: string): AIAnalysisResult {
    // Provide basic analysis when AI fails
    const wordCount = resumeText.split(/\s+/).length;
    const hasExperience = /experience|work|employment/i.test(resumeText);
    const hasEducation = /education|degree|university|college/i.test(resumeText);
    const hasSkills = /skills|technologies|programming|tools/i.test(resumeText);

    return {
      overallAssessment: "Basic analysis completed. For more detailed insights, please try the AI analysis again.",
      contentQuality: {
        score: hasExperience && hasEducation && hasSkills ? 70 : 50,
        strengths: hasExperience ? ["Professional experience included"] : [],
        weaknesses: !hasSkills ? ["Skills section could be more detailed"] : []
      },
      industryAlignment: {
        suggestedIndustries: ["General Business", "Technology", "Professional Services"],
        alignmentScore: 60
      },
      skillGaps: {
        missingSkills: ["Consider adding more specific technical skills"],
        recommendations: ["Include relevant certifications and training"]
      },
      improvementSuggestions: [
        "Add quantifiable achievements to experience section",
        "Include relevant keywords for your target industry",
        "Ensure consistent formatting throughout"
      ],
      atsOptimization: [
        "Use standard section headings",
        "Include relevant keywords",
        "Avoid complex formatting"
      ],
      summary: "This is a basic analysis. For comprehensive AI-powered insights, please try the analysis again."
    };
  }
}

const deepSeekService = new DeepSeekService();

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
    // Check rate limit first
    const rateLimitResult = rateLimiter.checkRateLimit(req);
    
    if (!rateLimitResult.allowed) {
      const hours = Math.floor((rateLimitResult.remainingTime || 0) / (60 * 60 * 1000));
      const minutes = Math.floor(((rateLimitResult.remainingTime || 0) % (60 * 60 * 1000)) / (60 * 1000));
      
      return res.status(429).json({
        error: "Rate limit exceeded",
        message: `You can perform another AI analysis in ${hours}h ${minutes}m`,
        remainingTime: rateLimitResult.remainingTime,
        nextAvailable: rateLimitResult.nextAvailable?.toISOString(),
        type: "RATE_LIMIT"
      });
    }

    const { resumeText } = req.body;

    if (!resumeText || typeof resumeText !== 'string') {
      return res.status(400).json({
        error: "Resume text is required",
      });
    }

    // Validate text length
    if (resumeText.length < 100) {
      return res.status(400).json({
        error: "Resume text is too short for meaningful analysis",
      });
    }

    if (resumeText.length > 20000) {
      return res.status(400).json({
        error: "Resume text is too long. Please limit to 20,000 characters",
      });
    }

    // Analyze resume with DeepSeek AI
    const analysisResult = await deepSeekService.analyzeResume(resumeText);

    // Record successful analysis for rate limiting
    await rateLimiter.recordAnalysis(rateLimitResult.ip);

    const rateLimitInfo = {
      remainingTime: rateLimitResult.remainingTime || 0,
      nextAvailable: rateLimitResult.nextAvailable?.toISOString() || null,
      allowed: rateLimitResult.allowed
    };

    console.log("📊 Sending rate limit info:", rateLimitInfo);

    res.json({
      success: true,
      analysis: analysisResult,
      rateLimitInfo: rateLimitInfo
    });
  } catch (error) {
    console.error("AI analysis route error:", error);
    res.status(500).json({
      error: "Failed to analyze resume with AI",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
