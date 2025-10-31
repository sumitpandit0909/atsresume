import { z } from "zod";

// Resume Analysis Result Types
export const suggestionSchema = z.object({
  id: z.string(),
  category: z.enum(["critical", "recommended", "good"]),
  type: z.enum(["formatting", "keywords", "structure", "readability"]),
  title: z.string(),
  description: z.string(),
  passed: z.boolean(),
  // Enhanced fields for detailed feedback
  currentIssue: z.string().optional(),
  whyItMatters: z.string().optional(),
  whatsPresent: z.string().optional(),
  howToImprove: z.string().optional(),
  expectedBenefits: z.string().optional(),
  impactLevel: z.enum(["low", "medium", "high"]).optional(),
  quickFix: z.string().optional(),
  examples: z.array(z.string()).optional(),
});

export const categoryScoreSchema = z.object({
  formatting: z.number().min(0).max(100),
  keywords: z.number().min(0).max(100),
  structure: z.number().min(0).max(100),
  readability: z.number().min(0).max(100),
});

export const analysisResultSchema = z.object({
  overallScore: z.number().min(0).max(100),
  categoryScores: categoryScoreSchema,
  suggestions: z.array(suggestionSchema),
  parsedText: z.string(),
  fileName: z.string(),
  fileSize: z.number(),
});

export type Suggestion = z.infer<typeof suggestionSchema>;
export type CategoryScores = z.infer<typeof categoryScoreSchema>;
export type AnalysisResult = z.infer<typeof analysisResultSchema>;

// AI Analysis Result Types
export const aiAnalysisResultSchema = z.object({
  overallAssessment: z.string(),
  contentQuality: z.object({
    score: z.number().min(0).max(100),
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
  }),
  industryAlignment: z.object({
    suggestedIndustries: z.array(z.string()),
    alignmentScore: z.number().min(0).max(100),
  }),
  skillGaps: z.object({
    missingSkills: z.array(z.string()),
    recommendations: z.array(z.string()),
  }),
  improvementSuggestions: z.array(z.string()),
  atsOptimization: z.array(z.string()),
  summary: z.string(),
});

export type AIAnalysisResult = z.infer<typeof aiAnalysisResultSchema>;

// File Upload State
export interface FileUploadState {
  file: File | null;
  fileName: string;
  fileSize: number;
  uploadProgress: number;
}
