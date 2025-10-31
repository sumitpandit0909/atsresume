import { Clock, Info } from "lucide-react";

interface RateLimitInfoProps {
  className?: string;
}

export function RateLimitInfo({ className = "" }: RateLimitInfoProps) {
  return (
    <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-blue-900 mb-1">
            AI Analysis Limit
          </h4>
          <p className="text-sm text-blue-700">
            You can perform one AI analysis every 4 hours. This helps us manage costs and ensure 
            fair access for all users. Basic analysis is always available.
          </p>
          <div className="flex items-center gap-2 mt-2 text-xs text-blue-600">
            <Clock className="w-3 h-3" />
            <span>Next analysis available after 4-hour cooldown</span>
          </div>
        </div>
      </div>
    </div>
  );
}
