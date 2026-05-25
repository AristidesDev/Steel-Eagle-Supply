import React from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  bg?: "white" | "muted" | "primary" | "gradient";
  className?: string;
}

export function SectionWrapper({
  children,
  id,
  bg = "white",
  className = "",
}: SectionWrapperProps) {
  const backgrounds = {
    white: "bg-white text-primary",
    muted: "bg-muted text-primary border-y border-slate-100",
    primary: "bg-primary text-white",
    gradient: "bg-gradient-to-br from-primary to-slate-900 text-white",
  };

  return (
    <section
      id={id}
      className={`py-16 md:py-24 overflow-hidden ${backgrounds[bg]} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

export default SectionWrapper;
