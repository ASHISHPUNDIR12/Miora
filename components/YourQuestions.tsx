"use client"
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Question = {
  id: string
  question: string

}
const YourQuestions = ({ askedQuestionData }: {
  askedQuestionData: Question[]
}) => {
  const [showalert, setShowalert] = useState(false)
  const router = useRouter()

  function handleDeleteQuestion(  ){

  }

  return (

    <div>
      <h1 className='text-center mt-4'>your asked questions</h1>
      <div className=' mt-5 flex flex-col gap-5'>
        {
          askedQuestionData.map(({ question, id }) => (

            <div key={id} className='flex justify-between mx-2'>
              <p onClick={() => router.push(`/ask/${id}`)} className='border flex-1 p-4 mx-4 rounded-2xl cursor-pointer font-bold  border-neutral-400  tracking-tight ' >{question}

              </p>
              <button onClick={() => setShowalert(true)} className='bg-red-800 text-white tracking-tight focus:outline-none px-6  rounded-md cursor-pointer  hover:bg-red-800/80 '>Delete </button>
            </div>
          ))
        }
        {
          showalert && (
            <div
              className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'
              onClick={() => setShowalert(false)} // Close on backdrop click
            >
              <div
                className='bg-white border border-neutral-300 rounded-lg p-6 shadow-xl max-w-md w-full mx-4'
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking dialog
              >
                <p className='text-lg font-bold mb-2'>Confirmation</p>
                <p className='mb-6'>Are you sure you want to delete this question?</p>
                <div className='flex gap-3 justify-end'>
                  <button
                    onClick={() => setShowalert(false)}
                    className='px-4 py-2 border rounded-md hover:bg-gray-100'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={()=>handleDeleteQuestion()}
                    className='px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-800/80'
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )
        }


      </div>

    </div>
  )
}

export default YourQuestions

