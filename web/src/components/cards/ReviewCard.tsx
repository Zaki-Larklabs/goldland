import * as React from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Star, BadgeCheck, ShieldAlert } from "lucide-react"

export interface ReviewCardProps {
  reviewerName: string
  content: string
  rating?: number | null
  isVerified?: boolean | null
  source?: string | null
  permissionStatus?: "granted" | "pending" | "anonymous"
}

export function ReviewCard({ reviewerName, content, rating = 5, isVerified, source, permissionStatus = "granted" }: ReviewCardProps) {
  return (
    <Card className="h-full bg-gray-50 dark:bg-ink-soft border-border-light dark:border-border-dark relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
      {/* Verification State Banner */}
      <div className={`absolute top-0 left-0 w-full h-1 ${isVerified ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'}`} />
      
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex gap-1">
            {Array.from({ length: rating || 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-brass text-brass" />
            ))}
          </div>
          {isVerified ? (
            <div className="flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
              <BadgeCheck className="h-3 w-3" /> Verified Client
            </div>
          ) : (
            <div className="flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">
              <ShieldAlert className="h-3 w-3" /> Unverified
            </div>
          )}
        </div>
        <p className="text-ink dark:text-white italic relative z-10 text-base leading-relaxed">
          "{content}"
        </p>
      </CardHeader>
      <CardContent className="pt-2 border-t border-border-light dark:border-border-dark mt-auto">
        <div className="font-bold text-sm text-gray-900 dark:text-gray-100 mb-1">
          {permissionStatus === "anonymous" ? "Verified Client (Name Withheld)" : reviewerName}
        </div>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Source: {source || "[CMS Placeholder]"}</span>
          <span className="uppercase tracking-wider">Perm: {permissionStatus}</span>
        </div>
      </CardContent>
    </Card>
  )
}
