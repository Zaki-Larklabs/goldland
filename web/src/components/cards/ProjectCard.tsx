import * as React from "react"
import Image from "next/image"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export interface ProjectCardProps {
  id: string
  title: string
  slug: string
  location?: string | null
  approvalStatus?: string | null
}

export function ProjectCard({ title, slug, location, approvalStatus }: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="block h-full group">
      <Card className="flex flex-col h-full hover:shadow-md transition-all group-hover:border-brass overflow-hidden">
        <div className="h-48 bg-gray-200 dark:bg-ink-mute relative overflow-hidden rounded-t-xl">
          <Image
            src={`/images/projects/${slug}.jpg`}
            alt={`${title} — ${location ?? "Goldland project"}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
            loading="lazy"
            onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-mono text-sm pointer-events-none">
            [Image Placeholder]
          </div>
          {approvalStatus && (
            <div className="absolute top-4 right-4 bg-white/90 dark:bg-ink/90 backdrop-blur text-xs font-semibold px-2 py-1 rounded">
              {approvalStatus}
            </div>
          )}
        </div>
        <CardHeader>
          <CardTitle className="text-lg group-hover:text-brass transition-colors">{title}</CardTitle>
          {location && <CardDescription>{location}</CardDescription>}
        </CardHeader>
        <CardContent className="mt-auto flex items-center text-sm font-medium text-brass">
          View Case Study <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </CardContent>
      </Card>
    </Link>
  )
}
