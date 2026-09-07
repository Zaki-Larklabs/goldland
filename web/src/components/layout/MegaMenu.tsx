import * as React from "react";
import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const authoritiesList = [
  { title: "Dubai Municipality", href: "/authority-approvals/dubai-municipality", desc: "Mainland building approvals" },
  { title: "DDA", href: "/authority-approvals/dda", desc: "TECOM freezones" },
  { title: "DCD", href: "/authority-approvals/dcd", desc: "Civil Defence fire safety" },
  { title: "DEWA", href: "/authority-approvals/dewa", desc: "Electricity & Water Authority" },
];

export function MegaMenu() {
  return (
    <NavigationMenu.Root className="relative z-10 flex max-w-max flex-1 items-center justify-center hidden lg:flex">
      <NavigationMenu.List className="group flex flex-1 list-none items-center justify-center space-x-1">
        
        <NavigationMenu.Item>
          <NavigationMenu.Link asChild>
            <Link href="/about" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 focus:bg-white/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-[#F1EEE4] hover:text-white">
              About
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 data-[state=open]:bg-white/10 focus:bg-white/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-[#F1EEE4] hover:text-white data-[state=open]:text-white">
            Authorities <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" aria-hidden="true" />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:w-auto">
            <ul className="grid w-[80vw] max-w-[400px] gap-4 p-6 md:w-[550px] lg:w-[700px] md:grid-cols-2">
              {authoritiesList.map((auth) => (
                <li key={auth.title}>
                  <NavigationMenu.Link asChild>
                    <Link
                      href={auth.href}
                      className="group block select-none space-y-1.5 rounded-xl p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-gray-50 hover:shadow-[0_2px_10px_rgba(0,0,0,0.02)] dark:hover:bg-ink-soft focus:bg-gray-50 dark:focus:bg-ink-soft h-full"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-sm font-bold leading-none text-ink dark:text-white group-hover:text-brass transition-colors truncate">{auth.title}</div>
                        <span className="text-brass opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 transform duration-200 text-xs shrink-0">→</span>
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400 mt-2 whitespace-normal break-words">
                        {auth.desc}
                      </p>
                    </Link>
                  </NavigationMenu.Link>
                </li>
              ))}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link asChild>
            <Link href="/services" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 focus:bg-white/10 focus:outline-none text-[#F1EEE4] hover:text-white">
              Services
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        
        <NavigationMenu.Item>
          <NavigationMenu.Link asChild>
            <Link href="/projects" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 focus:bg-white/10 focus:outline-none text-[#F1EEE4] hover:text-white">
              Projects
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>

      </NavigationMenu.List>
      <div className="absolute left-0 top-full flex w-full justify-center perspective-[2000px] pt-2">
        <NavigationMenu.Viewport className="relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-ink shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)] transition-[width,height] duration-300" />
      </div>
    </NavigationMenu.Root>
  );
}
