"use client";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


const page = () => {
  // await requireAuth()
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getWorkflows.queryOptions())

  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries(trpc.getWorkflows.queryOptions())
    }
  }))

  return (
    <div className="text-red-500">
      Protect Server Compoonent
      {JSON.stringify(data)}
      <Button disabled={create.isPending} onClick={() => { create.mutate() }}>create</Button>
    </div>
  )
}

export default page