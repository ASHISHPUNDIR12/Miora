import AnswerVote from "@/components/AnswerVote";
import PostAnswer from "@/components/PostAnswer";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await auth();
  const userId = session?.user?.id;

  const thatQuestion = await prisma.question.findUnique({
    where: {
      id: id,
    },
  });

  const answers = await prisma.answer.findMany({
    where: {
      questionId: id,
    },
    orderBy: {
      votesCount: "desc",
    },
  });

  const userVotes = userId
    ? await prisma.vote.findMany({
        where: {
          userId: userId,
          answerId: {
            in: answers.map((a) => a.id),
          },
        },
        select: {
          answerId: true,
        },
      })
    : [];

  const votedAnswerIds = new Set(userVotes.map((v) => v.answerId));

  return (
    <div className="min-h-screen pb-20">
      <div className="mx-auto max-w-3xl px-6 pt-12">
        {/* question  */}
        <h1 className="text-3xl leading-tight font-bold tracking-tight text-neutral-900">
          {thatQuestion?.question}
        </h1>
        <div className="mt-8 mb-8 h-px w-full bg-neutral-400"></div>

        <PostAnswer id={id} />

        <div className="mt-16">
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold text-amber-950">
              Answers
              <span className="ml-3 text-lg font-normal text-neutral-500">
                ({answers.length} {answers.length === 1 ? "answer" : "answers"})
              </span>
            </h2>
            <div className="h-1 w-20 rounded-full bg-amber-900"></div>
          </div>

          {answers.length > 0 ? (
            <div className="space-y-6">
              {answers.map((answer, index) => (
                <div
                  key={answer.id}
                  className="group relative rounded-2xl border border-neutral-300 bg-white/60 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:translate-y-[-2px] hover:border-amber-900/30 hover:shadow-md"
                >
                  <div className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-amber-900 text-sm font-bold text-white shadow-md">
                    {index + 1}
                  </div>

                  <div className="flex items-center justify-between gap-4 pl-4">
                    <p className="flex-1 text-base leading-relaxed text-neutral-800">
                      {answer.content}
                    </p>

                    <AnswerVote
                      answerId={answer.id}
                      initialVotes={answer.votesCount}
                      initialHasVoted={votedAnswerIds.has(answer.id)}
                    />
                  </div>

                  <div className="mt-4 h-0.5 w-0 rounded-full bg-linear-to-r from-amber-900 to-amber-700 transition-all duration-300 group-hover:w-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-100/50 py-12 text-center">
              <p className="text-lg text-neutral-500">
                No answers yet. Be the first to answer!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;  
