import React from "react";
import Avatar from "./Avatar";
import Link from "next/link";
import SignOut from "./SignOut";

const Navbar = () => {
  const navLinks = [
    { name: "Ask", href: "/ask" },
    { name: "Write", href: "/write" },
    { name: "Answer", href: "/answers" },
    { name: "Blogs", href: "/blogs" },
  ];
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-[#e6e0d3]/5 p-4 shadow-[0_4px_6px_-4px_rgba(0,0,0,0.15)] backdrop-blur-sm">
      <h1 className="font-sourceserif bg-linear-to-b from-yellow-600 to-yellow-950 bg-clip-text text-2xl font-bold text-transparent">
        <Link href={"/"}>Miora</Link>
      </h1>
      <ul className="flex cursor-pointer items-center gap-10">
        {navLinks.map((link) => (
          <li key={link.name} className="navlink">
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
        <Avatar />
        <SignOut/>
      </ul>
    </nav>
  );
};

export default Navbar;
