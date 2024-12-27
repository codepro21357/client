"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import Container from "../container/Container";
import Button from "../button/Button";
import Logo from "../logo/Logo";
import { useAppSelector } from "@/hooks/redux";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const user = useAppSelector((state) => state.user?.user);
  const pathname = usePathname();

  const links = [
    {
      id: 1,
      title: "Home",
      path: "/",
    },
    {
      id: 2,
      title: "About",
      path: "/about",
    },
    {
      id: 3,
      title: "Accounts",
      path: "/accounts",
    },
    {
      id: 4,
      title: "Contact Us",
      path: "/contact",
    },
    {
      id: 5,
      title: "Sign In",
      path: "/login",
    },
    {
      id: 6,
      title: "Sign Up",
      path: "/register",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (pathname.includes("/dashboard") || pathname === "/international") return;

  return (
  <header className="w-full fixed text-white bg-soft-black z-50">
    <div className="p-1 text-[8px] text-center text-red-500 bg-white">
      <Container>
        <p>Disclamer: The site owner is responsible for all actions carried out on the website, not the Developers.</p>
      </Container>
    </div>
      <Container>
        <div className="py-5 flex justify-between items-center">
          <Logo />
          <div
            className="md:hidden z-[1] text-white cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            {open ? <CgClose size={25} /> : <HiOutlineMenuAlt3 size={25} />}
          </div>
          <nav
            className={`w-[60%] md:w-auto h-screen md:h-auto absolute md:static top-0 bg-[#2d3553]
            md:bg-transparent transition-all md:transition-none duration-500 
            ${open ? "right-0" : "right-[-100%]"}`}
          >
            <div>
              <ul className="flex flex-col md:flex-row md:items-center gap-10 mt-20 md:mt-0 px-5 md:px-0">
                {links.map((link) => (
                  <li
                    key={link.id}
                    className={`
                    ${
                      link.path === "/login" && mounted && user ? "hidden" : ""
                    } 
                    ${
                      link.path === "/login" && mounted && !user
                        ? "lg:hidden"
                        : ""
                    } 
                    ${
                      link.path === "/register" && mounted && user
                        ? "hidden"
                        : ""
                    } 
                    ${
                      link.path === "/register" && mounted && !user
                        ? "md:hidden"
                        : ""
                    } 
                    `}
                    onClick={() => setOpen(false)}
                  >
                    <Link
                      href={link.path}
                      className={`
                      ${pathname === link.path ? "text-primary-400" : ""} 
                      font-[500] cursor-pointer relative before:content-[''] before:w-full 
                      before:h-[2px] before:absolute before:bottom-[-5px] before:left-0 before:scale-0
                      before:transition-all before:duration-300 before:origin-left before:bg-white 
                      hover:before:scale-[70%]`}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
                <li
                  className={`${mounted && user ? "md:hidden" : "hidden"}`}
                  onClick={() => setOpen(false)}
                >
                  <Link href="/dashboard" className="font-[500] cursor-pointer">
                    <Button type="gradient" size="big">
                      Dashboard
                    </Button>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <div className="hidden lg:flex items-center gap-10">
            {mounted && !user && (
              <Link
                href="/login"
                className={`
                ${pathname === "/login" ? "text-primary-400" : ""} 
                font-[500] cursor-pointer relative before:content-[''] before:w-full 
                before:h-[2px] before:absolute before:bottom-[-5px] before:left-0 before:scale-0
                before:transition-all before:duration-300 before:origin-left before:bg-white 
                hover:before:scale-[70%]`}
              >
                Sign In
              </Link>
            )}
            {mounted && !user && (
              <Link href="/register" className="font-[500] cursor-pointer">
                <Button type="gradient" size="big">
                  Get Started
                </Button>
              </Link>
            )}
            {mounted && user && (
              <Link href="/dashboard" className="font-[500] cursor-pointer">
                <Button type="gradient" size="big">
                  Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
