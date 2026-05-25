"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "../layout/LocaleContext";

interface BreadcrumbItem {
  label: string; // The raw label, or translation key
  label_es?: string; // Optional Spanish override
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { locale } = useLocale();

  return (
    <nav aria-label="Breadcrumbs" className="py-4 text-xs md:text-sm font-medium">
      <ol className="flex items-center space-x-2 flex-wrap">
        <li>
          <Link
            href="/"
            className="text-slate-500 hover:text-secondary hover:underline transition-colors duration-200"
          >
            {locale === "en" ? "Home" : "Inicio"}
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const resolvedLabel =
            locale === "es" && item.label_es ? item.label_es : item.label;

          return (
            <React.Fragment key={index}>
              <li className="text-slate-400 select-none">/</li>
              <li>
                {isLast || !item.href ? (
                  <span className="text-primary font-bold truncate max-w-[200px] block" aria-current="page">
                    {resolvedLabel}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-slate-500 hover:text-secondary hover:underline transition-colors duration-200 truncate max-w-[150px] block"
                  >
                    {resolvedLabel}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
