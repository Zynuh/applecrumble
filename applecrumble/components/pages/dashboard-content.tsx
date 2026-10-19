"use client";

import Link from "next/link";
import { Flame, Target, Timer } from "lucide-react";
import { ContinueLearningButton } from "@/components/learning/continue-learning-button";
import { SubjectCard } from "@/components/learning/subject-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getAllSubjectProgress,
  getContinueLearning,
  getLearner,
  getOverallPercent,
} from "@/lib/catalog";
import { useLocale } from "@/components/i18n/locale-provider";

export default function DashboardPage() {
  const { t } = useLocale();
  const learner = getLearner();
  const continueTarget = getContinueLearning();
  const subjects = getAllSubjectProgress();
  const overall = getOverallPercent();

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-6 rounded-[2rem] bg-foreground px-6 py-8 text-background sm:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm text-background/70">{t("dashboard.welcome", { name: learner.displayName })}</p>
            <h1 className="mt-2 max-w-2xl text-3xl font-medium sm:text-5xl">
              {t("dashboard.headline")}
            </h1>
            {continueTarget ? (
              <p className="mt-3 max-w-xl text-background/75">
                {continueTarget.subject.name} · {continueTarget.module.title}: {continueTarget.lesson.title}
              </p>
            ) : null}
          </div>
          <ContinueLearningButton className="bg-background text-foreground hover:bg-background/90" />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-none">
          <CardHeader>
            <Target className="size-4 text-primary" />
            <CardTitle>{t("dashboard.location")}</CardTitle>
            <CardDescription>{t("dashboard.locationDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="font-heading text-3xl">
            {t("common.grade")} {learner.currentGradeEstimate.toFixed(1)}
            <span className="mt-1 block text-sm font-sans font-normal text-muted-foreground">
              {t("common.target")} {t("common.grade")} {learner.targetGrade}
            </span>
          </CardContent>
        </Card>
        <Card className="shadow-none">
          <CardHeader>
            <Flame className="size-4 text-primary" />
            <CardTitle>{t("dashboard.streak")}</CardTitle>
            <CardDescription>{t("dashboard.streakDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="font-heading text-3xl">
            {t("dashboard.days", { count: learner.streakDays })}
            <span className="mt-1 block text-sm font-sans font-normal text-muted-foreground">
              {t("common.progress")} {overall}%
            </span>
          </CardContent>
        </Card>
        <Card className="shadow-none">
          <CardHeader>
            <Timer className="size-4 text-primary" />
            <CardTitle>{t("dashboard.weeklyGoal")}</CardTitle>
            <CardDescription>{t("dashboard.weeklyDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="font-heading text-3xl">
            {learner.weeklyMinutesDone}/{learner.weeklyGoalMinutes} {t("dashboard.minutes")}
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{
                  width: `${Math.min(100, Math.round((learner.weeklyMinutesDone / learner.weeklyGoalMinutes) * 100))}%`,
                }}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-medium">{t("dashboard.yourSubjects")}</h2>
          <Link href="/subjects" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            {t("dashboard.allSubjects")}
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {subjects.map((summary) => (
            <SubjectCard key={summary.subject.slug} summary={summary} />
          ))}
        </div>
      </section>

      {continueTarget ? (
        <section className="rounded-3xl border border-dashed border-border bg-card/50 p-6">
          <Badge variant="secondary">{t("dashboard.recommended")}</Badge>
          <h2 className="mt-3 text-2xl font-medium">{continueTarget.lesson.title}</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">{continueTarget.lesson.summary}</p>
          <div className="mt-5">
            <ContinueLearningButton label={t("dashboard.openLesson")} />
          </div>
        </section>
      ) : null}
    </div>
  );
}
