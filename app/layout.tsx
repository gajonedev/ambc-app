import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";
import { ProgressBarProvider } from "@/components/progress-bar-provider";

const inter = Be_Vietnam_Pro({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Formation - Ambition Concept",
  description:
    "Apprenez à concevoir les plans de construction et architecturaux pour vos clients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased font-inter`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ProgressBarProvider>
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </ProgressBarProvider>
          <div className="right-4 bottom-4 z-1000 fixed">
            <ModeToggle />
          </div>
          <Toaster
            richColors
            style={{
              fontFamily: "var(--font-inter)",
            }}
            position="top-center"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
