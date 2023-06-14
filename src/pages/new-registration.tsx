import Iconify from "@/components/Iconify";
import Page from "@/components/Page";
import { AnimatedButton } from "@/components/animate";
import { useConfiguration } from "@/redux/slices/configuration";
import APP_PATH from "@/route";
import { userApi } from "@/utils/api";
import { isUserId } from "@/utils/fns";
import { fDateTime } from "@/utils/formatTime";
import styled from "@emotion/styled";
import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import ConfettiExplosion, {
  type ConfettiProps,
} from "react-confetti-explosion";
import Page404 from "./404";

const RootStyle = styled("div")(() => ({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const CardRow = ({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) => (
  <Stack
    direction="row"
    justifyContent="space-between"
    sx={{ py: 2 }}
  >
    <Typography
      color="grey.600"
      variant="subtitle1"
    >
      {label}
    </Typography>
    <Typography>{value}</Typography>
  </Stack>
);

const largeProps: ConfettiProps = {
  force: 1,
  duration: 3000,
  particleCount: 300,
  width: typeof window !== "undefined" ? window.innerWidth : 0,
  //   colors: [
  //     palette.light.primary.main,
  //     palette.light.secondary.main,
  //     palette.light.info.main,
  //     palette.light.warning.main,
  //     palette.light.error.main,
  //     palette.light.success.main,
  //   ],
  colors: ["#041E43", "#1471BF", "#5BB4DC", "#FC027B", "#66D805"],
};

const NewRegistration = () => {
  const { appName } = useConfiguration();
  const router = useRouter();
  const { query } = router;

  const isUser = typeof query.id === "string" && isUserId(query.id);
  const userId = query.id as string;
  const { data, isLoading } = userApi.auth.getNewUser.useQuery(userId, {
    enabled: isUser,
  });
  const { userName, email, referralId, placementId, placementSide, createdAt } =
    data ?? {};

  if (!isUser) {
    return <Page404 />;
  }
  return (
    <Page title="Registration Successful">
      <RootStyle>
        <Card sx={{ width: 1, maxWidth: 450, position: "relative" }}>
          <CardContent>
            <Box
              sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              {data && <ConfettiExplosion {...largeProps} />}
            </Box>
            <Box textAlign="center">
              <Iconify
                sx={{ fontSize: 60 }}
                color="success.main"
                icon={"ic:round-check-circle"}
              />
            </Box>
            <Typography
              variant="h4"
              textAlign="center"
            >
              Registration Successful
            </Typography>

            <Box sx={{ my: 3 }}>
              {isLoading && (
                <Stack spacing={3}>
                  {Array(6)
                    .fill(null)
                    .map((v, i) => (
                      <Skeleton
                        key={i}
                        variant="rectangular"
                        height={30}
                        sx={{ borderRadius: 1 }}
                      />
                    ))}
                </Stack>
              )}

              {!isLoading && (
                <>
                  <CardRow
                    label={"User Id"}
                    value={userId}
                  />
                  <CardRow
                    label={"User Name"}
                    value={userName}
                  />
                  <CardRow
                    label={"Email"}
                    value={email}
                  />
                  <CardRow
                    label={"Referral Id"}
                    value={referralId}
                  />
                  <CardRow
                    label={"Placement Id"}
                    value={placementId}
                  />
                  <CardRow
                    label={"Placement Side"}
                    value={placementSide}
                  />
                  <CardRow
                    label={"Registered At"}
                    value={fDateTime(createdAt!)}
                  />
                </>
              )}
            </Box>

            <Typography
              sx={{ mb: 3 }}
              color="text.secondary"
              textAlign="center"
            >
              Thanks for becoming a member of {appName}
            </Typography>

            <AnimatedButton
              LinkComponent={Link}
              href={APP_PATH.home}
              size="large"
              variant="contained"
              fullWidth
            >
              Go To Home
            </AnimatedButton>
          </CardContent>
        </Card>
      </RootStyle>
    </Page>
  );
};

export default NewRegistration;
