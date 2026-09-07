import React from "react";
import Link from "next/link";

export default function FaqsIndex() {
  const faqs = [
    { q: "How long does DM approval take for a standard office fit-out?", a: "Standard approvals typically take 3-5 working days assuming all documents and drawings are correct upon first submission. Complex projects may take longer." },
    { q: "Do I need DCD approval if I'm not changing the sprinklers?", a: "Yes, Civil Defence (DCD) approval is often required for any partition changes, as the layout affects fire exit routes and safety compliance, even if sprinklers are untouched." },
    { q: "Can you help with getting the NOC from my landlord?", a: "Yes. Goldland's project management team coordinates directly with building management, developers, and landlords to acquire the necessary NOCs." },
    { q: "What is the difference between DDA and Dubai Municipality?", a: "DDA (Dubai Development Authority) governs specific free zones like Dubai Media City and Internet City, while Dubai Municipality (DM) governs the mainland and certain other areas. The jurisdiction depends strictly on your project's location." },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-primary text-primary-foreground py-20 px-6 sm:px-12">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-lg opacity-80">
            Clear, verified answers to the most common questions regarding Dubai fit-out approvals, design, and engineering.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 sm:px-12 bg-background">
        <div className="container mx-auto max-w-4xl space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg bg-surface p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-primary">{faq.q}</h3>
              <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
            </div>
          ))}

          <div className="mt-12 p-8 bg-primary/5 rounded-lg border text-center">
            <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">Chat with our AI assistant or speak directly to a Goldland engineer.</p>
            <Link href="/contact" className="inline-block bg-primary text-primary-foreground font-medium px-8 py-3 rounded hover:bg-primary/90 transition-colors">
              Ask Your Question
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
