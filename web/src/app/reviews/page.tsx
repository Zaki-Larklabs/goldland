import React from "react";
import { db } from "@/lib/db";
import { reviews } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { GlobalCta } from "@/components/layout/GlobalCta";
import { ReviewCard } from "@/components/cards/ReviewCard";
import { BadgeCheck, ShieldAlert } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Verified Client Reviews | Goldland Contracting",
  description: "Read verified feedback from our commercial, industrial, and residential fit-out clients across Dubai.",
  alternates: {
    canonical: "https://goldlandcontracting.ae/reviews",
  },
};

export default async function ReviewsPage() {
  // Only fetch explicitly verified reviews
  const verifiedReviews = await db.select().from(reviews).where(eq(reviews.isVerified, true)).orderBy(desc(reviews.createdAt));

  return (
    <div className="bg-vellum dark:bg-ink min-h-screen">
      {/* 1. Hero */}
      <section className="bg-ink text-white pt-24 pb-20 px-4 border-b border-border-dark">
        <div className="container mx-auto max-w-5xl">
          <Breadcrumbs 
            items={[
              { label: "Client Reviews" }
            ]} 
            className="mb-8 text-gray-400 dark:text-gray-400 [&_a]:text-gray-400 [&_span]:text-white"
          />
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Trust, Verified.</h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mb-8">
            We don't fabricate testimonials. Every review listed below has been verified against a real contract and explicit client permission.
          </p>
          <a href="https://g.page/r/Cewj1_Y5-0G7EAE/review" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A544] text-black font-bold uppercase tracking-wider rounded-lg hover:bg-[#C9A544]/90 transition-colors">
            Leave a Review
          </a>
        </div>
      </section>

      {/* 2. Verification Policy */}
      <section className="py-8 px-4 bg-gray-50 dark:bg-ink-soft border-b border-border-light dark:border-border-dark">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="flex items-center gap-3 bg-white dark:bg-ink p-4 rounded-lg shadow-sm border border-border-light dark:border-border-dark flex-1">
              <BadgeCheck className="h-8 w-8 text-green-600" />
              <div>
                <h4 className="font-bold text-ink dark:text-white">Verified Client</h4>
                <p className="text-sm text-gray-500">Cross-checked with internal CRM contracts.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-ink p-4 rounded-lg shadow-sm border border-border-light dark:border-border-dark flex-1">
              <ShieldAlert className="h-8 w-8 text-gray-400" />
              <div>
                <h4 className="font-bold text-ink dark:text-white">Name Withheld (Anonymous)</h4>
                <p className="text-sm text-gray-500">Project verified, but client requested privacy.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Review Grid */}
      <section className="py-20 px-4 bg-white dark:bg-ink">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {verifiedReviews.length > 0 ? (
              verifiedReviews.map(review => (
                <ReviewCard 
                  key={review.id}
                  reviewerName={review.reviewerName}
                  content={review.content ?? ""}
                  rating={review.rating}
                  isVerified={review.isVerified}
                  // Using placeholder data for these fields until schema is updated
                  source="[CMS Placeholder]" 
                  permissionStatus="granted"
                />
              ))
            ) : (
              <div className="col-span-full p-16 text-center text-gray-500 border border-dashed rounded-xl bg-gray-50 dark:bg-ink-soft">
                <ShieldAlert className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">No Verified Reviews Available</h3>
                <p>We strictly enforce a policy against fabricating testimonials. Until verified client feedback is approved for public display via our CMS, this section will remain empty.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Global CTA */}
      <section className="py-24 px-4 bg-ink text-center border-t border-border-dark">
        <div className="container mx-auto max-w-3xl">
          <GlobalCta />
        </div>
      </section>
    </div>
  );
}
