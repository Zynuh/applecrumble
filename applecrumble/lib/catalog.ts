import type {
  ContinueLearningTarget,
  Lesson,
  LessonStatus,
  Module,
  Subject,
  SubjectProgressSummary,
} from "@/lib/domain";
import {
  learner,
  lessonProgress,
  lessons,
  modules,
  subjects,
  weeklyActivity,
} from "@/lib/mock-data";

const progressByLessonId = new Map(
  lessonProgress.map((entry) => [entry.lessonId, entry]),
);

export function getLearner() {
  return learner;
}

export function getWeeklyActivity() {
  return weeklyActivity;
}

export function getSubjects() {
  return subjects;
}

export function getSubject(slug: string): Subject | undefined {
  return subjects.find((subject) => subject.slug === slug);
}

export function getModulesBySubject(slug: string): Module[] {
  return modules.filter((module) => module.subjectSlug === slug);
}

export function getLessonsBySubject(slug: string): Lesson[] {
  return lessons.filter((lesson) => lesson.subjectSlug === slug);
}

export function getAllLessons(): Lesson[] {
  return lessons;
}

export function getLesson(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

export function getModule(id: string): Module | undefined {
  return modules.find((module) => module.id === id);
}

export function getLessonStatus(lesson: Lesson, orderedLessons: Lesson[]): LessonStatus {
  const recorded = progressByLessonId.get(lesson.id);
  if (recorded?.status === "completed" || recorded?.status === "current") {
    return recorded.status;
  }

  const index = orderedLessons.findIndex((item) => item.id === lesson.id);
  const previous = orderedLessons[index - 1];
  if (!previous) {
    return "available";
  }

  const previousStatus = getLessonStatus(previous, orderedLessons);
  if (previousStatus === "completed") {
    return "available";
  }

  return "locked";
}

export function getSubjectProgress(slug: string): SubjectProgressSummary | undefined {
  const subject = getSubject(slug);
  if (!subject) {
    return undefined;
  }

  const subjectLessons = getLessonsBySubject(slug);
  const completedLessons = subjectLessons.filter(
    (lesson) => progressByLessonId.get(lesson.id)?.status === "completed",
  ).length;
  const currentLesson =
    subjectLessons.find((lesson) => getLessonStatus(lesson, subjectLessons) === "current") ??
    subjectLessons.find((lesson) => getLessonStatus(lesson, subjectLessons) === "available") ??
    null;
  const percent =
    subjectLessons.length === 0
      ? 0
      : Math.round((completedLessons / subjectLessons.length) * 100);

  return {
    subject,
    completedLessons,
    totalLessons: subjectLessons.length,
    percent,
    currentLesson,
  };
}

export function getAllSubjectProgress(): SubjectProgressSummary[] {
  return subjects
    .map((subject) => getSubjectProgress(subject.slug))
    .filter((entry): entry is SubjectProgressSummary => Boolean(entry));
}

export function getOverallPercent(): number {
  const summaries = getAllSubjectProgress();
  if (summaries.length === 0) {
    return 0;
  }

  const completed = summaries.reduce((sum, item) => sum + item.completedLessons, 0);
  const total = summaries.reduce((sum, item) => sum + item.totalLessons, 0);
  return total === 0 ? 0 : Math.round((completed / total) * 100);
}

export function getContinueLearning(): ContinueLearningTarget | null {
  const current =
    lessons.find((lesson) => progressByLessonId.get(lesson.id)?.status === "current") ??
    lessons.find((lesson) => {
      const ordered = getLessonsBySubject(lesson.subjectSlug);
      return getLessonStatus(lesson, ordered) === "available";
    });

  if (!current) {
    return null;
  }

  const subject = getSubject(current.subjectSlug);
  const pathModule = getModule(current.moduleId);
  if (!subject || !pathModule) {
    return null;
  }

  return { lesson: current, subject, module: pathModule };
}

export function getAdjacentLessons(lessonId: string): {
  previous: Lesson | null;
  next: Lesson | null;
} {
  const lesson = getLesson(lessonId);
  if (!lesson) {
    return { previous: null, next: null };
  }

  const ordered = getLessonsBySubject(lesson.subjectSlug);
  const index = ordered.findIndex((item) => item.id === lessonId);
  return {
    previous: ordered[index - 1] ?? null,
    next: ordered[index + 1] ?? null,
  };
}

export function getRecentCompletions() {
  return lessonProgress
    .filter((entry) => entry.status === "completed" && entry.completedAt)
    .sort((a, b) => (b.completedAt ?? "").localeCompare(a.completedAt ?? ""))
    .map((entry) => {
      const lesson = getLesson(entry.lessonId);
      const subject = lesson ? getSubject(lesson.subjectSlug) : undefined;
      return { ...entry, lesson, subject };
    })
    .filter(
      (
        entry,
      ): entry is typeof entry & { lesson: Lesson; subject: Subject } =>
        Boolean(entry.lesson && entry.subject),
    );
}

export const lessonKindLabel: Record<Lesson["kind"], string> = {
  intro: "Einführung",
  practice: "Übung",
  checkpoint: "Checkpoint",
};
