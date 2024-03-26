import "./globals.css";
import { Inter } from "next/font/google";
import { ToastProvider, ToastContainer } from "@/context/ToastContext";
import StoreProvider from "./StoreProvider";
import AuthProvider from "./AuthProvider";
import AppLayout from "@/components/layout/AppLayout";
const font = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Transparestate",
  description: "Manage with Tranperency",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className + "text-sm text-gray-600"}>
        <StoreProvider>
          <ToastProvider>
            <AuthProvider>
              <AppLayout>{children}</AppLayout>
            </AuthProvider>
            <ToastContainer />
          </ToastProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
