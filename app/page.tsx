import prisma from "@/lib/db"
import { caller } from "@/trpc/server"

const page = async () => {

  // const users = await prisma.user.findMany();

  const users = await caller.getUsers();
  return (
    <div className="text-red-500">
      {JSON.stringify(users)}
    </div>
  )
}

export default page