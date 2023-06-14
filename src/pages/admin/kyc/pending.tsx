import React from "react";
import Layout from "@/layouts";
import Page from "@/components/Page";
import { type NextPageWithLayout } from "@/pages/_app";
import { KycTable } from "@/sections/admin/kyc";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";

const Pending: NextPageWithLayout = () => (
  <Page title="Pending">
    <HeaderBreadcrumbs
      heading="Pending Kyc"
      links={[{ name: "Kyc" }, { name: "Pending Kyc" }]}
    />
    <KycTable
      status="pending"
      title="Pending Kyc"
      pending
      sortBy="updatedAt"
    />
  </Page>
);
Pending.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Pending;
