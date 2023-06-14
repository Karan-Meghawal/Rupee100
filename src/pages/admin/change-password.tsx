import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import UserChangePassword from "@/sections/user/profile/ChangePassword";

const ChangePassword: NextPageWithLayout = () => (
  <Page title="Change Password">
    <HeaderBreadcrumbs
      heading="Change Password"
      links={[{ name: "Change Password" }]}
    />
    <UserChangePassword />
  </Page>
);
ChangePassword.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default ChangePassword;
