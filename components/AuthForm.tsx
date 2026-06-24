"use client";
import { SignUp } from "@/app/action";
import SignInWithGoogle from "./SignIn";
import SignInWithGithub from "./githubSignin";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
const AuthForm = ({ type }: { type: "signin" | "signup" }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      if (type === "signup") {
        const res = await SignUp(formData);

        if (res.success) {
          router.push("/");
          router.refresh();
        } else {
          setError(
            res.errors?.email?.[0] ||
            res.errors?.password?.[0] ||
            res.errors?.name?.[0] ||
            res.message ||
            "Something went wrong",
          );
        }
      } else {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError(
            result.error === "CredentialsSignin"
              ? "Invalid email or password"
              : result.error,
          );
        } else if (result?.ok) {
          router.push("/");
          router.refresh();
        }
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="max-w-90 rounded-4xl p-6 text-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] sm:min-h-130 sm:min-w-100">
      <div className="font-sourceserif mt-4 text-3xl  font-bold text-yellow-950 ">
        {type === "signin" ? <h1>Login</h1> : <h1>Register</h1>}
      </div>
      <p className="my-4 tracking-tighter ">
        Enter your details and bless yourself <br /> with
        <span className="text-amber-700"> Miora</span>
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {type === "signup" && (
          <input
            name="name"
            type="text"
            placeholder="Enter your full name"
            required
            disabled={isLoading}
            className="rounded-sm border border-neutral-300 p-1 placeholder:text-neutral-400 focus:ring focus:ring-amber-800 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
        )}
        <input
          name="email"
          type="email"
          placeholder="Enter Your Email"
          required
          disabled={isLoading}
          className="rounded-sm border border-neutral-300 p-1 placeholder:text-neutral-400 focus:ring focus:ring-amber-800 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          disabled={isLoading}
          className="rounded-sm border border-neutral-300 p-1 placeholder:text-neutral-400 focus:ring focus:ring-amber-800 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />

        {error && (
          <div className="rounded-sm bg-red-50 p-2 text-sm text-red-600">
            {error}
          </div>
        )}

        <p className="mt-2 w-40 cursor-pointer text-sm tracking-tighter text-neutral-500">
          Having Trouble in{" "}
          <span>{type === "signin" ? "Login?" : "Signup?"}</span>
        </p>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-amber-900 py-2 text-white transition-all duration-200 hover:translate-y-0.5 hover:bg-amber-800 focus:outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:active:scale-100"
        >
          {isLoading ? (
            <>
              <svg
                className="h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>
                {type === "signin" ? "Logging in..." : "Creating account..."}
              </span>
            </>
          ) : (
            <span>{type === "signin" ? "Login" : "Register"}</span>
          )}
        </button>
      </form>

      <p className="my-5">—— Or Continue with ——</p>
      <div className="flex justify-around">
        <div className="items-center justify-center rounded-lg border border-neutral-300 px-3 py-1 hover:bg-neutral-100">
          <SignInWithGithub />
        </div>
        <div className="items-center justify-center rounded-lg border border-neutral-300 px-3 py-1 hover:bg-neutral-100">
          <SignInWithGoogle />
        </div>
      </div>
      <div className="my-5">
        {type === "signin" ? (
          <p className="font-light">
            Don't have an Account?
            <span className="font-bold text-yellow-950">
              <Link href={"/signup"}> Register</Link>
            </span>
          </p>
        ) : (
          <p className="font-light">
            Already have an Account?
            <span className="font-bold text-yellow-950">
              <Link href={"/signin"}> Login</Link>
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
