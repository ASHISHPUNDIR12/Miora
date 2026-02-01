import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="mt-10 flex flex-col items-center gap-5">
      <button className="mt-10 cursor-default rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-sm font-medium text-amber-900 shadow-sm transition-colors duration-100 hover:bg-amber-100">
        Backed By Users
      </button>
      <h1 className="my-2 bg-linear-to-b from-neutral-500 via-neutral-600 to-neutral-900 bg-clip-text text-6xl font-bold text-transparent">
        Gpt Sucks Ask real Human
      </h1>
      <p className="max-w-2xl text-center text-lg leading-relaxed text-neutral-600">
        Tired of boring AI answers?{" "}
        <span className="font-serif font-bold text-amber-900">
          Miora
        </span>{" "}
        is inspired by <span className="font-bold text-[#b92b27]">Quora</span> and{" "}
        <span className="font-serif font-bold text-neutral-900">Medium</span>, where
        people ask questions, write answers, and share stories.
      </p>
      <div>
        <button className="cursor-pointer rounded-xl border bg-yellow-950 px-4 py-2 font-bold text-neutral-200 transition-all duration-200 hover:-translate-y-[-4px] hover:bg-yellow-950/80 focus:outline-none active:scale-90">
          <Link href={"/ask"}>Get started</Link>
        </button>
      </div>
      <div className="mt-3 h-px w-full border-b border-neutral-400"></div>
      <div className="overflow-hidden rounded-2xl">
        <Image
          className="rounded-2xl border-neutral-100 mask-[linear-gradient(to_bottom,white,transparent)] object-cover shadow-md"
          src="/medium.png"
          width={1000}
          height={1000}
          alt="dummy image"
          priority
        />
      </div>
    </div>
  );
};

export default Hero;
