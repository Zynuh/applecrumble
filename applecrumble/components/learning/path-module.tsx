import Link from "next/link";
import { Check, Lock, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLessonStatus, lessonKindLabel } from "@/lib/catalog";
import type { Lesson, Module } from "@/lib/domain";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/i18n/locale-provider";

export function PathModule({
  module,
  lessons,
  orderedLessons,
}: {
  module: Module;
  lessons: Lesson[];
  orderedLessons: Lesson[];
}) {
  const { t } = useLocale();

  return (
    <Card className="bg-card/80 shadow-none">
      <CardHeader className="border-b">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{module.gradeBand}</Badge>
        </div>
        <CardTitle className="font-heading text-xl">{module.title}</CardTitle>
        <CardDescription>{module.summary}</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <ol className="relative ml-3 border-l border-border">
          {lessons.map((lesson) => {
            const status = getLessonStatus(lesson, orderedLessons);
            const locked = status === "locked";
            const href = `/learn/${lesson.id}`;

            return (
              <li key={lesson.id} className="relative py-4 pl-8">
                <span
                  className={cn(
                    "absolute top-5 -left-3.5 grid size-7 place-items-center rounded-full border",
                    status === "completed" && "border-primary bg-primary text-primary-foreground",
                    status === "current" && "border-primary bg-background text-primary",
                    status === "available" && "border-border bg-background text-foreground",
                    locked && "border-border bg-muted text-muted-foreground",
                  )}
                >
                  {status === "completed" ? (
                    <Check className="size-3.5" />
                  ) : locked ? (
                    <Lock className="size-3.5" />
                  ) : (
                    <Play className="size-3.5" />
                  )}
                </span>

                {locked ? (
                  <div className="rounded-2xl bg-muted/40 px-4 py-3">
                    <p className="font-medium">{lesson.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{lesson.summary}</p>
                  </div>
                ) : (
                  <Link
                    href={href}
                    className={cn(
                      "block rounded-2xl px-4 py-3 ring-1 ring-border transition-colors hover:bg-muted/50",
                      status === "current" && "bg-primary/5 ring-primary/30",
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium">{lesson.title}</p>
                      <Badge variant="secondary">{lessonKindLabel[lesson.kind]}</Badge>
                      {status === "current" ? <Badge>{t("path.now")}</Badge> : null}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {lesson.summary} · {t("path.minutes", { minutes: lesson.durationMinutes })}
                    </p>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
