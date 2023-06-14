import EmptyContent from "@/components/EmptyContent";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Image from "@/components/Image";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { USER_PATH } from "@/route";
import { userApi } from "@/utils/api";
import { fCurrency, fPercent } from "@/utils/formatNumber";
import {
  Box,
  Button,
  Card,
  Divider,
  LinearProgress,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import NextLink from "next/link";

const WithdrawPayment: NextPageWithLayout = () => {
  const { data, isLoading } = userApi.withdraw.getUserMethodRecords.useQuery();
  const gateways = data! ?? [];
  return (
    <Page title="Withdraw Payment">
      <HeaderBreadcrumbs
        heading="Withdraw"
        links={[
          { name: "Dashboard", href: USER_PATH.dashboard },
          { name: "Withdraw" },
        ]}
      />
      {isLoading && <LinearProgress />}
      <Box
        sx={{
          ...(gateways.length && {
            display: "grid",
            gap: 3,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
          }),
        }}
      >
        {!gateways.length && !isLoading ? (
          <Card
            sx={{ height: 600 }}
            className="here"
          >
            <EmptyContent
              title="No data available"
              description="You have not added any withdraw method"
              element={
                <Button
                  href={USER_PATH.withdraw.methods}
                  LinkComponent={NextLink}
                  sx={{ mt: 2 }}
                  variant="contained"
                >
                  Add Withdraw Details
                </Button>
              }
            />
          </Card>
        ) : (
          gateways.map(
            ({
              id,
              name,
              logo,
              processingTime,
              minWithdraw,
              maxWithdraw,
              charge,
              chargeType,
            }) => (
              <Card key={id}>
                <Box sx={{ position: "relative" }}>
                  <Image
                    alt={name}
                    src={logo}
                  />
                </Box>
                <Stack
                  spacing={2}
                  sx={{ p: 3 }}
                >
                  <Link
                    href={USER_PATH.withdraw.payment(id)}
                    color="inherit"
                    component={NextLink}
                  >
                    <Typography
                      sx={{
                        textDecoration: "underline",
                        textTransform: "uppercase",
                      }}
                      color="primary.main"
                      textAlign={"center"}
                      variant="subtitle2"
                      noWrap
                    >
                      {name}
                    </Typography>
                  </Link>
                  <Stack
                    sx={{ color: "text.secondary" }}
                    spacing={1}
                  >
                    <Stack
                      justifyContent={"space-between"}
                      direction="row"
                    >
                      <Typography variant="subtitle2">Charge</Typography>
                      <Typography variant="subtitle2">
                        {chargeType === "fixed"
                          ? fCurrency(charge)
                          : fPercent(charge)}
                      </Typography>
                    </Stack>
                    <Divider />
                    <Stack
                      justifyContent={"space-between"}
                      direction="row"
                    >
                      <Typography variant="subtitle2">Limit</Typography>
                      <Typography variant="subtitle2">
                        {fCurrency(minWithdraw)}{" "}
                        <Box
                          component={"span"}
                          mx={0.3}
                        >
                          -
                        </Box>{" "}
                        {fCurrency(maxWithdraw)}
                      </Typography>
                    </Stack>
                    <Divider />
                    <Stack
                      justifyContent={"space-between"}
                      direction="row"
                    >
                      <Typography variant="subtitle2">
                        Processing Time
                      </Typography>
                      <Typography variant="subtitle2">
                        {processingTime}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Card>
            ),
          )
        )}
      </Box>
    </Page>
  );
};

WithdrawPayment.getLayout = (page) => (
  <Layout variant="dashboard">{page}</Layout>
);
export default WithdrawPayment;
