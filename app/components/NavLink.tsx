"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  disableActive?: boolean;
}

export default function NavLink({ href, children, className = "",disableActive = false  }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = !disableActive && pathname === href;
  const baseClasses = "text-sm font-medium transition-colors";
  const activeClasses = "text-zinc-900 dark:text-zinc-100";
  const inactiveClasses = "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100";

  const classes = `${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${className}`;

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}