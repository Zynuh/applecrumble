import type { Metadata } from "next";
import ProgressContent from "@/components/pages/progress-content";

export const metadata: Metadata = {
  title: "Fortschritt",
};

export default function ProgressPage() {
  return <ProgressContent />;
}
