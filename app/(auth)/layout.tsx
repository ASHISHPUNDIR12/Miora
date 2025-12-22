import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-login   flex h-screen w-full">
      <section className=" dark:bg-neutral-200  sm:bg-login relative hidden md:flex sm:w-[60%] flex-col items-center justify-center">
        <div className="absolute left-60 h-screen w-px bg-linear-to-b from-stone-200 via-stone-500 to-stone-200"></div>
        <div className="absolute right-60 h-screen w-px bg-linear-to-b from-stone-200 via-stone-500 to-stone-200"></div>

        <div className="h-px w-full bg-linear-to-r from-stone-200 via-stone-500 to-stone-200"></div>
        <div className="mb-4 p-5">
          <h1 className="font-sourceserif bg-linear-to-b from-yellow-600 to-yellow-950 bg-clip-text text-9xl font-bold text-transparent">
            Miora
          </h1>
          <h1 className="text-3xl font-light">Gpt sucks Ask real Human</h1>
        </div>
        <div className="h-px w-full bg-linear-to-r from-stone-200 via-stone-500 to-stone-200"></div>
      </section>
      <section className="flex w-full  lg:w-[40%] items-center justify-center sm:rounded-l-4xl dark:bg-background bg-white">
        {children}
      </section>
    </div>
  );
};

export default layout;
