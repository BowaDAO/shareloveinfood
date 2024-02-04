"use client";

import "@/app/globals.css";
import { Navbar } from "@/components";

export default function RecipientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />

      {children}
    </>
  );
}
