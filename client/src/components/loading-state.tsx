import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Analyzing your resume..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[500px] p-8" data-testid="loading-state">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        </div>

        <div className="flex flex-col gap-2 text-center">
          <h3 className="text-xl font-semibold text-foreground">
            {message}
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            Processing your resume locally in your browser. This may take a few moments.
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: "70%" }} />
        </div>
      </div>
    </div>
  );
}
