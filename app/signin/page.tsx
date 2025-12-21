import { auth } from "@/auth";
import GithubSignin from "@/components/githubSignin";
import SignIn from "@/components/SignIn";
import { redirect } from "next/navigation";
import React from "react";

const page =  () => {
  // const session = await auth();
  // if (session) {
  //   redirect("/");
  // }
  return (
    <div>
      sign in ker lode
      <SignIn />
      <GithubSignin />
    </div>
  );
};

export default page;
