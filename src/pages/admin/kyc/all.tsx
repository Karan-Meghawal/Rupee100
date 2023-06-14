import React from "react";
import Layout from "@/layouts";
import Page from "@/components/Page";
import { type NextPageWithLayout } from "@/pages/_app";
import { KycTable } from "@/sections/admin/kyc";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";

const All: NextPageWithLayout = () => (
  <Page title="All Kyc">
    <HeaderBreadcrumbs
      heading="All Kyc"
      links={[{ name: "Kyc" }, { name: "All Kyc" }]}
    />
    <KycTable
      status="all"
      title="All Kyc"
    />
  </Page>
);
All.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default All;
