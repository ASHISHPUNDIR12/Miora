"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
type Question = {
  id: string
  question: string

}
const YourQuestions = ({ askedQuestionData }: {
  askedQuestionData: Question[]
}) => {
  const router = useRouter()
  return (
    <div>
      <h1 className='text-center mt-4'>your asked questions</h1>
      <div className=' mt-5 flex flex-col gap-5'>
        {
          askedQuestionData.map(({ question , id }) => (
            <p key={id} onClick={() => router.push(`/ask/${id}`)} className='border-b  cursor-pointer bg-neutral-200 mx-5 p-5 underline rounded-sm' >{question}</p>
          ))
        }
      </div>

    </div>
  )
}

export default YourQuestions
