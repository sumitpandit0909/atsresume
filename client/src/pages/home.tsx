import { useState } from "react";
import { Shield, Brain, Sparkles, Upload, CheckCircle, Target, TrendingUp, ArrowRight } from "lucide-react";
import { AILoadingModal } from "@/components/ai-loading-modal";
import { UploadZone } from "@/components/upload-zone";
import { ScoreDisplay } from "@/components/score-display";
import { CategoryBreakdown } from "@/components/category-breakdown";
import { SuggestionsList } from "@/components/suggestions-list";
import { EmptyState } from "@/components/empty-state";
import { LoadingState } from "@/components/loading-state";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { AnalysisResult, AIAnalysisResult } from "@shared/schema";
import { parsePDF } from "@/lib/pdf-parser";
import { parseDOCX } from "@/lib/docx-parser";
import { analyzeResume } from "@/lib/ats-analyzer";
import AIResultsPage from "./ai-results";
import Footer from "@/components/footer";
import { RateLimitInfo } from "@/components/rate-limit-info";
import { RateLimitStatus } from "@/components/rate-limit-status";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAIAnalyzing, setIsAIAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const [showAIResults, setShowAIResults] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setAnalysisResult(null);
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setAnalysisResult(null);
  };

  const handleAnalyze = async (file?: File) => {
    const fileToAnalyze = file || selectedFile;
    if (!fileToAnalyze) return;
    
    setIsProcessing(true);
    
    try {
      // Parse the file based on type
      let parsedText = '';
      
      if (fileToAnalyze.type === 'application/pdf') {
        parsedText = await parsePDF(fileToAnalyze);
      } else if (fileToAnalyze.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        parsedText = await parseDOCX(fileToAnalyze);
      } else {
        throw new Error('Unsupported file type. Please upload a PDF or DOCX file.');
      }
      
      // Analyze the parsed text
      const result = analyzeResume(parsedText, fileToAnalyze.name, fileToAnalyze.size);
      setAnalysisResult(result);
      
      // Auto-scroll to results section after analysis completes
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
      
      toast({
        title: "Analysis Complete",
        description: `Your resume scored ${result.overallScore}/100 for ATS compatibility.`,
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze resume. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAIAnalysis = async () => {
    if (!analysisResult) return;
    
    setIsAIAnalyzing(true);
    
    try {
      const response = await fetch("/api/ai-analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText: analysisResult.parsedText,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        // Handle rate limit specifically
        if (response.status === 429 && errorData.type === "RATE_LIMIT") {
          throw new Error(errorData.message || "Rate limit exceeded");
        }
        
        throw new Error(errorData.error || "Failed to analyze with AI");
      }

      const data = await response.json();
      
      if (data.success && data.analysis) {
        setAiAnalysisResult(data.analysis);
        setShowAIResults(true);
        
        // Dispatch rate limit info if available
        if (data.rateLimitInfo) {
          const rateLimitEvent = new CustomEvent('rateLimitUpdate', { 
            detail: data.rateLimitInfo 
          });
          window.dispatchEvent(rateLimitEvent);
        }
        
        toast({
          title: "AI Analysis Complete",
          description: "Your resume has been analyzed with advanced AI insights.",
        });
      } else {
        throw new Error("Invalid response from AI analysis");
      }
    } catch (error) {
      console.error("AI analysis error:", error);
      toast({
        variant: "destructive",
        title: "AI Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze resume with AI. Please try again.",
      });
    } finally {
      setIsAIAnalyzing(false);
    }
  };

  const handleBackFromAIResults = () => {
    setShowAIResults(false);
    setAiAnalysisResult(null);
  };

  // Show AI results page if active
  if (showAIResults && aiAnalysisResult) {
    return (
      <AIResultsPage 
        analysisResult={aiAnalysisResult} 
        onBack={handleBackFromAIResults} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* AI Loading Modal */}
      <AILoadingModal isOpen={isAIAnalyzing} currentStage={0} />

      {/* Modern Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 lg:pt-0">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-100/10 rounded-full blur-3xl"></div>
        </div>

        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-50">
          <div className="flex h-16 lg:h-20 items-center justify-between px-4 lg:px-12">
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg lg:rounded-xl">
                <Shield className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg lg:text-xl font-bold text-gray-900 leading-tight">
                  ATS Resume Analyzer
                </h1>
                <p className="text-xs lg:text-sm text-gray-600">
                  AI-Powered Career Optimization
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full">
                <Shield className="w-3 h-3 lg:w-4 lg:h-4 text-green-600" />
                <span className="text-xs lg:text-sm font-medium text-gray-700">Secure</span>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full mb-4 lg:mb-6">
                <Sparkles className="w-3 h-3 lg:w-4 lg:h-4 text-purple-600" />
                <span className="text-xs lg:text-sm font-medium text-gray-700">AI-Powered Resume Analysis</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight">
                Optimize Your Resume for
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}ATS Success
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 lg:mb-8 leading-relaxed max-w-2xl">
                Get instant AI-powered insights to improve your resume's ATS compatibility, 
                industry alignment, and overall impact. Land more interviews with data-driven optimization.
              </p>

              {/* Feature Highlights */}
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 mb-6 lg:mb-8">
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-green-500" />
                  <span className="text-xs lg:text-sm">ATS Compatibility Score</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Target className="w-4 h-4 lg:w-5 lg:h-5 text-blue-500" />
                  <span className="text-xs lg:text-sm">Industry Alignment</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-purple-500" />
                  <span className="text-xs lg:text-sm">Skill Gap Analysis</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                <Button
                  onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 lg:py-4 px-6 lg:px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-sm lg:text-base"
                >
                  <Upload className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                  Analyze Your Resume
                  <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 ml-2" />
                </Button>
                
                <Button
                  variant="outline"
                  className="border-2 border-gray-300 text-gray-700 font-semibold py-3 lg:py-4 px-6 lg:px-8 rounded-xl hover:border-gray-400 transition-all duration-200 text-sm lg:text-base"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Right Column - Upload Card */}
            <div className="relative order-1 lg:order-2 w-full max-w-sm lg:max-w-md mx-auto lg:mx-0">
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-2xl p-4 lg:p-10">
                <div className="text-center mb-3 lg:mb-6">
                  <h3 className="text-lg lg:text-2xl font-bold text-gray-900 mb-1 lg:mb-2">
                    Start Your Analysis
                  </h3>
                  <p className="text-xs lg:text-base text-gray-600">
                    Upload your resume to get instant insights
                  </p>
                </div>

                <UploadZone
                  onFileSelect={handleFileSelect}
                  selectedFile={selectedFile}
                  onClearFile={handleClearFile}
                  isProcessing={isProcessing}
                />

                {/* Manual Analyze Button */}
                {selectedFile && !isProcessing && !analysisResult && (
                  <div className="mt-3 lg:mt-6">
                    <Button
                      onClick={() => handleAnalyze()}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 lg:py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-xs lg:text-base"
                    >
                      <Brain className="w-3 h-3 lg:w-5 lg:h-5 mr-1 lg:mr-2" />
                      Analyze Resume
                    </Button>
                  </div>
                )}

                {/* Supported Formats */}
                <div className="mt-3 lg:mt-6 pt-3 lg:pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    Supports PDF and DOCX files • 100% private processing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {analysisResult && (
        <div id="results-section" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Your Analysis Results
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Here's how your resume performs and what you can improve
              </p>
              
              {/* AI Analysis Button */}
              <div className="mt-8">
                <Button
                  onClick={handleAIAnalysis}
                  disabled={isAIAnalyzing}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  {isAIAnalyzing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Analyzing with AI...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Brain className="w-6 h-6" />
                      <Sparkles className="w-5 h-5" />
                      <span>Get Advanced AI Insights</span>
                    </div>
                  )}
                </Button>
                <p className="text-sm text-gray-500 mt-3">
                  Get personalized recommendations, industry alignment, and skill gap analysis
                </p>
                
                {/* Rate Limit Status */}
                <div className="mt-4 max-w-md mx-auto">
                  <RateLimitStatus />
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <ScoreDisplay score={analysisResult.overallScore} />
              
              <div className="max-w-4xl mx-auto">
                <CategoryBreakdown scores={analysisResult.categoryScores} />
              </div>

              <div className="max-w-4xl mx-auto">
                <SuggestionsList suggestions={analysisResult.suggestions} />
              </div>

              {/* Rate Limit Status */}
              <div className="max-w-4xl mx-auto">
                <RateLimitStatus />
              </div>

              {/* Rate Limit Information */}
              <div className="max-w-4xl mx-auto">
                <RateLimitInfo />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!analysisResult && !isProcessing && (
        <div id="upload-section" className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <EmptyState />
          </div>
        </div>
      )}

      {/* Loading State */}
      {isProcessing && (
        <div className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <LoadingState />
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
