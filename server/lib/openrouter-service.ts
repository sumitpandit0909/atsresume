import type { AIAnalysisResult } from "@shared/schema";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "deepseek/deepseek-v4.1-flash-1017";
const SITE_URL = process.env.SITE_URL || "https://www.atsscorecheckerfree.com";

interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface AIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class OpenRouterService {
  private async callOpenRouterAPI(messages: AIMessage[]): Promise<string> {
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
          "X-Title": "ATS Resume Checker",
        },
        body: JSON.stringify({
          model: OPENROUTER_MODEL,
          messages,
          temperature: 0.7,
          max_tokens: 4000,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
      }

      const data: AIResponse = await response.json();
      
      if (!data.choices?.[0]?.message?.content) {
        throw new Error("Invalid response format from OpenRouter API");
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.error("OpenRouter API call failed:", error);
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

    const messages: AIMessage[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ];

    try {
      const aiResponse = await this.callOpenRouterAPI(messages);
      
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
      console.error("AI analysis failed:", error);
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

export const openRouterService = new OpenRouterService();
