"use client";
import { signIn } from "next-auth/react";

const SignInWithGoogle = () => {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="flex items-center justify-center gap-1 text-lg"
      type="button"
    >
      <p className="text-sm sm:text-lg sm:font-bold">Continue with</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z" />
      </svg>
    </button>
  );
};

export default SignInWithGoogle;
