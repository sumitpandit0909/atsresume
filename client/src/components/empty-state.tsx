import { FileSearch, Shield, Zap, Lock } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[500px] p-8" data-testid="empty-state">
      <div className="flex flex-col items-center gap-6 max-w-md text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
          <FileSearch className="w-10 h-10 text-primary" />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-foreground">
            Ready to Analyze Your Resume
          </h2>
          <p className="text-base text-muted-foreground">
            Upload your resume to get instant ATS compatibility analysis and personalized suggestions
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 w-full">
          <div className="flex flex-col items-center gap-2 p-4 bg-card border border-card-border rounded-lg">
            <Shield className="w-6 h-6 text-primary" />
            <p className="text-xs font-medium text-foreground">100% Private</p>
            <p className="text-xs text-muted-foreground">No data uploaded</p>
          </div>
          
          <div className="flex flex-col items-center gap-2 p-4 bg-card border border-card-border rounded-lg">
            <Zap className="w-6 h-6 text-primary" />
            <p className="text-xs font-medium text-foreground">Instant Results</p>
            <p className="text-xs text-muted-foreground">In-browser analysis</p>
          </div>
          
          <div className="flex flex-col items-center gap-2 p-4 bg-card border border-card-border rounded-lg">
            <Lock className="w-6 h-6 text-primary" />
            <p className="text-xs font-medium text-foreground">No Signup</p>
            <p className="text-xs text-muted-foreground">Free forever</p>
          </div>
        </div>
      </div>
    </div>
  );
}
