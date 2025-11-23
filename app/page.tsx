import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Client } from "./client"
import { getQueryClient, trpc } from "@/trpc/server"
import { Suspense } from "react";



const page = async () => {

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.hello.queryOptions({ text: 'fenmiao' }))

  return (
    <div className="text-red-500">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>loading</div>}>
          <Client />
        </Suspense>
      </HydrationBoundary>
    </div >
  )
}

export default page