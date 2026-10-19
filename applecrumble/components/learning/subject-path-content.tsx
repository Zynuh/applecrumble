"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContinueLearningButton } from "@/components/learning/continue-learning-button";
import { PathModule } from "@/components/learning/path-module";
import { Badge } from "@/components/ui/badge";
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import {
  getLessonsBySubject,
  getModulesBySubject,
  getSubject,
  getSubjectProgress,
} from "@/lib/catalog";
import { subjectIcons } from "@/lib/labels";
import { useLocale } from "@/components/i18n/locale-provider";

export function SubjectPathContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { t } = useLocale();
  const subject = getSubject(slug);
  const progress = getSubjectProgress(slug);

  if (!subject || !progress) {
    notFound();
  }

  const Icon = subjectIcons[subject.icon];
  const pathModules = getModulesBySubject(slug);
  const orderedLessons = getLessonsBySubject(slug);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link href="/subjects" className="text-sm text-muted-foreground hover:text-foreground">
          {t("subjects.back")}
        </Link>
        <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="size-6" />
              </span>
              <Badge variant="secondary">{t("subjects.focus", { grade: subject.currentGradeFocus })}</Badge>
            </div>
            <h1 className="text-4xl font-medium">{subject.name}</h1>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{subject.description}</p>
          </div>
          <ContinueLearningButton />
        </div>
        <Progress value={progress.percent} className="mt-8 max-w-xl">
          <ProgressLabel>
            {progress.completedLessons} / {progress.totalLessons} {t("common.lessons")}
          </ProgressLabel>
          <ProgressValue />
        </Progress>
      </div>

      <div className="grid gap-5">
        {pathModules.map((pathModule) => (
          <PathModule
            key={pathModule.id}
            module={pathModule}
            lessons={orderedLessons.filter((lesson) => lesson.moduleId === pathModule.id)}
            orderedLessons={orderedLessons}
          />
        ))}
      </div>
    </div>
  );
}
