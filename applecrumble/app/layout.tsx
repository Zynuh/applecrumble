import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import { ThemeProvider } from "@/components/account/theme-provider";
import { LocaleProvider } from "@/components/i18n/locale-provider";
import "./globals.css";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Crumble – Adaptives Lernen bis Klasse 13",
    template: "%s · Crumble",
  },
  description:
    "Crumble ist eine adaptive Lernplattform, die dich von deinem aktuellen Stand bis zum Niveau der 13. Klasse führt.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${ubuntu.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <LocaleProvider>{children}</LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
