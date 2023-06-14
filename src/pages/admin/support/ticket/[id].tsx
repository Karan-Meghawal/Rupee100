import ApiError from "@/components/ApiError";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import LoadingProgress from "@/components/LoadingProgress";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { ADMIN_PATH } from "@/route";
import {
  CloseTicket,
  MessageCard,
  SupportTicketForm,
} from "@/sections/admin/support";
import { adminApi } from "@/utils/api";
import { fDateTime } from "@/utils/formatTime";
import { Alert, AlertTitle } from "@mui/lab";
import { Box, Card, CardHeader, Divider } from "@mui/material";
import { useRouter } from "next/router";

const Ticket: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const ticketId = id as string;

  const { data, isLoading, error } = adminApi.support.getTicket.useQuery(
    ticketId,
    {
      enabled: router.isReady,
    },
  );
  if (isLoading) return <LoadingProgress />;

  if (error) return <ApiError error={error} />;
  const { status, updatedAt, closedBy, messages } = data ?? {};

  return (
    <Page title={`Support Ticket #${ticketId}`}>
      <HeaderBreadcrumbs
        heading="Support"
        links={[
          { name: "Support", href: ADMIN_PATH.support.root },
          { name: `Ticket #${ticketId}` },
        ]}
        action={status === "closed" ? undefined : <CloseTicket id={ticketId} />}
      />

      {status === "closed" ? (
        <Alert
          severity="error"
          sx={{ mb: 4 }}
        >
          <AlertTitle>Ticket Closed</AlertTitle>
          This ticket was closed by {closedBy === "admin"
            ? "you"
            : "the user"} at <strong>{fDateTime(updatedAt)}</strong>
        </Alert>
      ) : (
        <Card sx={{ mb: 4 }}>
          <Box sx={{ bgcolor: "background.neutral" }}>
            <CardHeader title="Add reply" />
            <Divider />
          </Box>
          <Box p={3}>
            <SupportTicketForm id={ticketId} />
          </Box>
        </Card>
      )}

      {messages.map((message, index) => (
        <MessageCard
          key={index}
          {...message}
        />
      ))}
    </Page>
  );
};
Ticket.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Ticket;
