import { useState, useEffect } from "react";
import { Brain, FileText, Briefcase, Target, Lightbulb, CheckCircle, Sparkles, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AILoadingModalProps {
  isOpen: boolean;
  currentStage: number;
}

const analysisStages = [
  {
    title: "Parsing your resume",
    description: "Extracting and organizing your resume content",
    icon: FileText,
    duration: 2000,
  },
  {
    title: "Analyzing your experience",
    description: "Reviewing your work history and achievements",
    icon: Briefcase,
    duration: 3000,
  },
  {
    title: "Reading your skills",
    description: "Evaluating your technical and soft skills",
    icon: Target,
    duration: 2500,
  },
  {
    title: "Generating insights",
    description: "Creating personalized recommendations",
    icon: Lightbulb,
    duration: 3500,
  },
  {
    title: "Optimizing for ATS",
    description: "Checking ATS compatibility and keywords",
    icon: BarChart3,
    duration: 3000,
  },
  {
    title: "Finalizing analysis",
    description: "Preparing your comprehensive report",
    icon: CheckCircle,
    duration: 2000,
  },
];

export function AILoadingModal({ isOpen, currentStage }: AILoadingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setProgress(0);
      return;
    }

    const totalDuration = analysisStages.reduce((sum, stage) => sum + stage.duration, 0);
    let elapsedTime = 0;

    const interval = setInterval(() => {
      elapsedTime += 100;
      const newProgress = Math.min((elapsedTime / totalDuration) * 100, 100);
      setProgress(newProgress);

      // Calculate current step based on elapsed time
      let stepTime = 0;
      for (let i = 0; i < analysisStages.length; i++) {
        stepTime += analysisStages[i].duration;
        if (elapsedTime <= stepTime) {
          setCurrentStep(i);
          break;
        }
      }

      if (elapsedTime >= totalDuration) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  // Mobile-optimized stages (show only 3 key stages on mobile)
  const mobileStages = analysisStages.filter((_, index) => 
    index === 0 || index === 2 || index === 5 // Parsing, Skills, Finalizing
  );

  const displayStages = window.innerWidth < 768 ? mobileStages : analysisStages;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md lg:max-w-2xl">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Main Card */}
        <div className="bg-card border border-card-border rounded-2xl p-4 lg:p-6 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-6 lg:mb-8">
            <div className="relative inline-flex items-center justify-center mb-3 lg:mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-md opacity-75"></div>
              <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400 animate-pulse" />
              </div>
            </div>
            
            <h2 className="text-xl lg:text-2xl font-bold text-card-foreground mb-2">
              AI Analysis in Progress
            </h2>
            <p className="text-sm lg:text-base text-muted-foreground">
              Our AI is carefully reviewing your resume
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6 lg:mb-8">
            <div className="flex justify-between text-xs lg:text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Current Stage - Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
            {displayStages.map((stage, index) => {
              const Icon = stage.icon;
              const isActive = analysisStages.indexOf(stage) === currentStep;
              const isCompleted = analysisStages.indexOf(stage) < currentStep;
              
              return (
                <div
                  key={analysisStages.indexOf(stage)}
                  className={cn(
                    "flex items-center gap-2 lg:gap-3 p-3 lg:p-4 rounded-xl transition-all duration-300",
                    isActive && "bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200",
                    isCompleted && "opacity-60"
                  )}
                >
                  {/* Step Indicator */}
                  <div className={cn(
                    "flex-shrink-0 w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    isCompleted && "bg-green-100 border-green-500 text-green-600",
                    isActive && "bg-gradient-to-r from-purple-600 to-blue-600 border-transparent text-white",
                    !isCompleted && !isActive && "bg-muted border-muted-foreground/20 text-muted-foreground"
                  )}>
                    {isCompleted ? (
                      <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4" />
                    ) : (
                      <Icon className="w-3 h-3 lg:w-4 lg:h-4" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className={cn(
                      "font-semibold text-xs lg:text-sm transition-colors",
                      isActive && "text-card-foreground",
                      !isActive && "text-muted-foreground"
                    )}>
                      {stage.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5 lg:mt-1 hidden lg:block">
                      {stage.description}
                    </p>
                  </div>

                  {/* Loading Animation for Active Stage */}
                  {isActive && (
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Estimated Time */}
          <div className="mt-4 lg:mt-6 text-center">
            <p className="text-xs lg:text-sm text-muted-foreground">
              Estimated time: 15-30 seconds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
