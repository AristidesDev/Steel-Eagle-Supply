import React from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  preTitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  preTitle,
  align = "center",
  light = false,
  className = "",
}: SectionHeadingProps) {
  const alignmentClass = align === "center" ? "text-center mx-auto" : "text-left";
  
  return (
    <div className={`mb-12 md:mb-16 max-w-3xl ${alignmentClass} ${className} animate-fade-in`}>
      {preTitle && (
        <span className="text-accent text-xs font-bold tracking-widest uppercase block mb-3">
          {preTitle}
        </span>
      )}
      <h2
        className={`text-3xl md:text-4xl font-extrabold tracking-tight mb-4 ${
          light ? "text-white" : "text-primary"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-lg md:text-xl leading-relaxed ${
            light ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
