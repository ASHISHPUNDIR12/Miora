import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import React from 'react'

const page = async () => {
  const allBlogs = await prisma.blog.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      user: {
        select: {
          name: true,
          email: true
        }
      }
    }
  })

  return (
    <div className="mt-20 text-center">
      <h1 className="text-2xl font-bold">Explore Blogs</h1>
      <p className="mt-3 text-neutral-500">
        Read insightful articles and stories from our community.
      </p>
      <div className="mx-auto mt-2 h-px w-110 bg-neutral-400"></div>

      <div className="mx-auto mt-10 max-w-6xl px-4">
        {allBlogs.length === 0 ? (
          <p className="text-neutral-500 mt-8">No blogs available yet. Be the first to write one!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allBlogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.id}`}
                className="group border border-neutral-300 rounded-2xl p-6 hover:shadow-lg cursor-pointer transition-all duration-200 hover:border-neutral-400 bg-white flex flex-col"
              >
                {/* Blog Title */}
                <h2 className="text-xl font-bold text-neutral-800 group-hover:text-amber-900 transition-colors line-clamp-2 mb-3">
                  {blog.title}
                </h2>

                {/* Blog Content Preview */}
                <p className="text-neutral-600 text-sm line-clamp-3 mb-4 flex-grow">
                  {blog.content}
                </p>

                {/* Divider */}
                <div className="h-px bg-neutral-200 mb-4"></div>

                {/* Author and Date */}
                <div className="flex justify-between items-center text-xs text-neutral-500">
                  <span className="font-medium">
                    By {blog.user.name || 'Anonymous'}
                  </span>
                  <span>
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default page
