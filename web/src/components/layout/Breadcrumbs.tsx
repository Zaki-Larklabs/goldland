import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items, className, ...props }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex text-sm text-gray-500 dark:text-gray-400 font-sans", className)}
      {...props}
    >
      <ol className="flex items-center space-x-1 md:space-x-2 flex-wrap">
        <li>
          <Link
            href="/"
            className="hover:text-brass transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded px-1"
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-1 flex-shrink-0" />
              {isLast || !item.href ? (
                <span className="font-semibold text-ink dark:text-white" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-brass transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded px-1"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
