import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { KycTable } from "@/sections/admin/kyc";

const Rejected: NextPageWithLayout = () => (
  <Page title="Rejected">
    <HeaderBreadcrumbs
      heading="Rejected Kyc"
      links={[{ name: "Kyc" }, { name: "Rejected Kyc" }]}
    />
    <KycTable
      status="rejected"
      title="Rejected Kyc"
    />
  </Page>
);
Rejected.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Rejected;
