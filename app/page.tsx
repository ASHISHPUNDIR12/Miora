import { auth } from "@/auth";
import GithubSignin from "@/components/githubSignin";
import SignIn from "@/components/SignIn";
import SignOut from "@/components/SignOut";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  const userName = session?.user?.name;
  if (!session) {
    redirect("/signin");
  }
  return (
    <div>
      this is the user
      {userName}
      <SignOut />
    </div>
  );
}
