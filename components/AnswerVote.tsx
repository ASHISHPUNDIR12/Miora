"use client";
import { toggleAnswerVote } from "@/app/action";
import React, { useOptimistic, startTransition } from "react";

interface AnswerVoteProps {
  answerId: string;
  initialVotes: number;
  initialHasVoted: boolean;
}

const AnswerVote = ({
  answerId,
  initialVotes,
  initialHasVoted,
}: AnswerVoteProps) => {
  const [optimisticState, addOptimisticState] = useOptimistic(
    { votes: initialVotes, hasVoted: initialHasVoted },
    (state, action: { type: "toggle" }) => {
      return {
        votes: state.hasVoted ? state.votes - 1 : state.votes + 1,
        hasVoted: !state.hasVoted,
      };
    },
  );

  const handleVote = async () => {
    startTransition(() => {
      addOptimisticState({ type: "toggle" });
    });

    const result = await toggleAnswerVote(answerId);
    if (!result.success) {
      console.error(result.error);
    }
  };

  return (
    <button
      onClick={handleVote}
      className={`flex shrink-0 items-center gap-1.5 text-sm font-medium transition-colors ${
        optimisticState.hasVoted
          ? "rounded-md bg-amber-50 px-2 py-1 text-amber-600"
          : "rounded-md px-2 py-1 text-neutral-500 hover:bg-neutral-50 hover:text-amber-600"
      }`}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`h-5 w-5 ${optimisticState.hasVoted ? "text-amber-600" : "text-neutral-400"}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.781 2.375a.999.999 0 0 0-1.562 0l-9 11A1.002 1.002 0 0 0 3 15h6v7a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-7h6a1.002 1.002 0 0 0 .781-1.625l-9-11z" />
      </svg>
      <span>
        {optimisticState.votes > 0 ? optimisticState.votes : "upvote"}
      </span>
    </button>
  );
};

export default AnswerVote;
