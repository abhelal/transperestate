import { Inter } from "next/font/google";
import "./globals.css";

const font = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Transparestate",
  description: "Manage with Tranperency",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className + "text-sm text-gray-600"}>{children}</body>
    </html>
  );
}
