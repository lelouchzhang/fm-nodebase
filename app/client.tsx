"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const Client = () => {

    useEffect(() => {
        if (typeof window !== 'undefined') {
            console.log('初始页query水合成功')
        }
    }, [])

    const trpc = useTRPC()
    const { data: hello } = useSuspenseQuery(trpc.hello.queryOptions({ text: 'fenmiao' }))

    return (
        <div>
            client {JSON.stringify(hello)}
        </div>
    )
}
