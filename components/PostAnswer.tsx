"use client";
import { postAnswer } from "@/app/action";
import React, { useActionState, useEffect, useState } from "react";

const PostAnswer = ({ id }: { id: string }) => {
  const [showmsg, setShowmsg] = useState(false);

  const [state, formAction, ispending] = useActionState(postAnswer, {
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
    <div className="py-2">
      <h3 className="mb-4 text-xl font-bold text-neutral-800">Your Answer</h3>

      <p
        className={`mb-3 font-medium transition-all duration-300 ease-out ${showmsg ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"} ${state.success ? "text-green-600" : "text-red-600"} `}
      >
        {state.message}
      </p>

      <form action={formAction} className="space-y-4">
        <div>
          <input type="hidden" name="questionId" value={id} />
          <textarea
            required
            name="answer"
            placeholder="Share your knowledge and help others learn..."
            rows={6}
            className="w-full resize-none rounded-xl border-2 border-neutral-300 bg-white px-5 py-4 text-neutral-800 shadow-sm transition-all placeholder:text-neutral-400 focus:border-amber-500 focus:shadow-md focus:outline-none"
          />
          <p className="mt-2 text-left text-sm text-neutral-500">
            💡 Provide detailed and helpful answers
          </p>
        </div>
        <div className="flex gap-3">
          <button
            disabled={ispending}
            type="submit"
            className="flex-1 rounded-xl bg-linear-to-r from-amber-700 to-amber-900 px-8 py-3.5 font-semibold text-white shadow-lg transition-all duration-200 hover:from-amber-600 hover:to-amber-800 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {ispending ? "Posting..." : "Post Your Answer"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostAnswer;
