import Page400 from "@/pages/400";
import Page404 from "@/pages/404";
import Page500 from "@/pages/500";
import { TRPCClientError } from "@trpc/client";

type Props = { error: unknown };

const ApiError = ({ error }: Props) => {
  if (error instanceof TRPCClientError) {
    // todo
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const status = error.shape?.data?.httpStatus as number;
    if (status === 404) return <Page404 />;
    if (status === 400) return <Page400 />;
  }
  return <Page500 />;
};

export default ApiError;
