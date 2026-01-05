"use client"
import { postAnswer } from '@/app/action'
import React, { useActionState, useEffect, useState } from 'react'

const PostAnswer = ({ id }: { id: string }) => {
  const [showmsg, setShowmsg] = useState(false);

  const [state, formAction, ispending] = useActionState(postAnswer, {
    success: false,
    message: ""
  })

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
    <form action={formAction} className="mx-auto mt-5 max-w-2xl">
      <div className="space-y-4">
        <p
          className={`mt-3 transition-all duration-300 ease-out ${showmsg ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"} ${state.success ? "text-green-500" : "text-red-500"} `}
        >
          {state.message}
        </p>
        <div>
          <input type="hidden" name="questionId" value={id} />
          <textarea
            required
            name="answer"

            placeholder="Please post meaningful answers only"
            rows={6}
            className="w-full resize-none rounded-lg border border-neutral-300 bg-neutral-100 px-4 pt-4 transition-all placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none"
          />
          <p className="mt-2 text-sm text-neutral-500">
            Write better answer               </p>
        </div>
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 rounded-lg bg-amber-900 px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-amber-800 active:scale-95 hover:translate-y-[-4px] disabled:opacity-50"
          >
            {ispending ? "Posting...." : "Post Your    Answer"}

          </button>
        </div>
      </div>
    </form>
  )
}

export default PostAnswer
