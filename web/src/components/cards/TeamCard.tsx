import * as React from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { CheckCircle2, Link as LinkIcon } from "lucide-react"

export interface TeamCardProps {
  name: string
  role: string
  department?: string
  bio?: string | null
  imageUrl?: string | null
  isVerified?: boolean | null
  linkedInUrl?: string | null
}

export function TeamCard({ name, role, department, bio, imageUrl, isVerified, linkedInUrl }: TeamCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden group">
      <div className="h-64 bg-gray-200 dark:bg-ink-mute relative">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-mono text-sm">
            [Photo Placeholder]
          </div>
        )}
      </div>
      <CardHeader className="border-b border-border-light dark:border-border-dark pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold font-display text-ink dark:text-white flex items-center gap-2">
              {name}
              {isVerified && <CheckCircle2 className="h-4 w-4 text-brass" />}
            </h3>
            <p className="text-sm font-medium text-brass">{role}</p>
          </div>
          {linkedInUrl && (
            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0A66C2]">
              <LinkIcon className="h-5 w-5" />
            </a>
          )}
        </div>
        {department && <p className="text-xs uppercase tracking-wider text-gray-500 mt-1">{department}</p>}
      </CardHeader>
      <CardContent className="pt-4 flex-grow">
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-4">
          {bio || "[CMS Placeholder: Engineering bio highlighting technical qualifications and authority jurisdiction experience.]"}
        </p>
      </CardContent>
    </Card>
  )
}
