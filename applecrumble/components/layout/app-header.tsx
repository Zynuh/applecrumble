"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AccountMenu } from "@/components/account/account-menu";
import { ContinueLearningButton } from "@/components/learning/continue-learning-button";
import { Logo } from "@/components/brand/logo";
import { useLocale } from "@/components/i18n/locale-provider";
import { cn } from "@/lib/utils";

export function AppHeader() {
  const pathname = usePathname();
  const { t } = useLocale();
  const navItems = [
    { href: "/dashboard", label: t("nav.dashboard") },
    { href: "/subjects", label: t("nav.subjects") },
    { href: "/progress", label: t("nav.progress") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Logo href="/dashboard" />
          <div className="flex items-center gap-2">
            <span className="lg:hidden">
              <ContinueLearningButton size="default" />
            </span>
            <span className="lg:hidden">
              <AccountMenu />
            </span>
          </div>
        </div>

        <nav aria-label={t("nav.main")} className="flex items-center gap-1 overflow-x-auto">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
                  active
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ContinueLearningButton size="default" />
          <AccountMenu />
        </div>
      </div>
    </header>
  );
}
