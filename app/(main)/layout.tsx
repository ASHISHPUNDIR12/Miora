import Navbar from "@/components/Navbar";
import React from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative mx-auto max-w-270">
      <Navbar />
      <div className="absolute left-0 h-screen w-px bg-linear-to-b from-neutral-300/50 via-neutral-300 to-transparent"></div>
      <div className="absolute right-0 h-screen w-px bg-linear-to-b from-neutral-300/50 via-neutral-300 to-transparent"></div>
      {children}
    </div>
  );
}
