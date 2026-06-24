"use client";
import { writeBlog } from "@/app/action";
import React, { useActionState, useEffect, useState } from "react";

const page = () => {
  const [showmsg, setShowmsg] = useState(false);
  const [state, formAction, pending] = useActionState(writeBlog, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.message) {
      setShowmsg(true);
    }
    const timer = setTimeout(() => {
      setShowmsg(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [state]);

  return (
    <div className="mt-20 text-center">
      <h1 className="text-2xl font-bold">Write a Blog</h1>
      <p className="mt-3 text-neutral-500">
        Share your knowledge and insights with the community.
      </p>
      <div className="mx-auto mt-2 h-px w-110 bg-neutral-400"></div>

      <p
        className={`mt-3 transition-all duration-300 ease-out ${showmsg ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"} ${state.success ? "text-green-500" : "text-red-500"}`}
      >
        {state.message}
      </p>

      <form action={formAction} className="mx-auto mt-5 max-w-2xl">
        <div className="space-y-4">
          <div>
            <input
              required
              className="w-full rounded-lg border border-neutral-300 bg-neutral-100 px-4 py-3 transition-all placeholder:text-neutral-400 focus:border-amber-500 focus:outline-none"
              type="text"
              placeholder="Blog Title"
              name="title"
              id="title"
            />
            <textarea
              required
              name="blog"
              placeholder="Write useful blogs to provide real value..."
              rows={8}
              className="mt-4 w-full resize-none rounded-lg border border-neutral-300 bg-neutral-100 px-4 pt-4 transition-all placeholder:text-neutral-400 focus:border-amber-500 focus:outline-none"
            />
            <p className="mt-2 text-sm text-neutral-500">
              Write meaningful content that helps others learn
            </p>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              disabled={pending}
              type="submit"
              className="flex-1 rounded-lg bg-amber-900 px-6 py-3 font-medium text-white transition-all duration-200 hover:translate-y-[-4px] hover:bg-amber-800 active:scale-95 disabled:opacity-50"
            >
              {pending ? "Publishing..." : "Publish Blog"}
            </button>
          </div>
        </div>
      </form>
      <div className="mt-10 h-px w-full bg-neutral-400"></div>
    </div>
  );
};

export default page;
