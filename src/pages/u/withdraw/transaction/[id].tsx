import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { USER_PATH } from "@/route";
import { WithdrawTransactionPage } from "@/sections/user/withdraw";
import { useRouter } from "next/router";

const WithdrawTransaction: NextPageWithLayout = () => {
  const router = useRouter();
  const { query } = router;
  const id = query.id as string;
  if (typeof id !== "string") return null;

  return (
    <Page title={`Withdraw Transaction ${id}`}>
      <HeaderBreadcrumbs
        heading="Withdraw Details"
        links={[
          {
            name: "Withdraw",
            href: USER_PATH.withdraw.history,
          },
          {
            name: `#${id}`,
          },
        ]}
      />
      <WithdrawTransactionPage id={id} />
    </Page>
  );
};

WithdrawTransaction.getLayout = (page) => (
  <Layout variant="dashboard">{page}</Layout>
);

export default WithdrawTransaction;
