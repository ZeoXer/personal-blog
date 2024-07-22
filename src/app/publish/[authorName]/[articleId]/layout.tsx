"use client";

import Footer from "@/components/common/footer";

export default function FooterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
