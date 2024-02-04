"use client";

import "@/app/globals.css";
import { Navbar } from "@/components";
import { useSession } from "next-auth/react";

export default function ProviderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {} = useSession({ required: true });

  return (
    <>
      <Navbar />

      {children}
    </>
  );
}
