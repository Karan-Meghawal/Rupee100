import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Iconify from "@/components/Iconify";
import Image from "@/components/Image";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { useUserAuth } from "@/redux/slices/userAuth";
import { copyToClipboard, getReferralLink } from "@/utils/fns";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  OutlinedInput,
  Stack,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { type NextPageWithLayout } from "../_app";

const Input = styled(OutlinedInput)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.grey[700]
      : theme.palette.grey[900],
}));

const ContentStyle = styled(Card)(({ theme }) => ({
  marginTop: -120,
  boxShadow: "none",
  padding: theme.spacing(16, 5, 5, 5),
  color: theme.palette.common.white,
}));

const Icon = styled(Box)(({ theme }) => ({
  width: 100,
  height: 100,
  borderRadius: 999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 40,
  padding: theme.spacing(1),
  background: alpha(theme.palette.primary.main, 0.1),
}));

const ReferralCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => (
  <Grid
    xs={12}
    md={4}
    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    textAlign={"center"}
    item
  >
    <Icon sx={{ margin: "auto" }}>
      <Iconify
        color="primary.main"
        icon={icon}
      />
    </Icon>
    <Typography
      variant="subtitle1"
      color={"text.primary"}
    >
      {title}
    </Typography>
    <Typography color={"text.secondary"}>{description}</Typography>
  </Grid>
);

const ReferralLink: NextPageWithLayout = () => {
  const appName = "";
  const { user } = useUserAuth();
  const { userId } = user!;

  const [leftLinkCopied, setLeftLinkCopied] = useState(false);
  const [rightLinkCopied, setRightLinkCopied] = useState(false);

  const referralLinks = {
    left: getReferralLink(userId, "left"),
    right: getReferralLink(userId, "right"),
  };

  const handleLeftLink = () => {
    setLeftLinkCopied(true);
    toast.success("Referral link copied to clipboard");
    void copyToClipboard(referralLinks.left);
    setTimeout(() => {
      setLeftLinkCopied(false);
    }, 1000);
  };

  const handleRightLink = () => {
    setRightLinkCopied(true);
    toast.success("Referral link copied to clipboard");
    void copyToClipboard(referralLinks.right);
    setTimeout(() => {
      setRightLinkCopied(false);
    }, 1000);
  };
  return (
    <Page title="Referral Link">
      <HeaderBreadcrumbs
        heading="Referral Link"
        links={[{ name: "Dashboard" }, { name: "Referral Link" }]}
      />
      <Card>
        <Image
          alt="Referral Link"
          src={"/images/referral.png"}
          sx={{
            left: 40,
            zIndex: 9,
            width: 140,
            height: "auto",
            position: "relative",
            filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.24))",
          }}
        />

        <ContentStyle>
          <Typography
            color={"text.primary"}
            mb={1}
            textAlign={"center"}
            variant="h4"
          >
            Invite friends and earn
          </Typography>
          <Typography
            color={"text.secondary"}
            textAlign={"center"}
          >
            Invite your friend to {appName}, if they sign up, you and your
            friend will get 30 days free trial
          </Typography>

          <Box sx={{ py: 4 }}>
            <Grid
              spacing={3}
              container
            >
              <ReferralCard
                icon="ri:share-fill"
                title="Send Invitation 🤟🏻"
                description="Send your referral link to your friend"
              />
              <ReferralCard
                icon="mdi:register"
                title="Registration 👩🏻‍💻"
                description="Let them register to our services"
              />
              <ReferralCard
                icon="zondicons:badge"
                title="Purchase Package 🎉"
                description="You will get referral income"
              />
            </Grid>
            <Divider sx={{ pt: 4 }} />
          </Box>

          <Typography
            color={"text.primary"}
            variant="h5"
          >
            Share the referral link
          </Typography>

          <Box>
            <Typography
              color={"text.secondary"}
              variant="body2"
              sx={{ mt: 2, mb: 1 }}
            >
              Left Side Referral Link
            </Typography>

            <Stack
              sx={{ mb: 3 }}
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="space-between"
            >
              <Input
                size="small"
                placeholder="Left Side Referral Link"
                sx={{
                  width: 1,
                  color: "common.white",
                  fontWeight: "fontWeightMedium",
                  "& input::placeholder": {
                    color: (theme) => alpha(theme.palette.common.white, 0.48),
                  },
                  "& fieldset": { display: "none" },
                }}
                value={referralLinks.left}
              />
              <Button
                onClick={handleLeftLink}
                variant="contained"
              >
                {!leftLinkCopied ? "Copy" : "Copied"}
              </Button>
            </Stack>
          </Box>

          <Box>
            <Typography
              color={"text.secondary"}
              variant="body2"
              sx={{ mt: 2, mb: 1 }}
            >
              Right Side Referral Link
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="space-between"
            >
              <Input
                size="small"
                placeholder="Right Side Referral Link"
                sx={{
                  width: 1,
                  color: "common.white",
                  fontWeight: "fontWeightMedium",
                  "& input::placeholder": {
                    color: (theme) => alpha(theme.palette.common.white, 0.48),
                  },
                  "& fieldset": { display: "none" },
                }}
                value={referralLinks.right}
              />
              <Button
                onClick={handleRightLink}
                variant="contained"
              >
                {!rightLinkCopied ? "Copy" : "Copied"}
              </Button>
            </Stack>
          </Box>
        </ContentStyle>
      </Card>
    </Page>
  );
};

ReferralLink.getLayout = (page) => <Layout variant="dashboard">{page}</Layout>;
export default ReferralLink;
