import "./globals.css";
import { Inter } from "next/font/google";
import { ToastProvider, ToastContainer } from "@/context/ToastContext";
import StoreProvider from "./StoreProvider";
import serverApi from "@/libs/serverApi";
const font = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Transparestate",
  description: "Manage with Tranperency",
};

export default async function RootLayout({ children }) {
  const res = await serverApi.get("/auth/me").catch(() => ({}));
  const user = res?.data?.user || null;

  return (
    <html lang="en">
      <body className={font.className + "text-sm text-gray-600"}>
        <StoreProvider user={user}>
          <ToastProvider>
            {children}
            <ToastContainer />
          </ToastProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
