"use client";

import { ChevronDown, ChevronUp, Languages } from "lucide-react";
import { languageNames } from "@/lib/i18n";
import { useLocale } from "@/components/i18n/locale-provider";

export function LanguagePriorityControl() {
  const { order, moveLanguage, t } = useLocale();

  return (
    <details className="group relative">
      <summary
        className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm font-medium hover:bg-muted [&::-webkit-details-marker]:hidden"
        aria-label={t("nav.language")}
      >
        <Languages className="size-4 text-primary" />
        <span>{languageNames[order[0]]}</span>
      </summary>
      <div className="absolute right-0 z-50 mt-2 w-72 rounded-2xl border border-border bg-card p-3 shadow-xl">
        <p className="px-2 pb-2 text-sm font-semibold">{t("nav.language")}</p>
        <p className="px-2 pb-3 text-xs text-muted-foreground">{t("nav.languageHint")}</p>
        <ol className="space-y-1">
          {order.map((language, index) => (
            <li
              key={language}
              className="flex items-center justify-between rounded-xl px-2 py-1.5 text-sm hover:bg-muted"
            >
              <span>
                <span className="mr-2 tabular-nums text-muted-foreground">{index + 1}.</span>
                {languageNames[language]}
              </span>
              <span className="flex">
                <button
                  type="button"
                  className="rounded-md p-1.5 text-muted-foreground hover:bg-background hover:text-foreground disabled:opacity-30"
                  aria-label={t("nav.moveUp", { language: languageNames[language] })}
                  disabled={index === 0}
                  onClick={() => moveLanguage(language, -1)}
                >
                  <ChevronUp className="size-4" />
                </button>
                <button
                  type="button"
                  className="rounded-md p-1.5 text-muted-foreground hover:bg-background hover:text-foreground disabled:opacity-30"
                  aria-label={t("nav.moveDown", { language: languageNames[language] })}
                  disabled={index === order.length - 1}
                  onClick={() => moveLanguage(language, 1)}
                >
                  <ChevronDown className="size-4" />
                </button>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </details>
  );
}
