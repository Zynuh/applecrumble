"use client";

import Link from "next/link";
import { ArrowRight, Compass, Route, Sparkles } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ContinueLearningButton } from "@/components/learning/continue-learning-button";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllSubjectProgress, getContinueLearning, getLearner } from "@/lib/catalog";
import { LanguagePriorityControl } from "@/components/i18n/language-priority-control";
import { useLocale } from "@/components/i18n/locale-provider";

export default function LandingPage() {
  const { t } = useLocale();
  const learner = getLearner();
  const continueTarget = getContinueLearning();
  const subjects = getAllSubjectProgress();

  return (
    <div className="landing-theme-surface min-h-full">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Logo />
        <div className="flex items-center gap-2">
          <LanguagePriorityControl />
          <Button nativeButton={false} variant="ghost" size="sm" className="hidden sm:inline-flex" render={<Link href="/dashboard" />}>
            {t("landing.login")}
          </Button>
          <Button nativeButton={false} size="sm" className="rounded-full" render={<Link href="/dashboard" />}>
            {t("landing.openApp")}
          </Button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
        <section className="grid items-center gap-12 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
          <div>
            <p className="mb-4 inline-flex items-center rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
              {t("landing.badge")}
            </p>
            <h1 className="max-w-xl text-4xl leading-[1.1] font-medium sm:text-6xl">
              {t("landing.heading")}
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-8 text-muted-foreground">
              {t("landing.description")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ContinueLearningButton />
              <Button nativeButton={false} variant="outline" size="lg" className="rounded-full" render={<Link href="/subjects" />}>
                {t("landing.subjects")}
              </Button>
            </div>
            {continueTarget ? (
              <p className="mt-4 text-sm text-muted-foreground">
                {t("landing.nextStep", {
                  name: learner.displayName,
                  lesson: continueTarget.lesson.title,
                  subject: continueTarget.subject.name,
                })}
              </p>
            ) : null}
          </div>

          <div className="rounded-[2rem] border border-border/80 bg-card/80 p-6 shadow-2xl shadow-primary/15">
            <p className="text-sm font-medium text-muted-foreground">{t("landing.currentLevel")}</p>
            <p className="mt-2 font-heading text-4xl">{t("common.grade")} {learner.currentGradeEstimate.toFixed(1)}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t("common.target")}: {learner.targetGrade}</p>
            <div className="mt-6 space-y-4">
              {subjects.slice(0, 3).map((summary) => (
                <div key={summary.subject.slug}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>{summary.subject.name}</span>
                    <span className="tabular-nums text-muted-foreground">{summary.percent}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${summary.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/dashboard"
              className="mt-6 inline-flex items-center gap-1 text-sm font-medium"
            >
              {t("landing.dashboard")}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Compass,
              title: t("landing.feature1.title"),
              text: t("landing.feature1.text"),
            },
            {
              icon: Route,
              title: t("landing.feature2.title"),
              text: t("landing.feature2.text"),
            },
            {
              icon: Sparkles,
              title: t("landing.feature3.title"),
              text: t("landing.feature3.text"),
            },
          ].map((item) => (
            <Card key={item.title} className="bg-card/70 shadow-none">
              <CardHeader>
                <item.icon className="mb-2 size-5 text-primary" />
                <CardTitle>{item.title}</CardTitle>
                <CardDescription className="leading-6">{item.text}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
