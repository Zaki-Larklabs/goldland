"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { GlobalCta } from "@/components/layout/GlobalCta";

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-vellum dark:bg-ink p-8">
      <div className="max-w-5xl mx-auto space-y-16">
        
        <header className="border-b border-gray-300 dark:border-border-dark pb-8">
          <h1 className="text-4xl font-display font-bold text-ink dark:text-white">Goldland Design System</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Isolated component testing environment.</p>
        </header>

        {/* Batch 1: Foundations */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold border-l-4 border-brass pl-4 text-ink dark:text-white">1. Foundations & Feedback</h2>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Buttons</h3>
            <div className="flex flex-wrap gap-4 items-center bg-white dark:bg-ink-soft p-6 rounded-lg border border-border-light dark:border-border-dark">
              <Button variant="default">Default Brass</Button>
              <Button variant="secondary">Secondary Navy</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
              <Button variant="default" disabled>Disabled</Button>
              <Button size="lg">Large Size</Button>
              <Button size="sm">Small</Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Loading States</h3>
            <div className="flex flex-wrap gap-8 items-center bg-white dark:bg-ink-soft p-6 rounded-lg border border-border-light dark:border-border-dark">
              <LoadingSpinner size="sm" />
              <LoadingSpinner size="md" />
              <LoadingSpinner size="lg" text="Loading architectural data..." />
              
              <div className="flex flex-col gap-2 w-full max-w-sm ml-8">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-32 w-full mt-4" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Empty & Error States</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EmptyState 
                title="No Authority Records" 
                description="We couldn't find any authority records matching your filter."
                actionLabel="Clear Filters"
                onAction={() => console.log('Clear')}
              />
              <ErrorState 
                title="Failed to Load Project"
                description="The database connection timed out."
                retryAction={() => console.log('Retry')}
              />
            </div>
          </div>

        </section>

        {/* Batch 2: Layout */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold border-l-4 border-brass pl-4 text-ink dark:text-white">2. Layout & Navigation</h2>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Breadcrumbs</h3>
            <div className="bg-white dark:bg-ink-soft p-6 rounded-lg border border-border-light dark:border-border-dark">
              <Breadcrumbs 
                items={[
                  { label: "Authority Approvals", href: "/authority-approvals" },
                  { label: "Dubai Municipality" }
                ]} 
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Global CTAs</h3>
            <div className="bg-white dark:bg-ink-soft p-6 rounded-lg border border-border-light dark:border-border-dark">
              <GlobalCta />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
