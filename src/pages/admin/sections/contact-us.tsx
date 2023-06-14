import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import { RESPONSIVE_GAP } from "@/config";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import {
  ContactUsForm,
  SocialLinksForm,
} from "@/sections/admin/sections/contact-us";
import { Stack } from "@mui/material";

const ContactUs: NextPageWithLayout = () => (
  <Page title="ContactUs">
    <HeaderBreadcrumbs
      heading="Contact Us"
      links={[{ name: "Manage Section" }, { name: "Contact Us" }]}
    />

    <Stack spacing={RESPONSIVE_GAP}>
      <ContactUsForm />
      <SocialLinksForm />
    </Stack>
  </Page>
);
ContactUs.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default ContactUs;
