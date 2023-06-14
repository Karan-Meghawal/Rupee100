import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { ReferralIncomeTable } from "@/sections/admin/reports";

const ReferralIncome: NextPageWithLayout = () => (
  <Page title="ReferralIncome">
    <HeaderBreadcrumbs
      heading="Referral Income"
      links={[{ name: "Reports" }, { name: "Referral Income" }]}
    />
    {/* <ReferralIncomeCards /> */}
    <ReferralIncomeTable />
  </Page>
);
ReferralIncome.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default ReferralIncome;
