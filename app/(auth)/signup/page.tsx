import { auth } from "@/auth";
import AuthForm from "@/components/AuthForm";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return <AuthForm type="signup" />;
};

export default page;
