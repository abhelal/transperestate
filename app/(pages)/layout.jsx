import React from "react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function PagesLayout({ children }) {
  return (
    <div className="flex flex-col h-full min-h-screen">
      <Header />
      <div className="flex flex-col grow">{children}</div>
      <Footer />
    </div>
  );
}
