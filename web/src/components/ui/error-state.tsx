import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import { Button } from "./button";

interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  retryAction?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred while loading this content.",
  retryAction,
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 p-8 text-center dark:border-stamp-red/30 dark:bg-stamp-red/10",
        className
      )}
      {...props}
    >
      <AlertTriangle className="mb-4 h-12 w-12 text-stamp-red" />
      <h3 className="mb-2 text-xl font-bold text-stamp-red font-display">
        {title}
      </h3>
      <p className="mb-6 max-w-sm text-sm text-red-700 dark:text-red-300">
        {description}
      </p>
      {retryAction && (
        <Button variant="destructive" onClick={retryAction}>
          Try Again
        </Button>
      )}
    </div>
  );
}
