import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { CategoryScores } from "@shared/schema";

interface CategoryBreakdownProps {
  scores: CategoryScores;
  animate?: boolean;
}

interface CategoryInfo {
  key: keyof CategoryScores;
  label: string;
  weight: number;
}

const categories: CategoryInfo[] = [
  { key: "formatting", label: "Formatting", weight: 30 },
  { key: "keywords", label: "Keywords & Content", weight: 30 },
  { key: "structure", label: "Structure & Sections", weight: 25 },
  { key: "readability", label: "Readability", weight: 15 },
];

export function CategoryBreakdown({ scores, animate = true }: CategoryBreakdownProps) {
  const [displayScores, setDisplayScores] = useState<CategoryScores>({
    formatting: 0,
    keywords: 0,
    structure: 0,
    readability: 0,
  });

  useEffect(() => {
    if (!animate) {
      setDisplayScores(scores);
      return;
    }

    let startTime: number | null = null;
    const duration = 1000;

    const animateScores = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      setDisplayScores({
        formatting: Math.round(scores.formatting * easeProgress),
        keywords: Math.round(scores.keywords * easeProgress),
        structure: Math.round(scores.structure * easeProgress),
        readability: Math.round(scores.readability * easeProgress),
      });

      if (progress < 1) {
        requestAnimationFrame(animateScores);
      }
    };

    requestAnimationFrame(animateScores);
  }, [scores, animate]);

  const getBarColor = (score: number): string => {
    if (score >= 71) return "bg-success";
    if (score >= 41) return "bg-warning";
    return "bg-error";
  };

  return (
    <div className="flex flex-col gap-6" data-testid="category-breakdown">
      <h3 className="text-lg font-semibold text-foreground">
        Score Breakdown
      </h3>

      <div className="flex flex-col gap-4">
        {categories.map((category) => {
          const score = displayScores[category.key];
          return (
            <div key={category.key} className="flex flex-col gap-2" data-testid={`category-${category.key}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {category.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({category.weight}% weight)
                  </span>
                </div>
                <span className="text-sm font-semibold text-foreground" data-testid={`score-${category.key}`}>
                  {score}%
                </span>
              </div>
              
              <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-1000 ease-out",
                    getBarColor(score)
                  )}
                  style={{ width: `${score}%` }}
                  data-testid={`bar-${category.key}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
