"use client";

import { Button, Navbar } from "flowbite-react";
import Logo from "@/components/Logo";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/libs/hooks";

export default function Header() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <Logo className="relative w-12 h-12 text-primary-600 mr-4" />
        <span className="ml-4 self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Transparestate
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 space-x-3">
        {user ? (
          <Button outline onClick={() => router.push("/dashboard")}>
            Dashboard
          </Button>
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
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
