import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface RateLimitStatusProps {
  className?: string;
}

interface RateLimitInfo {
  remainingTime: number;
  nextAvailable: string | null;
  allowed: boolean;
}

export function RateLimitStatus({ className = "" }: RateLimitStatusProps) {
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  useEffect(() => {
    // Check if we have rate limit info stored locally
    const storedRateLimit = localStorage.getItem('rateLimitInfo');
    if (storedRateLimit) {
      try {
        const rateLimitInfo: RateLimitInfo = JSON.parse(storedRateLimit);
        const now = Date.now();
        const nextAvailable = rateLimitInfo.nextAvailable ? new Date(rateLimitInfo.nextAvailable).getTime() : 0;
        
        if (nextAvailable > now) {
          setRemainingTime(nextAvailable - now);
        } else {
          // Rate limit expired, clear storage
          localStorage.removeItem('rateLimitInfo');
          setRemainingTime(null);
        }
      } catch (error) {
        console.error("Failed to parse stored rate limit info:", error);
        localStorage.removeItem('rateLimitInfo');
      }
    }

    // Listen for rate limit updates from AI analysis
    const handleRateLimitUpdate = (event: CustomEvent) => {
      const rateLimitInfo: RateLimitInfo = event.detail;
      if (rateLimitInfo && !rateLimitInfo.allowed && rateLimitInfo.remainingTime > 0) {
        setRemainingTime(rateLimitInfo.remainingTime);
        // Store in localStorage for persistence
        localStorage.setItem('rateLimitInfo', JSON.stringify(rateLimitInfo));
      }
    };

    // Add event listener
    window.addEventListener('rateLimitUpdate', handleRateLimitUpdate as EventListener);

    // Update timer every second
    const interval = setInterval(() => {
      if (remainingTime && remainingTime > 1000) {
        setRemainingTime(remainingTime - 1000);
      } else if (remainingTime && remainingTime <= 1000) {
        setRemainingTime(null);
        localStorage.removeItem('rateLimitInfo');
      }
    }, 1000);

    return () => {
      window.removeEventListener('rateLimitUpdate', handleRateLimitUpdate as EventListener);
      clearInterval(interval);
    };
  }, [remainingTime]);

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
