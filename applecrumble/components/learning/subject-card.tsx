import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import type { SubjectProgressSummary } from "@/lib/domain";
import { subjectIcons } from "@/lib/labels";
import { useLocale } from "@/components/i18n/locale-provider";

export function SubjectCard({ summary }: { summary: SubjectProgressSummary }) {
  const Icon = subjectIcons[summary.subject.icon];
  const { t } = useLocale();

  return (
    <Card className="h-full bg-card/80 shadow-none transition-transform hover:-translate-y-0.5">
      <CardHeader>
        <div className="mb-3 flex items-start justify-between">
          <span className="grid size-10 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Icon className="size-5" />
          </span>
          <Badge variant="secondary">{t("common.target")} {t("common.grade")} {summary.subject.targetGrade}</Badge>
        </div>
        <CardTitle className="font-heading text-xl">{summary.subject.name}</CardTitle>
        <CardDescription>{summary.subject.tagline}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <p className="text-sm leading-6 text-muted-foreground">{summary.subject.description}</p>
        <Progress value={summary.percent} className="mt-auto w-full">
          <ProgressLabel>{t("common.progress")}</ProgressLabel>
          <ProgressValue />
        </Progress>
      </CardContent>
      <CardFooter className="justify-between">
        <span className="text-sm text-muted-foreground">
          {summary.completedLessons} / {summary.totalLessons} {t("common.lessons")}
        </span>
        <Link
          href={`/subjects/${summary.subject.slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-foreground"
        >
          {t("common.path")}
          <ArrowUpRight className="size-3.5" />
        </Link>
      </CardFooter>
    </Card>
  );
}
