"use client"
import { signOut } from "next-auth/react";
import React from "react";

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
