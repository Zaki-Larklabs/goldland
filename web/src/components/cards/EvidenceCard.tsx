import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"

export interface EvidenceCardProps {
  label: string
  value: string
  description?: string
}

export function EvidenceCard({ label, value, description }: EvidenceCardProps) {
  return (
    <Card className="border-border-light dark:border-border-dark bg-white dark:bg-ink">
      <CardContent className="p-6 text-center md:text-left flex flex-col justify-center h-full">
        <div className="text-4xl md:text-5xl font-display font-bold text-brass mb-2">
          {value}
        </div>
        <div className="font-semibold text-ink dark:text-white text-lg">
          {label}
        </div>
        {description && (
          <div className="text-sm text-gray-500 mt-2">
            {description}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
