"use client";

import React from "react";
import Link from "next/link";

interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "white";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function CTAButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}: CTAButtonProps) {
  // Styles map to brand tokens in site-config.json
  const baseStyle =
    "inline-flex items-center justify-center font-semibold rounded-md transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const sizeStyle = "px-6 py-3 text-sm md:text-base tracking-wide shadow-sm";

  const variants = {
    primary:
      "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white hover:shadow-lg hover:shadow-orange-500/20 focus:ring-orange-500 border border-transparent",
    secondary:
      "bg-primary hover:bg-slate-800 text-white hover:shadow-lg hover:shadow-primary/20 focus:ring-primary border border-transparent",
    outline:
      "bg-transparent hover:bg-slate-50 border-2 border-primary text-primary hover:text-secondary focus:ring-primary",
    white:
      "bg-white hover:bg-slate-100 text-primary border border-transparent hover:shadow-lg focus:ring-white",
  };

  const combinedClassName = `${baseStyle} ${sizeStyle} ${variants[variant]} ${
    disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
    >
      {children}
    </button>
  );
}

export default CTAButton;
