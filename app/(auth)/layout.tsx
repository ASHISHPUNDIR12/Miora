import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-login flex h-screen w-full">
      <section className="sm:bg-login relative hidden flex-col items-center justify-center sm:w-[60%] md:flex dark:bg-neutral-200">
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
      <section className="dark:bg-background flex w-full items-center justify-center bg-white sm:rounded-l-4xl lg:w-[40%]">
        {children}
      </section>
    </div>
  );
};

export default layout;
