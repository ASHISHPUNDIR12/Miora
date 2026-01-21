import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import React from 'react'

const page = async () => {
  const session = await auth()
  const allQuestions = await prisma.question.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div className="mt-20 text-center">
      <h1 className="text-2xl font-bold">Answer Questions</h1>
      <p className="mt-3 text-neutral-500">
        Share your knowledge by answering questions from the community.
      </p>
      <div className="mx-auto mt-2 h-px w-110 bg-neutral-400"></div>

      <div className="mx-auto mt-10 max-w-3xl space-y-4 px-4">
        {allQuestions.length === 0 ? (
          <p className="text-neutral-500 mt-8">No questions available yet.</p>
        ) : (
          allQuestions.map((question) => (
            <Link
              key={question.id}
              href={`/ask/${question.id}`}
              className="group flex justify-between items-center border border-neutral-300 p-5 rounded-2xl hover:bg-neutral-50 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-neutral-400"
            >
              <span className="font-medium text-left flex-1 text-neutral-800 group-hover:text-amber-900 transition-colors">
                {question.question}
              </span>
              <button className="ml-4 border border-amber-900 bg-amber-900 text-white px-6 py-2 rounded-lg hover:bg-amber-800 transition-all duration-200 flex-shrink-0">
                Answer
              </button>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default page
