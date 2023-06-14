import React from "react";
import Layout from "@/layouts";
import Page from "@/components/Page";
import { type NextPageWithLayout } from "@/pages/_app";
import { KycTable } from "@/sections/admin/kyc";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";

const Verified: NextPageWithLayout = () => (
  <Page title="Verified Kyc">
    <HeaderBreadcrumbs
      heading="Verified Kyc"
      links={[{ name: "Kyc" }, { name: "Verified Kyc" }]}
    />
    <KycTable
      status="verified"
      title="Verified Kyc"
    />
  </Page>
);
Verified.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Verified;
