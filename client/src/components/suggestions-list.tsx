import { SuggestionCard } from "./suggestion-card";
import type { Suggestion } from "@shared/schema";

interface SuggestionsListProps {
  suggestions: Suggestion[];
}

export function SuggestionsList({ suggestions }: SuggestionsListProps) {
  const criticalSuggestions = suggestions.filter(s => s.category === "critical" && !s.passed);
  const recommendedSuggestions = suggestions.filter(s => s.category === "recommended" && !s.passed);
  const passedSuggestions = suggestions.filter(s => s.passed);

  return (
    <div className="flex flex-col gap-8" data-testid="suggestions-list">
      {criticalSuggestions.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Critical Issues ({criticalSuggestions.length})
          </h3>
          <div className="flex flex-col gap-4">
            {criticalSuggestions.map((suggestion) => (
              <SuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
          </div>
        </div>
      )}

      {recommendedSuggestions.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Recommended Improvements ({recommendedSuggestions.length})
          </h3>
          <div className="flex flex-col gap-4">
            {recommendedSuggestions.map((suggestion) => (
              <SuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
          </div>
        </div>
      )}

      {passedSuggestions.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Doing Well ({passedSuggestions.length})
          </h3>
          <div className="flex flex-col gap-4">
            {passedSuggestions.map((suggestion) => (
              <SuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
