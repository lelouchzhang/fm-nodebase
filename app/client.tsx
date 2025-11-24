"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Client = () => {

    const trpc = useTRPC()
    const { data: hello } = useSuspenseQuery(trpc.hello.queryOptions({ text: 'fenmiao' }))

    return (
        <div>
            client {JSON.stringify(hello)}
        </div>
    )
}
