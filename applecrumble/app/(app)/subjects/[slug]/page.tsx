import { Suspense } from "react";
import { getSubject, getSubjects } from "@/lib/catalog";
import { SubjectPathContent as SubjectPathContentComponent } from "@/components/learning/subject-path-content";
import { LoadingMessage } from "@/components/i18n/loading-message";

export async function generateStaticParams() {
  return getSubjects().map((subject) => ({ slug: subject.slug }));
}

export async function generateMetadata({ params }: PageProps<"/subjects/[slug]">) {
  const { slug } = await params;
  const subject = getSubject(slug);
  return {
    title: subject ? subject.name : "Fach",
  };
}

export default function SubjectPathPage({ params }: PageProps<"/subjects/[slug]">) {
  return (
    <Suspense
      fallback={
        <LoadingMessage messageKey="common.loadingPath" />
      }
    >
      <SubjectPathContent params={params} />
    </Suspense>
  );
}

function SubjectPathContent({ params }: { params: PageProps<"/subjects/[slug]">["params"] }) {
  return <SubjectPathContentComponent params={params} />;
}
