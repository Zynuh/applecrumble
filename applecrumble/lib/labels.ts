import type { SubjectIcon } from "@/lib/domain";
import { Atom, BookOpenText, Calculator, Globe2, type LucideIcon } from "lucide-react";

export const subjectIcons: Record<SubjectIcon, LucideIcon> = {
  calculator: Calculator,
  book: BookOpenText,
  globe: Globe2,
  atom: Atom,
};
