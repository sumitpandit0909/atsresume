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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
          console.log("📊 Rate limit info received:", data.rateLimitInfo);
          const rateLimitEvent = new CustomEvent('rateLimitUpdate', { 
            detail: data.rateLimitInfo 
          });
          window.dispatchEvent(rateLimitEvent);
        } else {
          console.log("⚠️ No rate limit info in response");
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
                  ATS Score Checker Free
                </h1>
                <p className="text-xs lg:text-sm text-gray-600">
                  Free Resume ATS Score Analysis
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
                Free ATS Score Checker - 
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}Instant Resume Analysis
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 lg:mb-8 leading-relaxed max-w-2xl">
                Use our <strong>ats score checker free</strong> tool to get instant ATS compatibility score for your resume. 
                No signup required. Optimize your resume for better job application success with our free ATS score checker.
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

      {/* Comprehensive SEO Content Section - 3000+ Words */}
      <article className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <header className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              The Ultimate Guide to ATS Resume Checker Free: Optimize Your Resume for Job Success
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Discover how our <strong>ats resume checker free</strong> tool can transform your job search by ensuring your resume passes through Applicant Tracking Systems and reaches human recruiters.
            </p>
          </header>

          <section className="prose prose-lg max-w-none">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">What is an ATS and Why Does It Matter?</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Applicant Tracking Systems (ATS) are sophisticated software platforms used by over 98% of Fortune 500 companies and 75% of all employers to manage job applications. These systems act as digital gatekeepers, scanning and filtering resumes before they ever reach human eyes. When you use an <strong>ats resume checker free</strong> tool like ours, you're essentially getting a preview of how recruiters' systems will interpret your resume.
            </p>
            
            <p className="text-gray-700 mb-8 leading-relaxed">
              The harsh reality is that <strong>resumes with poor ATS compatibility get automatically rejected</strong>, regardless of your qualifications. This is why having access to a reliable <strong>free ats score checker</strong> is crucial for modern job seekers. Our tool provides instant feedback on your resume's compatibility, helping you understand exactly what needs improvement.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <h4 className="text-xl font-semibold text-blue-900 mb-3">Key Statistics:</h4>
              <ul className="text-gray-700 space-y-2">
                <li>• 75% of qualified applicants are rejected by ATS before human review</li>
                <li>• Resumes with ATS scores above 80% are 3x more likely to get interviews</li>
                <li>• 65% of job seekers don't optimize their resumes for ATS compatibility</li>
                <li>• Companies using ATS receive an average of 250+ applications per position</li>
              </ul>
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 mt-12">The Evolution of Applicant Tracking Systems</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Applicant Tracking Systems have evolved significantly since their introduction in the late 1990s. Initially designed to help large corporations manage high volumes of applications, modern ATS platforms now incorporate artificial intelligence, machine learning, and natural language processing to screen candidates more effectively. Understanding this evolution helps explain why using a <strong>free ATS score checker</strong> is no longer optional but essential for job seekers.
            </p>
            
            <p className="text-gray-700 mb-8 leading-relaxed">
              Early ATS systems were primarily database managers that stored candidate information. Today's systems are sophisticated AI-powered platforms that can parse resumes, extract key information, match candidates to job requirements, and even predict candidate success. This technological advancement means that job seekers need to be more strategic than ever about how they present their qualifications. Our <strong>ats resume checker free</strong> tool helps you navigate this complex landscape by providing insights into how modern ATS platforms will interpret your resume.
            </p>

            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">How Our Free ATS Resume Checker Works</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Our <strong>ats resume checker free</strong> tool uses advanced algorithms to analyze your resume against the same criteria used by major ATS platforms. Here's the step-by-step process:
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">1. Upload & Parse</h4>
                <p className="text-gray-700">Simply upload your PDF or DOCX resume. Our system extracts and analyzes the text content while maintaining your privacy.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">2. Comprehensive Analysis</h4>
                <p className="text-gray-700">We evaluate formatting, keywords, structure, and content quality against industry standards.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">3. Instant Scoring</h4>
                <p className="text-gray-700">Receive your ATS compatibility score (0-100) with detailed breakdown by category.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">4. Actionable Insights</h4>
                <p className="text-gray-700">Get specific recommendations to improve your resume and increase interview chances.</p>
              </div>
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Key Features of Our Free ATS Score Checker</h3>
            
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Feature</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Benefit</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Formatting Analysis</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Checks for ATS-friendly formatting</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Prevents parsing errors</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Keyword Optimization</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Identifies missing industry keywords</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Improves search ranking</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Structure Evaluation</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Assesses logical flow and organization</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Enhances readability</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Content Quality</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Reviews achievement statements</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Boosts impact</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Common ATS Mistakes Our Free Checker Identifies</h3>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <h4 className="text-xl font-semibold text-red-800 mb-4">Critical Errors to Avoid:</h4>
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span><strong>Graphics and Tables:</strong> ATS cannot read images, charts, or complex tables</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span><strong>Unconventional Formatting:</strong> Columns, text boxes, and creative layouts confuse ATS</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span><strong>Missing Keywords:</strong> Failure to include job-specific terminology and skills</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span><strong>Poor File Format:</strong> Using .pages or other non-standard formats</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span><strong>Incorrect Headings:</strong> Using "Objective" instead of "Professional Summary"</span>
                </li>
              </ul>
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Industry-Specific ATS Optimization Tips</h3>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Technology & IT</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• Include specific programming languages</li>
                  <li>• Mention frameworks and tools</li>
                  <li>• Highlight certifications (AWS, Azure, etc.)</li>
                  <li>• Quantify project impacts</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Healthcare</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• List specific medical procedures</li>
                  <li>• Include certifications and licenses</li>
                  <li>• Mention EHR/EMR systems</li>
                  <li>• Highlight patient outcomes</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Marketing</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• Include campaign metrics</li>
                  <li>• Mention specific platforms (Google Ads, HubSpot)</li>
                  <li>• Highlight ROI improvements</li>
                  <li>• List analytics tools</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Finance</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• Include financial software</li>
                  <li>• Mention compliance knowledge</li>
                  <li>• Highlight cost savings</li>
                  <li>• List relevant certifications</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Why Choose Our Free ATS Resume Checker?</h3>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <h4 className="text-xl font-semibold text-green-800 mb-4">Unique Advantages:</h4>
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>100% Free:</strong> No hidden costs, no credit card required</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Instant Results:</strong> Get your ATS score in seconds</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Privacy-First:</strong> Your resume data is never stored or shared</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Comprehensive Analysis:</strong> Covers all major ATS platforms</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Actionable Insights:</strong> Specific recommendations for improvement</span>
                </li>
              </ul>
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Learn More: ATS Resume Guides</h3>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <a href="/blog/ats-score-checker-what-your-score-means" className="block bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                <div className="font-semibold text-gray-900 mb-2">ATS Score Checker: What Your Score Means</div>
                <div className="text-gray-600 text-sm">What a good ATS score is, why tools disagree, and how to raise yours.</div>
              </a>
              <a href="/blog/how-ats-checker-reads-your-resume" className="block bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                <div className="font-semibold text-gray-900 mb-2">How an ATS Checker Reads Your Resume</div>
                <div className="text-gray-600 text-sm">Resume parsing explained, plus a 5-minute self-test.</div>
              </a>
              <a href="/blog/ats-resume-checker-formatting-rules" className="block bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                <div className="font-semibold text-gray-900 mb-2">ATS Resume Checker: 12 Formatting Rules</div>
                <div className="text-gray-600 text-sm">Layout, fonts, headings and dates that applicant tracking systems read cleanly.</div>
              </a>
              <a href="/blog/resume-score-checker-keyword-tailoring" className="block bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                <div className="font-semibold text-gray-900 mb-2">Resume Score Checker Workflow</div>
                <div className="text-gray-600 text-sm">Tailor your resume to any job description in about 30 minutes.</div>
              </a>
            </div>

            <div className="bg-blue-600 text-white rounded-xl p-8 text-center mb-12">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">Ready to Optimize Your Resume?</h3>
              <p className="text-blue-100 mb-6 text-lg">
                Don't let ATS filters block your dream job. Use our <strong>free ats resume checker</strong> today and get the competitive edge you need.
              </p>
              <Button
                onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                Check Your Resume Now - It's Free!
              </Button>
            </div>
          </section>
        </div>
      </article>

      {/* FAQ Section with Accordions */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg shadow-sm border border-gray-200">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <h3 className="text-xl font-semibold text-gray-900">
                  How does your free ATS score checker work to improve my resume's compatibility?
                </h3>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-gray-600">
                  Our <strong>free ATS score checker</strong> analyzes your resume against the factors that commonly cause problems in Applicant Tracking Systems, such as parsing, section structure and keywords. When you upload your resume, our ATS analyzer evaluates formatting, keywords, structure, and content quality against industry standards. You'll receive an instant ATS resume score and specific recommendations to enhance your CV ATS score, making it more likely to pass through automated screening systems.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-lg shadow-sm border border-gray-200">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <h3 className="text-xl font-semibold text-gray-900">
                  What makes your ATS resume checker the best free option available?
                </h3>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-gray-600">
                  Our <strong>best ATS resume checker free</strong> stands out because it provides comprehensive analysis without any hidden costs. Unlike other tools, our ATS analyzer offers detailed category breakdowns, industry-specific insights, and actionable recommendations. We cover all major ATS platforms and provide instant results with no signup required, making it the most accessible and effective free ATS score checker on the market.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-lg shadow-sm border border-gray-200">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <h3 className="text-xl font-semibold text-gray-900">
                  How can I enhance my CV ATS score using your analyzer?
                </h3>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-gray-600">
                  To <strong>improve your CV ATS score</strong> with our analyzer, simply upload your resume and review the detailed feedback. Our ATS analyzer identifies specific areas for improvement, including missing keywords, formatting issues, and structural problems. We provide concrete suggestions to optimize your resume for better ATS compatibility, helping you achieve that perfect ATS score that recruiters look for.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-lg shadow-sm border border-gray-200">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <h3 className="text-xl font-semibold text-gray-900">
                  What ATS resume score should I aim for?
                </h3>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-gray-600">
                  For a strong <strong>ATS resume score</strong>, aim for 80-100 points. Our ATS analyzer considers scores in this range as excellent for ATS compatibility. A score above 80 indicates your resume is well-optimized for automated screening, while scores below 60 need significant improvement. Our free ATS score checker provides specific guidance to help you reach that perfect ATS resume score.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white rounded-lg shadow-sm border border-gray-200">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <h3 className="text-xl font-semibold text-gray-900">
                  How is your ATS checker different from paid resume checkers?
                </h3>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-gray-600">
                  Unlike many paid tools that lock detailed analysis behind a subscription, our free <strong>ATS checker</strong> provides comprehensive insights at no cost. Our ATS analyzer offers instant results, detailed category breakdowns, and specific improvement recommendations without any subscription fees. We focus purely on ATS optimization rather than resume building, making our analysis more targeted and effective for job seekers.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="bg-white rounded-lg shadow-sm border border-gray-200">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <h3 className="text-xl font-semibold text-gray-900">
                  Can your free ATS score checker help me achieve the perfect ATS score?
                </h3>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-gray-600">
                  Absolutely! Our <strong>free ATS score checker</strong> is specifically designed to help you achieve that <strong>perfect ATS score</strong>. By analyzing your resume against industry standards and providing specific, actionable recommendations, our ATS analyzer guides you through the optimization process. Many users see significant improvements in their ATS resume score after implementing our suggestions, increasing their chances of passing through automated screening systems.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="bg-white rounded-lg shadow-sm border border-gray-200">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <h3 className="text-xl font-semibold text-gray-900">
                  Is your ATS resume checker completely free with no hidden costs?
                </h3>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-gray-600">
                  Yes, our <strong>ATS resume checker free</strong> service is 100% free with absolutely no hidden costs. You can check your ATS score, receive detailed analysis, and get improvement recommendations without any payment or subscription required. We believe everyone should have access to quality ATS optimization tools, which is why we offer our comprehensive ATS analyzer completely free of charge.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="bg-white rounded-lg shadow-sm border border-gray-200">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <h3 className="text-xl font-semibold text-gray-900">
                  How quickly can I get my ATS resume score using your free checker?
                </h3>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-gray-600">
                  With our <strong>free ATS score checker</strong>, you'll receive your ATS resume score instantly after uploading your resume. Our ATS analyzer processes your document in seconds and provides comprehensive results immediately. There's no waiting period or processing delays - you get your ATS score and improvement suggestions right away, making it the fastest way to optimize your resume for job applications.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
