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

