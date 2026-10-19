export type GradeLevel = 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export type LessonKind = "intro" | "practice" | "checkpoint";

export type LessonStatus = "completed" | "current" | "available" | "locked";

export type SubjectIcon = "calculator" | "book" | "globe" | "atom";

export type Subject = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: SubjectIcon;
  currentGradeFocus: GradeLevel;
  targetGrade: GradeLevel;
};

export type Module = {
  id: string;
  subjectSlug: string;
  title: string;
  gradeBand: string;
  summary: string;
  lessonIds: string[];
};

export type LessonContent = {
  heading: string;
  paragraphs: string[];
  example?: {
    prompt: string;
    hint: string;
  };
};

export type Lesson = {
  id: string;
  subjectSlug: string;
  moduleId: string;
  title: string;
  kind: LessonKind;
  durationMinutes: number;
  summary: string;
  content: LessonContent;
};

export type Learner = {
  id: string;
  displayName: string;
  currentGradeEstimate: number;
  targetGrade: GradeLevel;
  streakDays: number;
  weeklyGoalMinutes: number;
  weeklyMinutesDone: number;
};

export type LessonProgress = {
  lessonId: string;
  status: "completed" | "current";
  scorePercent?: number;
  completedAt?: string;
};

export type ContinueLearningTarget = {
  lesson: Lesson;
  subject: Subject;
  module: Module;
};

export type SubjectProgressSummary = {
  subject: Subject;
  completedLessons: number;
  totalLessons: number;
  percent: number;
  currentLesson: Lesson | null;
};

export type WeeklyActivity = {
  day: string;
  minutes: number;
};
