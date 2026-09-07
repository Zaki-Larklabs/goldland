import * as React from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { ShieldCheck, Award } from "lucide-react"

export interface CredentialCardProps {
  title: string
  issuer: string
  year?: string
  credentialNumber?: string
  description?: string
  type?: "license" | "certification" | "award"
}

export function CredentialCard({ title, issuer, year, credentialNumber, description, type = "license" }: CredentialCardProps) {
  return (
    <Card className="flex flex-col h-full bg-white dark:bg-ink-soft border-border-light dark:border-border-dark">
      <CardHeader className="flex flex-row items-start gap-4 pb-4">
        <div className="h-12 w-12 bg-gray-100 dark:bg-ink rounded-lg flex items-center justify-center shrink-0">
          {type === "license" ? <ShieldCheck className="h-6 w-6 text-brass" /> : <Award className="h-6 w-6 text-brass" />}
        </div>
        <div>
          <h3 className="text-lg font-bold text-ink dark:text-white leading-tight">{title}</h3>
          <p className="text-sm text-gray-500 font-medium">{issuer}</p>
        </div>
      </CardHeader>
      <CardContent className="pt-0 flex-grow">
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm border-y border-border-light dark:border-border-dark py-3">
          {year && (
            <div>
              <span className="block text-gray-400 text-xs uppercase tracking-wider mb-1">Issued</span>
              <span className="font-mono text-ink dark:text-gray-200">{year}</span>
            </div>
          )}
          {credentialNumber && (
            <div>
              <span className="block text-gray-400 text-xs uppercase tracking-wider mb-1">ID Number</span>
              <span className="font-mono text-ink dark:text-gray-200">{credentialNumber}</span>
            </div>
          )}
        </div>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
