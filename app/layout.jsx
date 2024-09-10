import "./globals.css";
import "quill/dist/quill.snow.css";
import { Inter } from "next/font/google";
import { ToastProvider, ToastContainer } from "@/context/ToastContext";
import StoreProvider from "./StoreProvider";
import serverApi from "@/libs/serverApi";
import SocketProvider from "./SocketProvider";
const font = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Transparestate",
  description: "Manage with Tranperency",
};

export default async function RootLayout({ children }) {
  const res = await serverApi.get("/auth/me").catch((error) => {
    return { data: { user: null } };
  });
  const user = res.data.user;

  return (
    <html lang="en">
      <body className={font.className + "text-sm text-gray-600"}>
        <StoreProvider user={user}>
          <ToastProvider>
            {children}
            <ToastContainer />
            <SocketProvider />
          </ToastProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
