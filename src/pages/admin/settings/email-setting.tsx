import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import {
  EmailSettingCard,
  SendTestEmail,
} from "@/sections/admin/email-setting";
import { Grid } from "@mui/material";

const EmailSetting: NextPageWithLayout = () => (
  <Page title="Email Setting">
    <HeaderBreadcrumbs
      heading="Email Setting"
      links={[{ name: "System Configuration" }, { name: "Email Setting" }]}
    />

    <Grid
      container
      spacing={3}
    >
      <Grid
        item
        xs={12}
        md={6}
      >
        <EmailSettingCard />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
      >
        <SendTestEmail />
      </Grid>
    </Grid>
  </Page>
);
EmailSetting.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default EmailSetting;
