import React from "react";
import Layout from "@/layouts";
import Page from "@/components/Page";
import { type NextPageWithLayout } from "@/pages/_app";
import { WithdrawTable } from "@/sections/admin/withdraw";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";

const Rejected: NextPageWithLayout = () => (
  <Page title="Rejected">
    <HeaderBreadcrumbs
      heading="Rejected Withdraw"
      links={[{ name: "Withdraw" }, { name: "Rejected Withdraw" }]}
    />
    <WithdrawTable
      title="Rejected Withdraws"
      status="rejected"
      sortBy="updatedAt"
    />
  </Page>
);
Rejected.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Rejected;
