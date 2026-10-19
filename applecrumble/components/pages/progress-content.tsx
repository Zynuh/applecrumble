"use client";

import Link from "next/link";
import { ContinueLearningButton } from "@/components/learning/continue-learning-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import {
  getAllSubjectProgress,
  getLearner,
  getOverallPercent,
  getRecentCompletions,
  getWeeklyActivity,
} from "@/lib/catalog";
import { useLocale } from "@/components/i18n/locale-provider";

export default function ProgressPage() {
  const { t } = useLocale();
  const learner = getLearner();
  const overall = getOverallPercent();
  const subjects = getAllSubjectProgress();
  const weekly = getWeeklyActivity();
  const recent = getRecentCompletions();
  const maxMinutes = Math.max(...weekly.map((day) => day.minutes), 1);
  const remainingGrades = learner.targetGrade - learner.currentGradeEstimate;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-primary">{t("nav.progress")}</p>
          <h1 className="mt-1 text-4xl font-medium">{t("progress.heading")}</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {t("progress.remaining", {
              name: learner.displayName,
              grade: learner.currentGradeEstimate.toFixed(1),
              remaining: remainingGrades.toFixed(1),
            })}
          </p>
        </div>
        <ContinueLearningButton />
      </div>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="font-heading text-2xl">{t("progress.overall")}</CardTitle>
            <CardDescription>{t("progress.overallDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-heading text-5xl">{overall}%</p>
            <Progress value={overall} className="mt-4">
              <ProgressLabel>{t("progress.toward", { grade: learner.targetGrade })}</ProgressLabel>
              <ProgressValue />
            </Progress>
            <div className="mt-6 flex h-16 items-end gap-2">
              {weekly.map((day) => (
                <div key={day.day} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-16 w-full items-end rounded-full bg-muted">
                    <div
                      className="w-full rounded-full bg-primary"
                      style={{ height: `${Math.max(8, (day.minutes / maxMinutes) * 100)}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{day.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>{t("progress.streakGoal")}</CardTitle>
            <CardDescription>{t("progress.consistency")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl bg-muted/60 px-4 py-3">
              <p className="text-sm text-muted-foreground">{t("progress.currentStreak")}</p>
              <p className="font-heading text-3xl">{t("dashboard.days", { count: learner.streakDays })}</p>
            </div>
            <div className="rounded-2xl bg-muted/60 px-4 py-3">
              <p className="text-sm text-muted-foreground">{t("progress.weeklyGoal")}</p>
              <p className="font-heading text-3xl">
                {learner.weeklyMinutesDone}/{learner.weeklyGoalMinutes} {t("dashboard.minutes")}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium">{t("progress.bySubject")}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {subjects.map((summary) => (
            <Card key={summary.subject.slug} className="shadow-none">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{summary.subject.name}</CardTitle>
                  <Badge variant="secondary">{summary.percent}%</Badge>
                </div>
                <CardDescription>{summary.subject.tagline}</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={summary.percent} className="mb-4">
                  <ProgressLabel>
                    {summary.completedLessons}/{summary.totalLessons} {t("common.lessons")}
                  </ProgressLabel>
                </Progress>
                <Link href={`/subjects/${summary.subject.slug}`} className="text-sm font-medium">
                  {t("progress.openPath")}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium">{t("progress.recent")}</h2>
        <div className="space-y-3">
          {recent.map((entry) => (
            <Link
              key={entry.lessonId}
              href={`/learn/${entry.lesson.id}`}
              className="flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3 hover:bg-muted/40"
            >
              <div>
                <p className="font-medium">{entry.lesson.title}</p>
                <p className="text-sm text-muted-foreground">{entry.subject.name}</p>
              </div>
              <Badge variant="outline">{entry.scorePercent}%</Badge>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
