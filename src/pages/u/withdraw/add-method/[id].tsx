import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { USER_PATH } from "@/route";
import { AddMethodForm } from "@/sections/user/withdraw";
import { userApi } from "@/utils/api";
import { LinearProgress } from "@mui/material";
import { useRouter } from "next/router";

const AddMethod: NextPageWithLayout = () => {
  const router = useRouter();
  const { query } = router;
  const id = query.id as string;

  const { data, isLoading } = userApi.withdraw.getMethodData.useQuery(id, {
    enabled: router.isReady,
  });
  if (typeof id !== "string") return null;
  const isUpdated = false;
  const { method, userMethod } = data! ?? {};

  return (
    <Page title="Add Withdraw Method">
      <HeaderBreadcrumbs
        heading="Add Withdraw Method"
        links={[
          { name: "Withdraw Methods", href: USER_PATH.withdraw.methods },
          { name: "Add Withdraw Method" },
        ]}
      />
      {isLoading ? (
        <LinearProgress />
      ) : (
        <AddMethodForm
          id={id}
          method={method}
          userMethod={userMethod}
          isUpdated={isUpdated}
        />
      )}
    </Page>
  );
};
AddMethod.getLayout = (page) => <Layout variant="dashboard">{page}</Layout>;
export default AddMethod;
