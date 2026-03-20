import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { deepSeekService } from "./lib/deepseek-service";
import { rateLimiter } from "./lib/rate-limiter";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // AI Analysis Route
  app.post("/api/ai-analyze", async (req, res) => {
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

      if (!resumeText || typeof resumeText !== "string") {
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
  });

  // Debug endpoint to check rate limit status
  app.get("/api/rate-limit-status", (req, res) => {
    const status = rateLimiter.getStatus();
    const clientIP = rateLimiter.getClientIP(req);
    const remainingTime = rateLimiter.getRemainingTime(clientIP);
    
    res.json({
      clientIP,
      remainingTime,
      status: {
        totalEntries: status.totalEntries,
        entries: status.entries
      }
    });
  });

  // Reset rate limit for testing
  app.post("/api/reset-rate-limit", async (req, res) => {
    try {
      // This would normally require authentication
      // For testing, we'll allow it
      const clientIP = rateLimiter.getClientIP(req);
      
      // Create a new rate limiter instance to clear data
      // In production, you'd want a proper reset method
      const fs = require('fs/promises');
      const path = require('path');
      const dataPath = path.join(process.cwd(), 'rate-limit-data.json');
      
      await fs.writeFile(dataPath, JSON.stringify({}, null, 2));
      
      // Reload the data
      await rateLimiter.loadData();
      
      res.json({
        success: true,
        message: `Rate limit reset for IP: ${clientIP}`,
        clientIP
      });
    } catch (error) {
      res.status(500).json({
        error: "Failed to reset rate limit",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });


  const httpServer = createServer(app);

  return httpServer;
}
