import React from "react";
import Layout from "@/layouts";
import Page from "@/components/Page";
import { type NextPageWithLayout } from "@/pages/_app";
import { WithdrawTable } from "@/sections/admin/withdraw";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";

const Pending: NextPageWithLayout = () => (
  <Page title="Pending">
    <HeaderBreadcrumbs
      heading="Pending Withdraw"
      links={[{ name: "Withdraw" }, { name: "Pending Withdraw" }]}
    />
    <WithdrawTable
      title="Pending Withdraws"
      status="pending"
      pending
    />
  </Page>
);
Pending.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Pending;
