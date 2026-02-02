"use server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { SignUpSchema } from "@/lib/authSchema";
import { auth, signIn } from "@/auth";
import { revalidatePath } from "next/cache";
export async function SignUp(formData: FormData) {
  // get details from the form
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");
    const parsed = SignUpSchema.safeParse({ email, password, name });
    if (!parsed.success) {
      return {
        success: false,
        errors: parsed.error.flatten().fieldErrors,
      };
    }
    const {
      name: validName,
      email: validEmail,
      password: validPassword,
    } = parsed.data;

    const isUserAlreadyExist = await prisma.user.findUnique({
      where: {
        email: validEmail,
      },
    });

    if (isUserAlreadyExist) {
      return {
        success: false,
        message: "user already exist ",
      };
    }

    const hashedPassword = await bcrypt.hash(validPassword, 10);

    // create user in db
    await prisma.user.create({
      data: {
        name: validName,
        email: validEmail,
        password: hashedPassword,
      },
    });

    //auto login

    try {
      await signIn("credentials", {
        email: validEmail,
        password: validPassword,
        redirect: false,
      });
    } catch (error) {
      console.error("Auto-login failed:", error);
    }

    return {
      success: true,
      message: "Account created succesfully",
    };
  } catch (error) {
    console.error("Signup error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function AskQuestion(prevState: any, formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return { success: false, message: "User not found" };
  }
  const textarea = formData.get("textarea") as string;
  try {
    await prisma.question.create({
      data: {
        question: textarea,
        userId: userId,
      },
    });
    revalidatePath("/ask");
    return {
      success: true,
      message: "Question posted succesfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to post question",
    };
  }
}

export async function postAnswer(prevState: any, formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return {
      success: false,
      error: "user not found",
    };
  }
  const answer = formData.get("answer") as string;
  const questionId = formData.get("questionId") as string;
  try {
    await prisma.answer.create({
      data: {
        userId: userId,
        content: answer,
        questionId: questionId,
      },
    });
    revalidatePath(`ask/${questionId}`);
    return {
      success: true,
      message: "Answer posted succesfully",
    };
  } catch (err) {
    console.log("This is the error while posting answer", err);
    return {
      success: false,
      error: "failed to post answer ",
    };
  }
}

export async function deleteQuestion(questionId: string | null) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      success: false,
      error: "you must be log in to delete questions ",
    };
  }
  if (!questionId) {
    return {
      success: false,
      error: "Question does not exist",
    };
  }
  try {
    await prisma.question.delete({
      where: {
        id: questionId,
      },
    });
    revalidatePath("/ask");
    return {
      success: true,
      message: "question deleted successfully ",
    };
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
}

export async function writeBlog(prevState: any, formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return {
      success: false,
      error: "user not found",
    };
  }
  const blogs = formData.get("blog") as string;
  const title = formData.get("title") as string;
  try {
    await prisma.blog.create({
      data: {
        content: blogs,
        title: title,
        userId: userId,
      },
    });
    revalidatePath("/write");
    return {
      success: true,
      message: "blog created succesfully ",
    };
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
}

export async function postComment(prevState: any, formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return {
      success: false,
      error: "You must be logged in to comment",
    };
  }
  const content = formData.get("comment") as string;
  const blogId = formData.get("blogId") as string;

  if (!content || !blogId) {
    return {
      success: false,
      error: "Missing required fields",
    };
  }

  try {
    await prisma.comment.create({
      data: {
        content: content,
        userId: userId,
        blogId: blogId,
      },
    });
    revalidatePath(`/blogs/${blogId}`);
    return {
      success: true,
      message: "Comment posted successfully",
    };
  } catch (err) {
    console.error("Error posting comment:", err);
    return {
      success: false,
      error: "Failed to post comment",
    };
  }
}

export async function toggleCommentVote(commentId: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      success: false,
      error: "You must be logged in to vote",
    };
  }

  try {
    const existingVote = await prisma.vote.findFirst({
      where: {
        userId,
        commentId,
      },
    });

    if (existingVote) {
      await prisma.vote.delete({
        where: {
          id: existingVote.id,
        },
      });
    } else {
      await prisma.vote.create({
        data: {
          type: "UPVOTE",
          userId,
          commentId,
        },
      });
    }

    // finding the blogId associated with the comment to revalidate the path
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { blogId: true },
    });

    if (comment?.blogId) {
      revalidatePath(`/blogs/${comment.blogId}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Error toggling vote:", error);
    return { success: false, error: "Failed to vote" };
  }
}

export async function toggleQuestionVote(questionId: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      success: false,
      error: "You must be logged in to vote",
    };
  }

  try {
    const existingVote = await prisma.vote.findFirst({
      where: {
        userId,
        questionId,
      },
    });

    if (existingVote) {
      await prisma.$transaction([
        prisma.vote.delete({
          where: {
            id: existingVote.id,
          },
        }),
        prisma.question.update({
          where: {
            id: questionId,
          },
          data: {
            votesCount: {
              decrement: 1,
            },
          },
        }),
      ]);
    } else {
      await prisma.$transaction([
        prisma.vote.create({
          data: {
            type: "UPVOTE",
            userId,
            questionId,
          },
        }),
        prisma.question.update({
          where: {
            id: questionId,
          },
          data: {
            votesCount: {
              increment: 1,
            },
          },
        }),
      ]);
    }

    revalidatePath("/answers");
    return { success: true };
  } catch (error) {
    console.error("Error toggling question vote:", error);
    return { success: false, error: "Failed to vote" };
  }
}
