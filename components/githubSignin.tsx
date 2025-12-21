import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

const GithubSignin = async () => {
  const session  =  await auth()
  if(session){
    redirect("/")
  }
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        <button>sign in with github</button>
      </form>
    </div>
  );
};

export default GithubSignin;
