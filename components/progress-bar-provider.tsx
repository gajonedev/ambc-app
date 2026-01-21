"use client";

import { AppProgressBar } from "next-nprogress-bar";
import "@/styles/progress.css";

export function ProgressBarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <AppProgressBar options={{ showSpinner: false }} shallowRouting />
    </>
  );
}
