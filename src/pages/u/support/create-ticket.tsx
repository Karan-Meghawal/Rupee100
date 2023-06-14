import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { USER_PATH } from "@/route";
import { SupportTicketForm } from "@/sections/user/support";
import { Box, Card, CardHeader, Divider } from "@mui/material";

const CreateTicket: NextPageWithLayout = () => (
  <Page title="Create Ticket">
    <HeaderBreadcrumbs
      heading="Create ticket"
      links={[
        { name: "Dashboard", href: USER_PATH.dashboard },
        { name: "Support", href: USER_PATH.support.root },
        { name: "Create ticket" },
      ]}
    />
    <Card>
      <Box sx={{ bgcolor: "background.neutral" }}>
        <CardHeader title="Create ticket" />
        <Divider />
      </Box>
      <Box p={3}>
        <SupportTicketForm />
      </Box>
    </Card>
  </Page>
);
CreateTicket.getLayout = (page) => <Layout variant="dashboard">{page}</Layout>;

export default CreateTicket;
