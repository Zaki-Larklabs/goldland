import * as React from "react";
import { cn } from "@/lib/utils";
import { SearchX } from "lucide-react";
import { Button } from "./button";

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({
  title = "No results found",
  description = "We couldn't find anything matching your search. Try adjusting your filters.",
  actionLabel,
  onAction,
  icon,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-border-dark dark:bg-ink-soft",
        className
      )}
      {...props}
    >
      <div className="mb-4 text-gray-400 dark:text-gray-500">
        {icon || <SearchX className="h-12 w-12 mx-auto" />}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-ink dark:text-white font-display">
        {title}
      </h3>
      <p className="mb-6 max-w-sm text-sm text-gray-500 dark:text-gray-400">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="outline" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
