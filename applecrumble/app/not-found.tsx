"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { useLocale } from "@/components/i18n/locale-provider";

export default function NotFound() {
  const { t } = useLocale();
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-4 px-6 text-center">
      <Logo />
      <h1 className="text-3xl font-medium">{t("notFound.heading")}</h1>
      <p className="max-w-md text-muted-foreground">
        {t("notFound.description")}
      </p>
      <div className="flex gap-2">
        <Button nativeButton={false} className="rounded-full" render={<Link href="/dashboard" />}>
          {t("notFound.dashboard")}
        </Button>
        <Button nativeButton={false} variant="outline" className="rounded-full" render={<Link href="/subjects" />}>
          {t("notFound.subjects")}
        </Button>
      </div>
    </div>
  );
}
