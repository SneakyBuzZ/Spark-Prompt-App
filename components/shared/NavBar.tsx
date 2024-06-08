"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MuseoModerno } from "next/font/google";
import Link from "next/link";
import { Menu } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LoginButton } from "../auth/LoginButton";
import RegisterButton from "../auth/RegisterButton";

import UserAvatar from "@/components/shared/UserAvatar";

const museoModerno = MuseoModerno({
  subsets: ["latin"],
});

const NavBar = () => {
  const isUserLoggedIn = true;
  return (
    <>
      <header className="spark-navbar">
        <Link href="/about" className="spark-flex-row gap-1">
          <Image
            src={"/assets/images/spark.png"}
            className="spark-logo w-12 sm:w-16"
            alt="logo"
            width={60}
            height={0}
          />

          <span
            className={`${museoModerno.className} font-semibold text-2xl sm:text-3xl -mx-2 drop-shadow-lg`}
          >
            Spark
          </span>
        </Link>
        <div className="spark-flex-row gap-3">
          {isUserLoggedIn ? (
            <>
              <Button
                variant="default"
                className="shadow-lg shadow-neutral-200 hidden md:flex"
              >
                Logout
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Menu color="#000000" className="sm:flex md:hidden" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border-none mx-5 bg-neutral-100">
                  <DropdownMenuLabel>Menu</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LoginButton>Create Post</LoginButton>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <RegisterButton>Logout</RegisterButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <UserAvatar />
            </>
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Menu color="#000000" className="sm:flex md:hidden" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border-none mx-5 bg-neutral-100">
                  <DropdownMenuLabel>Menu</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LoginButton>Login</LoginButton>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <RegisterButton>Register</RegisterButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <LoginButton>
                <Button
                  variant="outline"
                  className="shadow-lg shadow-neutral-200 hidden md:flex"
                >
                  Login
                </Button>
              </LoginButton>
              <RegisterButton>
                <Button
                  className="shadow-lg shadow-neutral-200 hidden md:flex"
                  variant={"default"}
                >
                  Register
                </Button>
              </RegisterButton>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default NavBar;
