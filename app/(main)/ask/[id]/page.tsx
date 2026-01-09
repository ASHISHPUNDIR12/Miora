
import PostAnswer from '@/components/PostAnswer'
import { prisma } from '@/lib/prisma'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {

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
      <PostAnswer id={id} />
      <div className='mt-10 max-w-4xl mx-auto px-4'>
        {/* Answers Header */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-amber-950 mb-2'>
            Answers
            <span className='ml-3 text-lg font-normal text-neutral-500'>
              ({answers.length} {answers.length === 1 ? 'answer' : 'answers'})
            </span>
          </h2>
          <div className='h-1 w-20 bg-amber-900 rounded-full'></div>
        </div>

        {/* Answers List */}
        {answers.length > 0 ? (
          <div className='space-y-6'>
            {answers.map((answer, index) => (
              <div
                key={answer.id}
                className='group relative bg-white/60 backdrop-blur-sm border border-neutral-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] hover:border-amber-900/30'
              >
                <div className='absolute -left-3 -top-3 bg-amber-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-md'>
                  {index + 1}
                </div>

                <p className='text-neutral-800 leading-relaxed text-base pl-4'>
                  {answer.content}
                </p>

                <div className='mt-4 h-0.5 w-0 bg-linear-to-r from-amber-900 to-amber-700 rounded-full transition-all duration-300 group-hover:w-full'></div>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center py-12 bg-neutral-100/50 rounded-2xl border border-dashed border-neutral-300'>
            <p className='text-neutral-500 text-lg'>No answers yet. Be the first to answer!</p>
          </div>
        )}
      </div>
    </div>

  )
}

export default Page
