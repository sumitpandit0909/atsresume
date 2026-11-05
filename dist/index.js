var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/lib/openrouter-service.ts
var OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
var OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
var OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "deepseek/deepseek-v4.1-flash-1017";
var SITE_URL = process.env.SITE_URL || "https://www.atsscorecheckerfree.com";
var OpenRouterService = class {
  async callOpenRouterAPI(messages) {
    if (!OPENROUTER_API_KEY) {
      throw new Error("OPENROUTER_API_KEY is not configured");
    }
    try {
      const response = await fetch(OPENROUTER_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": SITE_URL,
          "X-Title": "ATS Resume Checker"
        },
        body: JSON.stringify({
          model: OPENROUTER_MODEL,
          messages,
          temperature: 0.7,
          max_tokens: 4e3
        })
      });
      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      if (!data.choices?.[0]?.message?.content) {
        throw new Error("Invalid response format from OpenRouter API");
      }
      return data.choices[0].message.content;
    } catch (error) {
      console.error("OpenRouter API call failed:", error);
      throw new Error(`Failed to analyze resume with AI: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
  async analyzeResume(resumeText) {
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

${resumeText.substring(0, 12e3)}`;
    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ];
    try {
      const aiResponse = await this.callOpenRouterAPI(messages);
      let parsedResult;
      try {
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
      console.error("AI analysis failed:", error);
      return this.getFallbackAnalysis(resumeText);
    }
  }
  getFallbackAnalysis(resumeText) {
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
};
var openRouterService = new OpenRouterService();

// server/lib/rate-limiter.ts
import fs from "fs/promises";
import path from "path";
var RateLimiter = class {
  dataPath;
  rateLimitData = {};
  COOLDOWN_HOURS = 1;
  // 1 hour cooldown
  COOLDOWN_MS = this.COOLDOWN_HOURS * 60 * 60 * 1e3;
  constructor() {
    this.dataPath = path.join(process.cwd(), "rate-limit-data.json");
    this.loadData();
    setInterval(() => this.cleanupOldEntries(), 5 * 60 * 1e3);
  }
  async loadData() {
    try {
      const data = await fs.readFile(this.dataPath, "utf-8");
      this.rateLimitData = JSON.parse(data);
      console.log("\u2705 Rate limit data loaded:", Object.keys(this.rateLimitData).length, "entries");
    } catch (error) {
      this.rateLimitData = {};
      console.log("\u{1F4DD} Starting with empty rate limit data");
    }
  }
  async saveData() {
    try {
      await fs.writeFile(this.dataPath, JSON.stringify(this.rateLimitData, null, 2));
    } catch (error) {
      console.error("\u274C Failed to save rate limit data:", error);
    }
  }
  cleanupOldEntries() {
    const now = Date.now();
    const cooldownAgo = now - this.COOLDOWN_MS;
    let cleanedCount = 0;
    Object.keys(this.rateLimitData).forEach((ip) => {
      const entry = this.rateLimitData[ip];
      if (entry.lastAnalysis < cooldownAgo) {
        delete this.rateLimitData[ip];
        cleanedCount++;
      }
    });
    if (cleanedCount > 0) {
      console.log(`\u{1F9F9} Cleaned ${cleanedCount} old rate limit entries`);
      this.saveData();
    }
  }
  getClientIP(req) {
    let ip = "unknown";
    if (req.headers["x-forwarded-for"]) {
      ip = req.headers["x-forwarded-for"].split(",")[0].trim();
      console.log("\u{1F310} IP from x-forwarded-for:", ip);
    } else if (req.headers["x-real-ip"]) {
      ip = req.headers["x-real-ip"];
      console.log("\u{1F310} IP from x-real-ip:", ip);
    } else if (req.ip) {
      ip = req.ip;
      console.log("\u{1F310} IP from req.ip:", ip);
    } else if (req.connection?.remoteAddress) {
      ip = req.connection.remoteAddress;
      console.log("\u{1F310} IP from connection.remoteAddress:", ip);
    } else if (req.socket?.remoteAddress) {
      ip = req.socket.remoteAddress;
      console.log("\u{1F310} IP from socket.remoteAddress:", ip);
    } else {
      console.log('\u26A0\uFE0F  Could not detect IP, using "unknown"');
    }
    if (ip.includes("::ffff:")) {
      ip = ip.split(":").pop() || ip;
    }
    if (ip === "::1" || ip === "127.0.0.1" || ip === "localhost") {
      ip = "localhost";
    }
    return ip;
  }
  canAnalyze(ip) {
    const now = Date.now();
    const entry = this.rateLimitData[ip];
    console.log(`\u{1F50D} Rate limit check for IP: ${ip}`, entry ? "has entry" : "no entry");
    if (!entry) {
      console.log("\u2705 Rate limit: Allowed (no previous analysis)");
      return { allowed: true };
    }
    const cooldownEnd = entry.lastAnalysis + this.COOLDOWN_MS;
    if (now < cooldownEnd) {
      const remainingTime = cooldownEnd - now;
      const minutes = Math.floor(remainingTime / 6e4);
      const seconds = Math.floor(remainingTime % 6e4 / 1e3);
      console.log(`\u23F0 Rate limit: Denied - ${minutes}m ${seconds}s remaining`);
      return {
        allowed: false,
        remainingTime,
        nextAvailable: new Date(cooldownEnd)
      };
    }
    console.log("\u2705 Rate limit: Allowed (cooldown expired)");
    return { allowed: true };
  }
  async recordAnalysis(ip) {
    const now = Date.now();
    this.rateLimitData[ip] = {
      ip,
      lastAnalysis: now,
      attempts: (this.rateLimitData[ip]?.attempts || 0) + 1
    };
    console.log(`\u{1F4DD} Recorded analysis for IP: ${ip}, attempts: ${this.rateLimitData[ip].attempts}`);
    await this.saveData();
  }
  getRemainingTime(ip) {
    const entry = this.rateLimitData[ip];
    if (!entry) return null;
    const now = Date.now();
    const cooldownEnd = entry.lastAnalysis + this.COOLDOWN_MS;
    return Math.max(0, cooldownEnd - now);
  }
  checkRateLimit(req) {
    const ip = this.getClientIP(req);
    const result = this.canAnalyze(ip);
    return {
      ...result,
      ip
    };
  }
  // Debug method to get current rate limit status
  getStatus() {
    return {
      totalEntries: Object.keys(this.rateLimitData).length,
      entries: this.rateLimitData
    };
  }
};
var rateLimiter = new RateLimiter();

// server/routes.ts
async function registerRoutes(app2) {
  app2.post("/api/ai-analyze", async (req, res) => {
    try {
      const rateLimitResult = await rateLimiter.checkRateLimit(req);
      if (!rateLimitResult.allowed) {
        const hours = Math.floor((rateLimitResult.remainingTime || 0) / (60 * 60 * 1e3));
        const minutes = Math.floor((rateLimitResult.remainingTime || 0) % (60 * 60 * 1e3) / (60 * 1e3));
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
          error: "Resume text is required"
        });
      }
      if (resumeText.length < 100) {
        return res.status(400).json({
          error: "Resume text is too short for meaningful analysis"
        });
      }
      if (resumeText.length > 2e4) {
        return res.status(400).json({
          error: "Resume text is too long. Please limit to 20,000 characters"
        });
      }
      const analysisResult = await openRouterService.analyzeResume(resumeText);
      await rateLimiter.recordAnalysis(rateLimitResult.ip);
      res.json({
        success: true,
        analysis: analysisResult
      });
    } catch (error) {
      console.error("AI analysis route error:", error);
      res.status(500).json({
        error: "Failed to analyze resume with AI",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.get("/api/rate-limit-status", (req, res) => {
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
  app2.post("/api/reset-rate-limit", async (req, res) => {
    try {
      const clientIP = rateLimiter.getClientIP(req);
      const fs3 = __require("fs/promises");
      const path4 = __require("path");
      const dataPath = path4.join(process.cwd(), "rate-limit-data.json");
      await fs3.writeFile(dataPath, JSON.stringify({}, null, 2));
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs2 from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { copyFileSync } from "fs";
var copySEOFiles = () => {
  return {
    name: "copy-seo-files",
    writeBundle() {
      try {
        copyFileSync("public/sitemap.xml", "dist/public/sitemap.xml");
        copyFileSync("public/robots.txt", "dist/public/robots.txt");
        copyFileSync("public/ads.txt", "dist/public/ads.txt");
        console.log("\u2705 SEO files copied to dist/public/");
      } catch (error) {
        console.warn("\u26A0\uFE0F Could not copy SEO files:", error);
      }
    }
  };
};
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    copySEOFiles(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      ),
      await import("@replit/vite-plugin-dev-banner").then(
        (m) => m.devBanner()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path2.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  console.log("viteConfig is:", vite_config_default);
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(import.meta.dirname, "..", "dist", "public");
  if (!fs2.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.status(404).sendFile(path3.resolve(distPath, "404.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
  });
})();
