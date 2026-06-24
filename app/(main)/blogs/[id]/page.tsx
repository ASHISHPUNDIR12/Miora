import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import PostComment from '@/components/PostComment'
import { auth } from '@/auth'
import CommentVote from '@/components/CommentVote'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const session = await auth();
  const userId = session?.user?.id;

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
      },
      comment: {
        include: {
          user: {
            select: {
              name: true,
              image: true
            }
          },
          votes: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })

  if (!blog) {
    notFound()
  }

  // sort kero comment based on vote
  const commentsWithStatus = blog.comment.map(c => ({
    ...c,
    voteCount: c.votes.length,
    hasVoted: userId ? c.votes.some(v => v.userId === userId) : false
  })).sort((a, b) => {
    if (b.voteCount !== a.voteCount) {
      return b.voteCount - a.voteCount;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="min-h-screen bg-yellow-50">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 leading-tight mb-6">
            {blog.title}
          </h1>

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

        <div className="h-px bg-neutral-300 mb-8"></div>

        <div className="prose prose-lg max-w-none">
          <div className="text-neutral-800 leading-relaxed whitespace-pre-wrap text-lg">
            {blog.content}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-300">
          <p className="text-sm text-neutral-500 text-center">
            Last updated on {new Date(blog.updatedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
        </div>

        {/* Comments Section */}
        <div className="mt-16">
          <div className="h-px bg-neutral-300 mb-12"></div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-8">
            Comments ({blog.comment.length})
          </h2>

          <div className="mb-12">
            <PostComment blogId={blog.id} />
          </div>

          <div className="space-y-8">
            {commentsWithStatus.map((comment) => (
              <div key={comment.id} className="bg-white p-6 rounded-xl border border-neutral-100 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-semibold text-lg overflow-hidden">
                      {comment.user.image ? (
                        <img src={comment.user.image} alt={comment.user.name || ''} className="h-full w-full object-cover" />
                      ) : (
                        (comment.user.name?.[0] || 'A').toUpperCase()
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900">
                        {comment.user.name || 'Anonymous'}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {new Date(comment.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <CommentVote
                    commentId={comment.id}
                    initialVotes={comment.voteCount}
                    initialHasVoted={comment.hasVoted}
                  />
                </div>
                <p className="text-neutral-700 leading-relaxed mt-2">
                  {comment.content}
                </p>
              </div>
            ))}

            {blog.comment.length === 0 && (
              <p className="text-neutral-500 text-center italic py-8">
                No comments yet. Be the first to share your thoughts!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default page
