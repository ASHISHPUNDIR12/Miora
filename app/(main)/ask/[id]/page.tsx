
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
      <div>

        <p className='text-center mt-5'>Answers</p>
        {
          answers.map((answer) => (
            <p key={answer.id} className=''>{answer.content}</p>

          ))
        }
      </div>
    </div>

  )
}

export default Page
