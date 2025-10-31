import { useState, useEffect } from "react";
import { Clock, AlertCircle } from "lucide-react";

interface RateLimitStatusProps {
  className?: string;
}

export function RateLimitStatus({ className = "" }: RateLimitStatusProps) {
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkRateLimitStatus = async () => {
    try {
      const response = await fetch("/api/rate-limit-status");
      if (response.ok) {
        const data = await response.json();
        setRemainingTime(data.remainingTime);
      }
    } catch (error) {
      console.error("Failed to check rate limit status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkRateLimitStatus();
    
    // Check status every 30 seconds
    const interval = setInterval(checkRateLimitStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return null;
  }

  if (!remainingTime || remainingTime <= 0) {
    return null;
  }

  const hours = Math.floor(remainingTime / (60 * 60 * 1000));
  const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

  return (
    <div className={`bg-yellow-50 border border-yellow-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-yellow-900 mb-1">
            AI Analysis Cooldown
          </h4>
          <p className="text-sm text-yellow-700 mb-2">
            You can perform another AI analysis in:
          </p>
          <div className="flex items-center gap-4 text-yellow-800">
            {hours > 0 && (
              <div className="text-center">
                <div className="text-lg font-bold">{hours}</div>
                <div className="text-xs">hours</div>
              </div>
            )}
            <div className="text-center">
              <div className="text-lg font-bold">{minutes}</div>
              <div className="text-xs">minutes</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">{seconds}</div>
              <div className="text-xs">seconds</div>
            </div>
          </div>
          <p className="text-xs text-yellow-600 mt-2">
            Basic analysis is always available. This limit helps us manage AI costs.
          </p>
        </div>
      </div>
    </div>
  );
}
