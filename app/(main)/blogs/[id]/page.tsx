import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import React from 'react'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  const blog = await prisma.blog.findUnique({
    where: {
      id: id
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          image: true
        }
      }
    }
  })

  if (!blog) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-4xl px-4 py-16">
        {/* Blog Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 leading-tight mb-6">
            {blog.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center gap-4 text-neutral-600 border-l-4 border-amber-900 pl-4 py-2">
            <div>
              <p className="font-medium text-neutral-800">
                {blog.user.name || 'Anonymous'}
              </p>
              <p className="text-sm text-neutral-500">
                Published on {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-neutral-300 mb-8"></div>

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none">
          <div className="text-neutral-800 leading-relaxed whitespace-pre-wrap text-lg">
            {blog.content}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-neutral-300">
          <p className="text-sm text-neutral-500 text-center">
            Last updated on {new Date(blog.updatedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
        </div>
      </div>
    </div>
  )
}

export default page
