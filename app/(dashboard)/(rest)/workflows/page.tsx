import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { ErrorBoundary } from "react-error-boundary";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { WorkflowsContainer, WorkflowsList } from "@/features/workflows/components/workflows";

const Page = async () => {
  await requireAuth();
  // 作为服务端组件，在服务端预缓存workflows数据到trpc的getQueryClient()中
  prefetchWorkflows();
  return (
    <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<div>Error</div>}>
          <Suspense fallback={<div>Loading</div>}>
            <WorkflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowsContainer>
  );

};

export default Page;
