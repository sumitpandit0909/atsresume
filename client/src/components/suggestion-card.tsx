import { CheckCircle2, AlertTriangle, XCircle, FileText, Key, LayoutList, Eye, ChevronDown, ChevronRight, Info, Lightbulb, Target, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import type { Suggestion } from "@shared/schema";

interface SuggestionCardProps {
  suggestion: Suggestion;
}

export function SuggestionCard({ suggestion }: SuggestionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getIcon = (type: Suggestion["type"]) => {
    switch (type) {
      case "formatting":
        return FileText;
      case "keywords":
        return Key;
      case "structure":
        return LayoutList;
      case "readability":
        return Eye;
    }
  };

  const getStatusIcon = (category: Suggestion["category"], passed: boolean) => {
    if (passed) return CheckCircle2;
    if (category === "critical") return XCircle;
    return AlertTriangle;
  };

  const getBorderColor = (category: Suggestion["category"], passed: boolean) => {
    if (passed) return "border-l-success";
    if (category === "critical") return "border-l-error";
    return "border-l-warning";
  };

  const getIconColor = (category: Suggestion["category"], passed: boolean) => {
    if (passed) return "text-success";
    if (category === "critical") return "text-error";
    return "text-warning";
  };

  const getBadgeVariant = (category: Suggestion["category"], passed: boolean): "default" | "secondary" | "outline" => {
    if (passed) return "secondary";
    return "outline";
  };

  const getBadgeText = (category: Suggestion["category"], passed: boolean) => {
    if (passed) return "Passed";
    if (category === "critical") return "Failed";
    return "Warning";
  };

  const getImpactBadge = (impactLevel?: string) => {
    if (!impactLevel) return null;
    
    const impactConfig = {
      low: { color: "bg-blue-100 text-blue-800 border-blue-200", label: "Low Impact" },
      medium: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", label: "Medium Impact" },
      high: { color: "bg-red-100 text-red-800 border-red-200", label: "High Impact" }
    };
    
    const config = impactConfig[impactLevel as keyof typeof impactConfig];
    if (!config) return null;
    
    return (
      <Badge variant="outline" className={cn("ml-2 text-xs", config.color)}>
        {config.label}
      </Badge>
    );
  };

  const TypeIcon = getIcon(suggestion.type);
  const StatusIcon = getStatusIcon(suggestion.category, suggestion.passed);

  const hasDetailedFeedback = suggestion.currentIssue || suggestion.whyItMatters || suggestion.whatsPresent || suggestion.howToImprove || suggestion.expectedBenefits;

  return (
    <div
      className={cn(
        "bg-card border border-card-border rounded-lg p-6 border-l-4 transition-all hover-elevate",
        getBorderColor(suggestion.category, suggestion.passed)
      )}
      data-testid={`suggestion-${suggestion.id}`}
    >
      <div className="flex items-start gap-4">
        <div className={cn("flex-shrink-0 mt-0.5", getIconColor(suggestion.category, suggestion.passed))}>
          <StatusIcon className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-base font-semibold text-card-foreground">
                {suggestion.title}
              </h4>
              <TypeIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              {getImpactBadge(suggestion.impactLevel)}
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant={getBadgeVariant(suggestion.category, suggestion.passed)}
                className={cn(
                  "flex-shrink-0",
                  suggestion.passed && "bg-success/10 text-success border-success/20",
                  !suggestion.passed && suggestion.category === "critical" && "bg-error/10 text-error border-error/20",
                  !suggestion.passed && suggestion.category === "recommended" && "bg-warning/10 text-warning border-warning/20"
                )}
                data-testid={`badge-${suggestion.id}`}
              >
                {getBadgeText(suggestion.category, suggestion.passed)}
              </Badge>
              {hasDetailedFeedback && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1 hover:bg-muted rounded transition-colors"
                >
                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            {suggestion.description}
          </p>

          {suggestion.quickFix && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-3">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Quick Fix</span>
              </div>
              <p className="text-sm text-blue-700">{suggestion.quickFix}</p>
            </div>
          )}

          {isExpanded && hasDetailedFeedback && (
            <div className="mt-4 space-y-4 border-t pt-4">
              {suggestion.currentIssue && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-muted-foreground" />
                    <h5 className="text-sm font-medium text-foreground">Current Issue</h5>
                  </div>
                  <p className="text-sm text-muted-foreground">{suggestion.currentIssue}</p>
                </div>
              )}

              {suggestion.whatsPresent && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-muted-foreground" />
                    <h5 className="text-sm font-medium text-foreground">What's Present</h5>
                  </div>
                  <p className="text-sm text-muted-foreground">{suggestion.whatsPresent}</p>
                </div>
              )}

              {suggestion.whyItMatters && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4 text-muted-foreground" />
                    <h5 className="text-sm font-medium text-foreground">Why It Matters</h5>
                  </div>
                  <p className="text-sm text-muted-foreground">{suggestion.whyItMatters}</p>
                </div>
              )}

              {suggestion.howToImprove && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-muted-foreground" />
                    <h5 className="text-sm font-medium text-foreground">How to Improve</h5>
                  </div>
                  <p className="text-sm text-muted-foreground">{suggestion.howToImprove}</p>
                </div>
              )}

              {suggestion.expectedBenefits && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                    <h5 className="text-sm font-medium text-foreground">Expected Benefits</h5>
                  </div>
                  <p className="text-sm text-muted-foreground">{suggestion.expectedBenefits}</p>
                </div>
              )}

              {suggestion.examples && suggestion.examples.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <h5 className="text-sm font-medium text-foreground">Examples</h5>
                  </div>
                  <div className="space-y-2">
                    {suggestion.examples.map((example, index) => (
                      <div key={index} className="text-sm font-mono bg-muted p-2 rounded">
                        {example}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
