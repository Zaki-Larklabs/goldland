import * as React from "react";
import { cn } from "@/lib/utils";
import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface GlobalCtaProps extends React.HTMLAttributes<HTMLDivElement> {
  phoneNumber?: string;
  whatsappNumber?: string;
}

export function GlobalCta({
  phoneNumber = "+971 4 229 2800",
  whatsappNumber = "971566321734",
  className,
  ...props
}: GlobalCtaProps) {
  const waLink = `https://wa.me/${whatsappNumber}?text=Hi,%20I%20am%20looking%20for%20assistance%20with%20Dubai%20approvals.`;
  
  return (
    <div className={cn("flex flex-col sm:flex-row gap-4 items-center", className)} {...props}>
      <Button asChild variant="outline" className="w-full sm:w-auto min-w-[200px] border-ink dark:border-border-dark dark:text-white group">
        <a href={`tel:${phoneNumber.replace(/\s+/g, '')}`}>
          <Phone className="mr-2 h-4 w-4 group-hover:text-brass transition-colors" />
          Call {phoneNumber}
        </a>
      </Button>
      
      <Button asChild className="w-full sm:w-auto min-w-[200px] bg-[#25D366] text-white hover:bg-[#20bd5a]">
        <a href={waLink} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="mr-2 h-4 w-4" />
          WhatsApp Us
        </a>
      </Button>
    </div>
  );
}
