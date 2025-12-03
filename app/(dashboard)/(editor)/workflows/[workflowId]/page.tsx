import { requireAuth } from "@/lib/auth-utils";

type PageProps = {
  params: Promise<{
    workflowId: String;
  }>;
};

const Page = async ({ params }: PageProps) => {
  await requireAuth();
  const { workflowId } = await params;

  return <div>workflow Id:{workflowId}</div>;
};
export default Page;
