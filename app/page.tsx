"use client"
import { Button } from "@/components/ui/button";
// import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
// import { Client } from "./client"
// import { getQueryClient, trpc } from "@/trpc/server"
// import { Suspense } from "react";
import { authClient } from "@/lib/auth-client";



const page = () => {
  // tRpc & 水合实验
  // const queryClient = getQueryClient();
  // void queryClient.prefetchQuery(trpc.hello.queryOptions({ text: 'fenmiao' }))

  // better auth
  const { data } = authClient.useSession();

  return (
    <div className="text-red-500">
      {JSON.stringify(data)}
      {data && <Button onClick={() => authClient.signOut()}>登出</Button>}
      {/* <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>loading</div>}>
          <Client />
        </Suspense>
      </HydrationBoundary> */}
    </div >
  )
}

export default page