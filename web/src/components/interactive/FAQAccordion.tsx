"use client"

import * as React from "react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export interface FAQ {
  id: string
  question: string
  answer: string
}

interface FAQAccordionProps {
  faqs: FAQ[]
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  if (!faqs || faqs.length === 0) {
    return <div className="text-gray-500 italic">No FAQs available at this time.</div>
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id}>
          <AccordionTrigger className="text-lg">{faq.question}</AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
