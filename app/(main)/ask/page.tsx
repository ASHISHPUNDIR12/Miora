

import { auth } from "@/auth";
import AskForm from "@/components/AskForm";
import YourQuestions from "@/components/YourQuestions";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth()
  if (!session) redirect("/signin")
  const askedQuestionData = await prisma.question.findMany({
    where: {
      userId: session.user?.id
    }
  })
  console.log(askedQuestionData)
  return (
    <div className="relative">
      <AskForm />
      <YourQuestions askedQuestionData={askedQuestionData} />
    </div>
  );
};

export default page;
