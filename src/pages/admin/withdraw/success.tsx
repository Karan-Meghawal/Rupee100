import React from "react";
import Layout from "@/layouts";
import Page from "@/components/Page";
import { type NextPageWithLayout } from "@/pages/_app";
import { WithdrawTable } from "@/sections/admin/withdraw";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";

const Success: NextPageWithLayout = () => (
  <Page title="Success">
    <HeaderBreadcrumbs
      heading="Success Withdraw"
      links={[{ name: "Withdraw" }, { name: "Success Withdraw" }]}
    />
    <WithdrawTable
      title="Success Withdraws"
      status="success"
      sortBy="updatedAt"
    />
  </Page>
);
Success.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Success;
