"use client";

import Link from "next/link";
import { LogOut, Moon, Palette, RotateCcw, Sun, UserRound } from "lucide-react";
import { LanguagePriorityControl } from "@/components/i18n/language-priority-control";
import { useLocale } from "@/components/i18n/locale-provider";
import { useThemeSettings } from "@/components/account/theme-provider";

export function AccountMenu() {
  const { t } = useLocale();
  const {
    mode,
    foreground,
    background,
    setMode,
    setForeground,
    setBackground,
    reset,
  } = useThemeSettings();

  return (
    <details className="group relative">
      <summary
        className="grid size-10 cursor-pointer list-none place-items-center rounded-full border border-border bg-card text-foreground transition hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden"
        aria-label={t("account.open")}
        title={t("account.open")}
      >
        <span className="grid size-8 place-items-center rounded-full bg-primary/20 text-primary">
          <UserRound className="size-4" />
        </span>
      </summary>
      <section
        aria-label={t("account.title")}
        className="absolute right-0 z-50 mt-2 w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-2xl"
      >
        <header className="mb-4 flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-full bg-primary/20 text-primary">
            <UserRound className="size-5" />
          </span>
          <span className="min-w-0">
            <span className="block font-semibold">Mira</span>
            <span className="block text-xs text-muted-foreground">{t("account.demo")}</span>
          </span>
        </header>

        <div className="space-y-4">
          <div>
            <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <Palette className="size-4 text-primary" />
              {t("account.appearance")}
            </h2>
            <div className="flex items-center justify-between gap-3 rounded-xl bg-muted/60 p-2.5">
              <span className="flex items-center gap-2 text-sm">
                {mode === "dark" ? <Moon className="size-4" /> : <Sun className="size-4" />}
                {t("account.darkMode")}
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={mode === "dark"}
                aria-label={t("account.darkMode")}
                onClick={() => setMode(mode === "dark" ? "light" : "dark")}
                className={`relative h-6 w-11 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-ring ${
                  mode === "dark" ? "bg-primary" : "bg-border"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 size-4 rounded-full bg-primary-foreground transition-transform ${
                    mode === "dark" ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2">
              <label className="flex items-center justify-between gap-2 rounded-xl bg-muted/60 px-2.5 py-2 text-xs">
                <span>{t("account.textColor")}</span>
                <input
                  type="color"
                  aria-label={t("account.textColor")}
                  value={foreground}
                  onChange={(event) => setForeground(event.currentTarget.value)}
                  className="size-7 cursor-pointer rounded-md border-0 bg-transparent p-0"
                />
              </label>
              <label className="flex items-center justify-between gap-2 rounded-xl bg-muted/60 px-2.5 py-2 text-xs">
                <span>{t("account.backgroundColor")}</span>
                <input
                  type="color"
                  aria-label={t("account.backgroundColor")}
                  value={background}
                  onChange={(event) => setBackground(event.currentTarget.value)}
                  className="size-7 cursor-pointer rounded-md border-0 bg-transparent p-0"
                />
              </label>
            </div>
            <button
              type="button"
              onClick={reset}
              className="mt-2 inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <RotateCcw className="size-3.5" />
              {t("account.reset")}
            </button>
          </div>

          <div>
            <h2 className="mb-2 text-sm font-semibold">{t("account.language")}</h2>
            <LanguagePriorityControl />
          </div>

          <Link
            href="/"
            className="flex items-center gap-2 border-t border-border pt-3 text-sm font-medium text-destructive hover:underline"
          >
            <LogOut className="size-4" />
            {t("account.logout")}
          </Link>
        </div>
      </section>
    </details>
  );
}
