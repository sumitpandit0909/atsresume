import { VercelRequest, VercelResponse } from '@vercel/node';
import { deepSeekService } from '../server/lib/deepseek-service';
import { rateLimiter } from '../server/lib/rate-limiter';

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
    const rateLimitResult = await rateLimiter.checkRateLimit(req);
    
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

    res.json({
      success: true,
      analysis: analysisResult,
    });
  } catch (error) {
    console.error("AI analysis route error:", error);
    res.status(500).json({
      error: "Failed to analyze resume with AI",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
