"use server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { SignUpSchema } from "@/lib/authSchema";
import { signIn } from "@/auth";

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
