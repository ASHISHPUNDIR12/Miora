"use client"
import { signOut } from "next-auth/react";

const SignOut = () => {
  return (
    <div>
      <button
        onClick={async () => {
          await signOut();
        }}
      >
        sign out{" "}
      </button>
    </div>
  );
};

export default SignOut;
