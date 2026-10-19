import { Suspense } from "react";
import { AppHeader } from "@/components/layout/app-header";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-theme-surface flex min-h-full flex-col">
      <Suspense fallback={<div className="h-[73px] border-b border-border/70" />}>
        <AppHeader />
      </Suspense>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-10">
        {children}
      </main>
    </div>
  );
}
