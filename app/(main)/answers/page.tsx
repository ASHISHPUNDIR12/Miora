import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { auth } from '@/auth'
import QuestionVote from '@/components/QuestionVote'

const page = async () => {
  const session = await auth()
  const userId = session?.user?.id

  // get all the questions sorted by vote count
  const allQuestions = await prisma.question.findMany({
    orderBy: {
      votesCount: 'desc'
    },
    include: {
      votes: userId ? {
        where: {
          userId: userId
        }
      } : true,
      _count: {
        select: { answer: true }
      }
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
          allQuestions.map((question) => {
            const userVotes = userId
              ? question.votes.filter((vote: any) => vote.userId === userId)
              : [];

            return (
              <div
                key={question.id}
                className="group border border-neutral-300 p-5 rounded-2xl hover:bg-neutral-50 transition-all duration-200 hover:shadow-md hover:border-amber-500"
              >
                <div className="flex justify-between items-start gap-4">
                  <Link
                    href={`/ask/${question.id}`}
                    className="flex-1 text-left"
                  >
                    <span className="font-medium text-neutral-800 group-hover:text-amber-900 transition-colors">
                      {question.question}
                    </span>
                    <div className="mt-2 text-sm text-neutral-500">
                      {question._count.answer} {question._count.answer === 1 ? 'answer' : 'answers'}
                    </div>
                  </Link>
                  <div className="flex items-center gap-3 shrink-0">
                    <QuestionVote
                      questionId={question.id}
                      initialVotes={question.votesCount}
                      initialHasVoted={userVotes.length > 0}
                    />
                    <Link href={`/ask/${question.id}`}>
                      <button className="border border-amber-900 bg-amber-900 text-white px-6 py-2 rounded-lg hover:bg-amber-800 transition-all duration-200">
                        Answer
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  )
}

export default page
