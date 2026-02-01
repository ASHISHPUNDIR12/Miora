"use client"
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
          className="bg-linear-to-br from-amber-700 to-amber-950 bg-clip-text text-transparent hover:from-amber-600 hover:to-amber-900 transition-all duration-300"
        >
          Miora
        </Link>
      </h1>

      <div className="flex items-center gap-8">
        <ul className="flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name} className="relative group">
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
            className="flex items-center justify-center transition-transform hover:scale-105 active:scale-95 focus:outline-none"
          >
            <Avatar />
          </button>

          {isDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40 cursor-default"
                onClick={() => setIsDropdownOpen(false)}
              />

              <div className="absolute right-0 top-full mt-2 w-48 origin-top-right rounded-xl border border-neutral-100 bg-white p-1 shadow-lg ring-1 ring-black/5 backdrop-blur-xl z-50 transition-all animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-2 border-b border-neutral-100 mb-1">
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Account</p>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
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
