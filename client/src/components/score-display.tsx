import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ScoreDisplayProps {
  score: number;
  animate?: boolean;
}

export function ScoreDisplay({ score, animate = true }: ScoreDisplayProps) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    if (!animate) {
      setDisplayScore(score);
      return;
    }

    let startTime: number | null = null;
    const duration = 1500; // 1.5 seconds animation

    const animateScore = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(score * easeProgress));

      if (progress < 1) {
        requestAnimationFrame(animateScore);
      }
    };

    requestAnimationFrame(animateScore);
  }, [score, animate]);

  const getScoreColor = (score: number): string => {
    if (score >= 71) return "text-success";
    if (score >= 41) return "text-warning";
    return "text-error";
  };

  const getScoreLabel = (score: number): string => {
    if (score >= 71) return "Excellent";
    if (score >= 41) return "Needs Work";
    return "Critical Issues";
  };

  const getCircleColor = (score: number): string => {
    if (score >= 71) return "#10B981"; // success green
    if (score >= 41) return "#F59E0B"; // warning amber
    return "#EF4444"; // error red
  };

  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-6 p-8" data-testid="score-display">
      <h2 className="text-2xl font-semibold text-foreground">
        ATS Compatibility Score
      </h2>

      {/* Circular Progress */}
      <div className="relative w-48 h-48">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            className="text-muted/30"
          />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke={getCircleColor(score)}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("text-5xl font-bold tracking-tight", getScoreColor(score))} data-testid="text-score">
            {displayScore}
          </span>
          <span className="text-sm text-muted-foreground mt-1">out of 100</span>
        </div>
      </div>

      {/* Score interpretation */}
      <div className="text-center">
        <p className={cn("text-lg font-semibold", getScoreColor(score))} data-testid="text-score-label">
          {getScoreLabel(score)}
        </p>
        <p className="text-sm text-muted-foreground mt-1 max-w-md">
          {score >= 71 && "Your resume is well-optimized for ATS systems"}
          {score >= 41 && score < 71 && "Your resume could use some improvements"}
          {score < 41 && "Your resume needs significant optimization"}
        </p>
      </div>
    </div>
  );
}
