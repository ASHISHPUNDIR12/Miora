"use client";
import { AskQuestion } from "@/app/action";
import React, { useActionState, useEffect, useState } from "react";

const AskForm = () => {
  const [showmsg, setShowmsg] = useState(false);
  const [state, formAction, ispending] = useActionState(AskQuestion, {
    success: false,
    message: "",
  });
  // timer ke liye
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
    <div className="pt-12 pb-8 text-center">
      <h1 className="text-3xl font-bold text-neutral-800">Ask a Thoughtful Question</h1>
      <p className="mt-3 text-neutral-600">
        Your question helps others learn so be clear and specific.
      </p>

      <p
        className={`mt-4 transition-all duration-300 ease-out font-medium ${showmsg ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"} ${state.success ? "text-green-600" : "text-red-600"} `}
      >
        {state.message}
      </p>

      <form action={formAction} className="mx-auto mt-8 max-w-3xl">
        <div className="space-y-5">
          <div>
            <textarea
              required
              name="textarea"
              placeholder="Start your question with 'What', 'How', 'Why', etc."
              rows={6}
              className="w-full resize-none rounded-xl border-2 border-neutral-300 bg-white px-5 py-4 text-neutral-800 shadow-sm transition-all placeholder:text-neutral-400 focus:border-amber-500 focus:shadow-md focus:outline-none"
            />
            <p className="mt-2 text-left text-sm text-neutral-500">
              💡 Be specific and detailed to get better answers
            </p>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              disabled={ispending}
              type="submit"
              className="flex-1 rounded-xl bg-linear-to-r from-amber-700 to-amber-900 px-8 py-3.5 font-semibold text-white shadow-lg transition-all duration-200 hover:from-amber-600 hover:to-amber-800 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {ispending ? "Posting..." : "Post Your Question"}
            </button>
          </div>
        </div>
      </form>
      <div className="mx-auto mt-12 h-px max-w-4xl bg-linear-to-r from-transparent via-neutral-300 to-transparent"></div>
    </div>
  );
};

export default AskForm;
