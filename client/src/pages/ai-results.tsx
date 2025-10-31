import { useState, useEffect, useRef } from "react";
import { Shield, ArrowLeft, Brain, Star, Target, TrendingUp, Lightbulb, CheckCircle, Copy, Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { downloadAnalysis } from "@/lib/download-utils";
import type { AIAnalysisResult } from "@shared/schema";
import Footer from "@/components/footer";

interface AIResultsPageProps {
  analysisResult: AIAnalysisResult;
  onBack: () => void;
}

export default function AIResultsPage({ analysisResult, onBack }: AIResultsPageProps) {
  const { toast } = useToast();
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedSection(section);
      toast({
        title: "Copied to clipboard",
        description: `${section} copied successfully`,
      });
      setTimeout(() => setCopiedSection(null), 2000);
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  const handleDownload = async (format: 'png' | 'pdf') => {
    if (!contentRef.current) return;
    
    setIsDownloading(true);
    setShowDownloadDropdown(false);
    
    try {
      await downloadAnalysis(contentRef.current, {
        format,
        fileName: `ai-resume-analysis-${new Date().toISOString().split('T')[0]}`
      });
      
      toast({
        title: "Download Complete",
        description: `Analysis downloaded as ${format.toUpperCase()}`,
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: error instanceof Error ? error.message : "Failed to download analysis",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 lg:h-16 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-2 lg:gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-1 lg:gap-2 px-2 lg:px-3"
            >
              <ArrowLeft className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="text-xs lg:text-sm">Back</span>
            </Button>
            <div className="flex items-center gap-1 lg:gap-2">
              <Brain className="w-4 h-4 lg:w-6 lg:h-6 text-purple-600" />
              <span className="text-sm lg:text-lg font-semibold">AI Results</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 lg:gap-2 px-2 py-1 lg:px-3 lg:py-1.5 bg-purple-100 text-purple-800 rounded-full">
              <Shield className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="text-xs font-medium hidden sm:inline">AI-Powered</span>
              <span className="text-xs font-medium sm:hidden">AI</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Screenshot Target */}
      <div 
        ref={contentRef}
        className="max-w-6xl mx-auto p-6 space-y-8"
        data-screenshot-target
      >
        {/* Overall Assessment */}
        <section className="bg-card rounded-lg border border-card-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Brain className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-semibold">Overall Assessment</h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(analysisResult.overallAssessment, "Overall Assessment")}
              className="flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              {copiedSection === "Overall Assessment" ? "Copied!" : "Copy"}
            </Button>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {analysisResult.overallAssessment}
          </p>
        </section>

        {/* Content Quality */}
        <section className="bg-card rounded-lg border border-card-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold">Content Quality</h2>
            </div>
            <div className={`px-4 py-2 rounded-full ${getScoreBgColor(analysisResult.contentQuality.score)} ${getScoreColor(analysisResult.contentQuality.score)} font-semibold`}>
              {analysisResult.contentQuality.score}/100
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-green-600">Strengths</h3>
              <ul className="space-y-2">
                {analysisResult.contentQuality.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-orange-600">Areas for Improvement</h3>
              <ul className="space-y-2">
                {analysisResult.contentQuality.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Industry Alignment */}
        <section className="bg-card rounded-lg border border-card-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-semibold">Industry Alignment</h2>
            </div>
            <div className={`px-4 py-2 rounded-full ${getScoreBgColor(analysisResult.industryAlignment.alignmentScore)} ${getScoreColor(analysisResult.industryAlignment.alignmentScore)} font-semibold`}>
              {analysisResult.industryAlignment.alignmentScore}/100
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Suggested Industries</h3>
            <div className="flex flex-wrap gap-2">
              {analysisResult.industryAlignment.suggestedIndustries.map((industry, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Skill Gaps */}
        <section className="bg-card rounded-lg border border-card-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-amber-600" />
            <h2 className="text-xl font-semibold">Skill Gap Analysis</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-red-600">Missing Skills</h3>
              <ul className="space-y-2">
                {analysisResult.skillGaps.missingSkills.map((skill, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-600">Development Recommendations</h3>
              <ul className="space-y-2">
                {analysisResult.skillGaps.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Improvement Suggestions */}
        <section className="bg-card rounded-lg border border-card-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-yellow-600" />
              <h2 className="text-xl font-semibold">Improvement Suggestions</h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(analysisResult.improvementSuggestions.join('\n'), "Improvement Suggestions")}
              className="flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              {copiedSection === "Improvement Suggestions" ? "Copied!" : "Copy All"}
            </Button>
          </div>
          <ul className="space-y-3">
            {analysisResult.improvementSuggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <div className="flex-shrink-0 w-6 h-6 bg-yellow-100 text-yellow-800 rounded-full flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
                <span className="text-muted-foreground">{suggestion}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ATS Optimization */}
        <section className="bg-card rounded-lg border border-card-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-semibold">ATS Optimization Tips</h2>
          </div>
          <ul className="space-y-2">
            {analysisResult.atsOptimization.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Summary */}
        <section className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-purple-900">AI Summary</h2>
          </div>
          <p className="text-purple-800 leading-relaxed">
            {analysisResult.summary}
          </p>
        </section>
      </div>

      {/* Download Button - Fixed at Bottom (Outside screenshot area) */}
      <div className="fixed bottom-6 right-6 z-40" data-no-screenshot>
        <div className="relative">
          <Button
            onClick={() => setShowDownloadDropdown(!showDownloadDropdown)}
            disabled={isDownloading}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
          >
            {isDownloading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Downloading...</span>
              </div>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Download Analysis</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </Button>

          {/* Dropdown Menu */}
          {showDownloadDropdown && (
            <div className="absolute bottom-full right-0 mb-2 w-48 bg-card border border-card-border rounded-lg shadow-xl z-50">
              <div className="p-2">
                <button
                  onClick={() => handleDownload('png')}
                  className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:bg-muted rounded-md transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download as PNG <br />
                  (recommended)
                </button>
                <button
                  onClick={() => handleDownload('pdf')}
                  className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:bg-muted rounded-md transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download as PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
