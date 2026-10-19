import type { Metadata } from "next";
import SubjectsContent from "@/components/pages/subjects-content";

export const metadata: Metadata = {
  title: "Fächer",
};

export default function SubjectsPage() {
  return <SubjectsContent />;
}
