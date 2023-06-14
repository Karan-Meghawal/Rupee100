import EmptyContent from "@/components/EmptyContent";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Iconify from "@/components/Iconify";
import Image from "@/components/Image";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { USER_PATH } from "@/route";
import { DeleteUserMethod } from "@/sections/user/withdraw";
import { userApi } from "@/utils/api";
import { fCurrency, fPercent } from "@/utils/formatNumber";
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  LinearProgress,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import NextLink from "next/link";

const WithdrawMethods: NextPageWithLayout = () => {
  const { data, isLoading } = userApi.withdraw.getMethodRecords.useQuery();

  const { methods, userMethods } = data! ?? {
    methods: [],
    userMethods: [],
  };

  return (
    <Page title="Withdraw Methods">
      <HeaderBreadcrumbs
        heading="Withdraw Methods"
        links={[
          { name: "Dashboard", href: USER_PATH.dashboard },
          { name: "Withdraw Methods" },
        ]}
      />
      {isLoading && <LinearProgress />}
      <Box
        sx={{
          ...(methods.length && {
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
        {!methods.length ? (
          <Card
            sx={{ height: 600 }}
            className="here"
          >
            <EmptyContent
              title="No data available"
              description="Currently no withdraw methods are available"
            />
          </Card>
        ) : (
          methods.map(
            ({
              id,
              name,
              logo,
              processingTime,
              minWithdraw,
              maxWithdraw,
              charge,
              chargeType,
            }) => {
              const isDetailsAdded =
                userMethods.length &&
                userMethods.find(({ methodId }) => methodId === id);

              return (
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
                      component={NextLink}
                      href={USER_PATH.withdraw.addMethod(id)}
                      color="inherit"
                    >
                      <Typography
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
                    <Box>
                      {!isDetailsAdded ? (
                        <Button
                          LinkComponent={NextLink}
                          href={USER_PATH.withdraw.addMethod(id)}
                          startIcon={<Iconify icon="carbon:add" />}
                          variant="contained"
                          fullWidth
                          size="large"
                          sx={{ mt: 1 }}
                        >
                          Add Details
                        </Button>
                      ) : (
                        <Stack
                          justifyContent="flex-start"
                          direction="row"
                        >
                          <IconButton
                            href={USER_PATH.withdraw.addMethod(id)}
                            LinkComponent={NextLink}
                            color="success"
                          >
                            <Iconify icon="carbon:edit" />
                          </IconButton>
                          <DeleteUserMethod id={id} />
                        </Stack>
                      )}
                    </Box>
                  </Stack>
                </Card>
              );
            },
          )
        )}
      </Box>
    </Page>
  );
};

WithdrawMethods.getLayout = (page) => (
  <Layout variant="dashboard">{page}</Layout>
);
export default WithdrawMethods;
