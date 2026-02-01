"use client"
import { postComment } from '@/app/action'
import React, { useActionState, useEffect, useState } from 'react'

const PostComment = ({ blogId }: { blogId: string }) => {
  const [showmsg, setShowmsg] = useState(false);

  const [state, formAction, ispending] = useActionState(postComment, {
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
    <div className="py-4">
      <h3 className="mb-4 text-xl font-bold text-neutral-800">Leave a Comment</h3>

      <p
        className={`mb-3 font-medium transition-all duration-300 ease-out ${showmsg ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"} ${state.success ? "text-green-600" : "text-red-600"} `}
      >
        {state.message || state.error}
      </p>

      <form action={formAction} className="space-y-4">
        <div>
          <input type="hidden" name="blogId" value={blogId} />
          <textarea
            required
            name="comment"
            placeholder="Share your thoughts..."
            rows={4}
            className="w-full resize-none rounded-xl border-2 border-neutral-300 bg-white px-5 py-4 text-neutral-800 shadow-sm transition-all placeholder:text-neutral-400 focus:border-amber-500 focus:shadow-md focus:outline-none"
          />
        </div>
        <div className="flex gap-3">
          <button
            disabled={ispending}
            type="submit"
            className="rounded-xl bg-amber-800 px-6 py-2.5 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-amber-900 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {ispending ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PostComment
