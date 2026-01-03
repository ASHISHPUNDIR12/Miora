import { postAnswer } from '@/app/action'
import AskForm from '@/components/AskForm'
import { prisma } from '@/lib/prisma'
import React, { useActionState } from 'react'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const [state,formAction,ispending] = useActionState(postAnswer, {
    success : false,
    message : ""
  })
  const { id } = await params

  const thatQuestion = await prisma.question.findUnique({
    where: {
      id: id
    }
  })

  const answers = await prisma.answer.findMany({
    where: {
      questionId: id
    }
  })

  return (
    <div className=''>
      <div className='mt-10 ml-5 underline border-b pb-5 rounded-sm font-light'>
        {thatQuestion?.question}
      </div>

      <div>
        <form action={formAction} className="mx-auto mt-5 max-w-2xl">
          <div className="space-y-4">
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
                {/* {ispending ? "Posting...." : "Post Your Question"} */}
                post
              </button>
            </div>
          </div>
        </form>
        <p className='text-center mt-5'>Answers</p>
        {
          answers.map((answer) => (
            <p className=''>{answer.content}</p>

          ))
        }
      </div>
    </div>

  )
}

export default Page
