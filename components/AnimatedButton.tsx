"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

type AnimatedButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "ghost";
  href?: string;
};

export default function AnimatedButton({
  children,
  variant = "primary",
  className = "",
  href,
  ...rest
}: AnimatedButtonProps) {
  const base =
    "px-6 py-3 rounded-xl font-semibold inline-flex items-center justify-center gap-2 " +
    "transition-all duration-200 hover:translate-y-[-2px] active:scale-95 shadow-lg shadow-black/20";

  const styles =
    variant === "primary"
      ? "bg-white text-black hover:opacity-90 shadow-lg shadow-black/30"
      : "bg-white/10 text-white hover:bg-white/15 border border-white/10";

  const classes = `${base} ${styles} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...(rest as any)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
