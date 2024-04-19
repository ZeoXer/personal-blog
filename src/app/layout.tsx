"use client";

import "./globals.css";
import Header from "@/components/common/header";
import { useDarkMode } from "@/hooks/use-dark-mode";
import clsx from "clsx";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDarkMode } = useDarkMode();

  return (
    <html
      className={clsx(
        "transition",
        isDarkMode ? "bg-gray-900 text-white" : "bg-white"
      )}
    >
      <body style={{ fontFamily: "openhuninn" }}>
        <Header />
        {children}
      </body>
    </html>
  );
}
