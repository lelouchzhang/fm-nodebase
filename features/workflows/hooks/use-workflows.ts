/**
 * @description 通过suspense，获取全部工作流的 Hook
 */

import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// 渲染时先从缓存中查找数据，如果没有，则发送网络请求，从服务器端获取数据
export const useSuspenseWorkflows = () => {
    const trpc = useTRPC()

    // queryOptions生成查询配置包，却不执行网络请求，类似
    // {
    //  queryKey: [['workflows','getMany'], { type: 'query' }],
    //   queryFn: () => trpc.workflows.getMany()
    // }
    // 即数据包不自动发送请求，而是等待prefetch、useSuspenseQuery、dehydrate 等任何 React Query API调用，保证key 和函数完全一致
    // useSuspenseQuery 拿到这个配置包后真正发起请求，并在数据到位前挂起（suspend）组件渲染。
    // [useSuspenseQuery通过配置queryOptions，挂起组件直到数据到位]
    return useSuspenseQuery(trpc.workflows.getMany.queryOptions());
}

export const useCreateWorkflow = () => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    return useMutation(
        trpc.workflows.create.mutationOptions({
            onSuccess: (data) => {
                toast.success(`workflow "${data.name}" created successfully.`);
                queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions());
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })
    )
}