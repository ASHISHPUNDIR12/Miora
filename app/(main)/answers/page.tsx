import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import React from 'react'

const page = async () => {
  const session = await auth()
  const allQUestions = await prisma.question.findMany({

  })
  return (
    <div>
      {allQUestions.map((question) => (
        <Link
          href={`/ask/${question.id}`}
          className='border p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer'
        >
          <span>{question.question}</span>
          <button className='border p-2 rounded-md'>Answer</button>
        </Link>
      ))}
    </div>
  )
}

export default page
