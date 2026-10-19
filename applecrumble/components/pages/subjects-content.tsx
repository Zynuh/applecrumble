"use client";

import { ContinueLearningButton } from "@/components/learning/continue-learning-button";
import { SubjectCard } from "@/components/learning/subject-card";
import { getAllSubjectProgress } from "@/lib/catalog";
import { useLocale } from "@/components/i18n/locale-provider";

export default function SubjectsPage() {
  const { t } = useLocale();
  const subjects = getAllSubjectProgress();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-primary">{t("subjects.eyebrow")}</p>
          <h1 className="mt-1 text-4xl font-medium">{t("subjects.heading")}</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {t("subjects.description")}
          </p>
        </div>
        <ContinueLearningButton />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {subjects.map((summary) => (
          <SubjectCard key={summary.subject.slug} summary={summary} />
        ))}
      </div>
    </div>
  );
}
