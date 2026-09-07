import Link from "next/link";
import React from "react";

export default function ProjectApprovalsIndex() {
  const projects = [
    { name: "Warehouse", slug: "warehouse" },
    { name: "Warehouse Mezzanine", slug: "warehouse-mezzanine" },
    { name: "Mezzanine Floor", slug: "mezzanine-floor" },
    { name: "Villa Modification", slug: "villa-modification" },
    { name: "Commercial Fit-Out", slug: "commercial-fitout" },
    { name: "Restaurant", slug: "restaurant" },
    { name: "Cafe", slug: "cafe" },
    { name: "Salon", slug: "salon" },
    { name: "Pharmacy", slug: "pharmacy" },
    { name: "Clinic", slug: "clinic" },
    { name: "Office", slug: "office" },
    { name: "Shop", slug: "shop" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-primary text-primary-foreground py-20 px-6 sm:px-12">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Project Approvals</h1>
          <p className="text-lg opacity-80">
            From commercial offices to warehouse mezzanines, we handle end-to-end design, engineering, and approval coordination for a wide variety of project types.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 sm:px-12 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((proj) => (
              <Link
                key={proj.slug}
                href={`/project-approvals/${proj.slug}`}
                className="group p-6 border rounded-lg bg-surface hover:border-accent hover:shadow-md transition-all text-center flex flex-col items-center justify-center min-h-[160px]"
              >
                <h3 className="text-xl font-bold group-hover:text-accent transition-colors">{proj.name}</h3>
                <span className="mt-4 text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
