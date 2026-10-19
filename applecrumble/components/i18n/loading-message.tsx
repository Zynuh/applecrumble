"use client";

import { useLocale } from "@/components/i18n/locale-provider";

export function LoadingMessage({ messageKey }: { messageKey: "common.loadingLesson" | "common.loadingPath" }) {
  const { t } = useLocale();
  return (
    <p className="text-sm text-muted-foreground" role="status">
      {t(messageKey)}
    </p>
  );
}
