"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface CardProps {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
  tags?: string[];
  footerText?: string;
  className?: string;
}

export function Card({
  title,
  description,
  imageSrc,
  imageAlt,
  href,
  tags,
  footerText,
  className = "",
}: CardProps) {
  const cardContent = (
    <>
      {imageSrc && (
        <div className="relative w-full h-48 md:h-56 bg-slate-900 overflow-hidden">
          {/* Deferred actual image using fallback placeholder or Next.js image */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-10" />
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              // Handle placeholder or deferred images
              const target = e.target as HTMLElement;
              target.style.display = "none";
            }}
          />
          {/* Dynamic premium fallback visual if image fails to load or is placeholder */}
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center select-none border-b border-slate-800">
            <span className="text-slate-500 font-mono text-xs tracking-widest uppercase">
              {imageAlt || "Steel Eagle Supply"}
            </span>
          </div>
        </div>
      )}
      
      <div className="p-6 flex flex-col flex-grow">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-2xs font-semibold uppercase tracking-wider bg-slate-100 text-slate-600 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors duration-300 mb-2">
          {title}
        </h3>
        
        <p className="text-sm text-slate-600 leading-relaxed flex-grow">
          {description}
        </p>
        
        {(footerText || href) && (
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            {footerText && (
              <span className="text-slate-500 font-medium">{footerText}</span>
            )}
            {href && (
              <span className="text-secondary font-bold group-hover:text-accent flex items-center gap-1 transition-colors duration-300">
                Learn More
                <svg
                  className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );

  const containerClasses = `group flex flex-col h-full bg-white border border-slate-200/80 rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300/60 transition-all duration-300 transform hover:-translate-y-1 animate-slide-up ${className}`;

  if (href) {
    return (
      <Link href={href} className={containerClasses}>
        {cardContent}
      </Link>
    );
  }

  return <div className={containerClasses}>{cardContent}</div>;
}

export default Card;
