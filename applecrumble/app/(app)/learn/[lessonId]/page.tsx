import { Suspense } from "react";
import { getAllLessons, getLesson } from "@/lib/catalog";
import { LessonContent as LessonContentComponent } from "@/components/learning/lesson-content";
import { LoadingMessage } from "@/components/i18n/loading-message";

export async function generateStaticParams() {
  return getAllLessons().map((lesson) => ({ lessonId: lesson.id }));
}

export async function generateMetadata({ params }: PageProps<"/learn/[lessonId]">) {
  const { lessonId } = await params;
  const lesson = getLesson(lessonId);
  return {
    title: lesson ? lesson.title : "Lernen",
  };
}

export default function LearnPage({ params }: PageProps<"/learn/[lessonId]">) {
  return (
    <Suspense
      fallback={
        <LoadingMessage messageKey="common.loadingLesson" />
      }
    >
      <LearnContent params={params} />
    </Suspense>
  );
}

function LearnContent({ params }: { params: PageProps<"/learn/[lessonId]">["params"] }) {
  return <LessonContentComponent params={params} />;
}
