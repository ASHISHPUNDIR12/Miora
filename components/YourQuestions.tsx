"use client";
import { deleteQuestion } from "@/app/action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

type Question = {
  id: string;
  question: string;
};
const YourQuestions = ({
  askedQuestionData,
}: {
  askedQuestionData: Question[];
}) => {
  const [showalert, setShowalert] = useState(false);
  const [questionIdToDelete, setQuestionToDelete] = useState<string | null>(
    null,
  );
  const router = useRouter();

  function handleDeleteQuestion() {
    if (!questionIdToDelete) {
      alert("no question is selected");
      return;
    } 
    deleteQuestion(questionIdToDelete);
    setShowalert(false);
    setQuestionToDelete(null);
  }

  return (
    // asked questions
    <div className="mx-auto max-w-4xl px-2">
      <h1 className="mt-8 mb-6 text-center text-2xl font-bold text-neutral-800">
        Your Asked Questions
      </h1>
      <div className="mt-6 flex flex-col gap-4">
        {askedQuestionData.map(({ question, id }) => (
          <div
            key={id}
            className="group flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-amber-300 hover:shadow-md"
          >
            <p
              onClick={() => router.push(`/ask/${id}`)}
              className="flex-1 cursor-pointer text-base font-medium tracking-tight text-neutral-700 transition-colors group-hover:text-amber-900"
            >
              {question}
            </p>

            <MdDelete
              onClick={() => {
                setQuestionToDelete(id);
                setShowalert(true);
              }}
              className="size-6 cursor-pointer text-red-600 transition-all hover:scale-110 hover:text-red-700"
            />
          </div>
        ))}
        {showalert && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={() => {
              setShowalert(false);
              setQuestionToDelete(null);
            }}
          >
            <div
              className="mx-4 w-full max-w-md rounded-lg border border-neutral-300 bg-white p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="mb-2 text-lg font-bold">Confirmation</p>
              <p className="mb-6">
                Are you sure you want to delete this question?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowalert(false);
                    setQuestionToDelete(null);
                  }}
                  className="rounded-md border px-4 py-2 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteQuestion()}
                  className="rounded-md bg-red-800 px-4 py-2 text-white hover:bg-red-800/80"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default YourQuestions;
