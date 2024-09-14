"use client";

import { Button, Navbar } from "flowbite-react";
import Logo from "@/components/Logo";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/libs/hooks";
import { logout } from "@/libs/features/user/userSlice";
import clientApi from "@/libs/clientApi";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const logoutFromPortal = async () => {
    try {
      const res = await clientApi.post("/auth/logout");
      if (res.data.success) {
        router.push("/");
        router.refresh();
        dispatch(logout());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const headerMenu = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Pricing", path: "/pricing" },
    { title: "Contact", path: "/contact" },
  ];

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <Logo className="relative w-12 h-12 text-primary-600 mr-4" />
        <span className="hidden lg:block ml-4 self-center whitespace-nowrap text-xl font-semibold dark:text-white">Transparestate</span>
      </Navbar.Brand>
      <div className="flex md:order-2 space-x-3">
        {user ? (
          <>
            {user.role === "CLIENT" && user.status === "NEW" ? (
              <div className="flex gap-3">
                <Button onClick={() => router.push("/subscription")}>Dashboard</Button>
                <Button outline onClick={logoutFromPortal}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={() => router.push("/dashboard")}>Dashboard</Button>
            )}
          </>
        ) : (
          <>
            <Button onClick={() => router.push("/register")}>Register</Button>
            <Button outline onClick={() => router.push("/login")}>
              Login
            </Button>
          </>
        )}
      </div>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {headerMenu.map((item, index) => (
          <Navbar.Link key={index} href={item.path} active={pathname === item.path}>
            <span className="font-semibold text-md hover:text-primary-500">{item.title}</span>
          </Navbar.Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}
