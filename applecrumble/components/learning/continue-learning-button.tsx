"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getContinueLearning } from "@/lib/catalog";
import { useLocale } from "@/components/i18n/locale-provider";
import { cn } from "@/lib/utils";

type ContinueLearningButtonProps = {
  className?: string;
  size?: "default" | "lg";
  label?: string;
};

export function ContinueLearningButton({
  className,
  size = "lg",
  label,
}: ContinueLearningButtonProps) {
  const target = getContinueLearning();
  const { t } = useLocale();
  const buttonLabel = label ?? t("common.continue");

  if (!target) {
    return (
      <Button size={size} className={cn("rounded-full px-5", className)} disabled>
        {buttonLabel}
      </Button>
    );
  }

  return (
    <Button
      nativeButton={false}
      size={size}
      className={cn(
        "rounded-full px-5 shadow-lg shadow-primary/20",
        className,
      )}
      render={<Link href={`/learn/${target.lesson.id}`} />}
    >
      {buttonLabel}
      <ArrowRight data-icon="inline-end" />
    </Button>
  );
}
