"use client";
import Avatar from "./Avatar";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useState } from "react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navLinks = [
    { name: "Ask", href: "/ask" },
    { name: "Write", href: "/write" },
    { name: "Answer", href: "/answers" },
    { name: "Blogs", href: "/blogs" },
  ];

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-neutral-200/50 bg-[#e6e0d3]/50 p-4 shadow-sm backdrop-blur-md transition-all">
      <h1 className="font-serif text-2xl font-bold tracking-tight">
        <Link
          href={"/"}
          className="bg-linear-to-br from-amber-700 to-amber-950 bg-clip-text text-transparent transition-all duration-300 hover:from-amber-600 hover:to-amber-900"
        >
          Miora
        </Link>
      </h1>

      <div className="flex items-center gap-8">
        <ul className="flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name} className="group relative">
              <Link
                href={link.href}
                className="text-sm font-medium text-neutral-600 transition-colors duration-200 hover:text-amber-900"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-amber-800 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-center transition-transform hover:scale-105 focus:outline-none active:scale-95"
          >
            <Avatar />
          </button>

          {isDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40 cursor-default"
                onClick={() => setIsDropdownOpen(false)}
              />

              <div className="animate-in fade-in slide-in-from-top-2 absolute top-full right-0 z-50 mt-2 w-48 origin-top-right rounded-xl border border-neutral-100 bg-white p-1 shadow-lg ring-1 ring-black/5 backdrop-blur-xl transition-all duration-200">
                <div className="mb-1 border-b border-neutral-100 px-3 py-2">
                  <p className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                    Account
                  </p>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
