import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
  text?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
};

export function LoadingSpinner({ size = "md", text, className, ...props }: LoadingSpinnerProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center space-y-2", className)} {...props}>
      <Loader2 className={cn("animate-spin text-brass", sizeClasses[size])} />
      {text && <span className="text-sm font-medium text-gray-500">{text}</span>}
    </div>
  );
}
