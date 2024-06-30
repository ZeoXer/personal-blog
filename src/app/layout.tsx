"use client";

import "./globals.css";
import Header from "@/components/common/header";
import { useDarkMode } from "@/hooks/use-dark-mode";
import clsx from "clsx";
import { AuthProvider } from "../hooks/use-auth";
import FullScreenLoader from "@/components/common/fullscreen-loader";
import BackToTop from "@/components/common/back-to-top";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDarkMode } = useDarkMode();

  return (
    <AuthProvider>
      <html
        className={clsx(
          "transition",
          isDarkMode ? "bg-gray-900 text-white" : "bg-white"
        )}
      >
        <body style={{ fontFamily: "openhuninn" }}>
          <Header />
          {children}
          <FullScreenLoader />
          <BackToTop />
        </body>
      </html>
    </AuthProvider>
  );
}
