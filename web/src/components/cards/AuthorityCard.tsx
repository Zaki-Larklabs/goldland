"use client";

import * as React from "react"
import Image from "next/image"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export interface AuthorityCardProps {
  id: string
  name: string
  slug: string
  shortDescription?: string | null
  jurisdiction?: string | null
  isVerified?: boolean | null
}

export function AuthorityCard({ name, slug, shortDescription, jurisdiction, isVerified }: AuthorityCardProps) {
  return (
    <Card className="flex flex-col h-full group hover:border-brass transition-colors">
      <CardHeader>
        <div className="flex justify-between items-start mb-4">
          <div className="h-12 w-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center p-2 shrink-0 overflow-hidden">
            <Image
              src={`/images/authority-logos/${slug}.png`}
              alt={`${name} Logo`}
              width={48}
              height={48}
              sizes="48px"
              className="max-h-full max-w-full object-contain"
              loading="lazy"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = 'none';
                const parent = img.parentElement;
                if (parent) {
                  const span = document.createElement('span');
                  span.className = 'font-display font-bold text-lg text-brass';
                  span.textContent = name.charAt(0).toUpperCase();
                  parent.innerHTML = '';
                  parent.appendChild(span);
                }
              }}
            />
          </div>
          {isVerified && <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" aria-label="Verified Authority" />}
        </div>
        <CardTitle className="text-xl group-hover:text-brass transition-colors mb-2">{name}</CardTitle>
        {jurisdiction && (
          <div className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">
            Jurisdiction: {jurisdiction}
          </div>
        )}
        <CardDescription className="line-clamp-3">
          {shortDescription || "Approval services and NOC documentation for this authority."}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto pt-6">
        <Button asChild variant="ghost" className="w-full justify-between p-0 hover:bg-transparent hover:text-brass">
          <Link href={`/authority-approvals/${slug}`}>
            View Requirements <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
