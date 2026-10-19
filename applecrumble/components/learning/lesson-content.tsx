"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { ContinueLearningButton } from "@/components/learning/continue-learning-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getAdjacentLessons,
  getLesson,
  getLessonsBySubject,
  getModule,
  getSubject,
} from "@/lib/catalog";
import { useLocale } from "@/components/i18n/locale-provider";

export function LessonContent({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = use(params);
  const { t } = useLocale();
  const lesson = getLesson(lessonId);

  if (!lesson) {
    notFound();
  }

  const subject = getSubject(lesson.subjectSlug);
  const pathModule = getModule(lesson.moduleId);
  const { previous, next } = getAdjacentLessons(lesson.id);
  const ordered = getLessonsBySubject(lesson.subjectSlug);
  const position = ordered.findIndex((item) => item.id === lesson.id) + 1;

  if (!subject || !pathModule) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href={`/subjects/${subject.slug}`}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← {subject.name}
        </Link>
        <ContinueLearningButton size="default" />
      </div>

      <header className="rounded-[1.75rem] bg-foreground px-6 py-7 text-background">
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-background/15 text-background">{pathModule.title}</Badge>
          <Badge className="bg-background/15 text-background">
            {t(`lesson.kind.${lesson.kind}`)}
          </Badge>
        </div>
        <h1 className="mt-4 text-3xl font-medium sm:text-4xl">{lesson.title}</h1>
        <p className="mt-3 flex items-center gap-2 text-sm text-background/75">
          <Clock className="size-4" />
          {t("lesson.minutes", {
            minutes: lesson.durationMinutes,
            position,
            total: ordered.length,
          })}
        </p>
      </header>

      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="font-heading text-2xl">{lesson.content.heading}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-base leading-7">
          {lesson.content.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </CardContent>
      </Card>

      {lesson.content.example ? (
        <Card className="border-primary/20 bg-primary/5 shadow-none">
          <CardHeader>
            <CardTitle>{t("lesson.example")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-base">{lesson.content.example.prompt}</p>
            <p className="rounded-2xl bg-card px-4 py-3 text-sm text-muted-foreground">
              {t("lesson.hint", { hint: lesson.content.example.hint })}
            </p>
          </CardContent>
        </Card>
      ) : null}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {previous ? (
          <Button nativeButton={false} variant="outline" className="rounded-full" render={<Link href={`/learn/${previous.id}`} />}>
            <ArrowLeft data-icon="inline-start" />
            {previous.title}
          </Button>
        ) : (
          <span />
        )}
        {next ? (
          <Button nativeButton={false} className="rounded-full" render={<Link href={`/learn/${next.id}`} />}>
            {t("lesson.next", { title: next.title })}
            <ArrowRight data-icon="inline-end" />
          </Button>
        ) : (
          <Button nativeButton={false} className="rounded-full" render={<Link href="/progress" />}>
            {t("lesson.seeProgress")}
          </Button>
        )}
      </div>
    </div>
  );
}
