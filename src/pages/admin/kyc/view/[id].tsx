import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import { RESPONSIVE_GAP } from "@/config";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { ADMIN_PATH } from "@/route";
import ProfileKycSection from "@/sections/admin/kyc/ProfileKycSection";
import {
  UserContactDetails,
  UserProfile,
  UserProfileCover,
} from "@/sections/admin/users";
import AboutCard from "@/sections/user/profile/AboutCard";
import { adminApi } from "@/utils/api";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  LinearProgress,
} from "@mui/material";
import { useRouter } from "next/router";

const Profile: NextPageWithLayout = () => {
  const router = useRouter();
  const { query } = router;
  const kycId = query.id as string;

  const { data, isLoading } = adminApi.kyc.getRecord.useQuery(kycId, {
    enabled: router.isReady,
  });
  const { user, kyc } = data! ?? {
    user: {},
    kyc: {},
  };

  return (
    <Page title={`Kyc View - ${kycId}`}>
      <HeaderBreadcrumbs
        heading={`Kyc View`}
        links={[
          { name: "Kyc", href: ADMIN_PATH.kyc.all },
          { name: `Kyc View - ${kycId}` },
        ]}
      />
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Grid
          container
          spacing={RESPONSIVE_GAP}
        >
          <ProfileKycSection {...kyc} />
          <Grid
            item
            xs={12}
          >
            <Card sx={{ height: 280 }}>
              <UserProfileCover {...user} />
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <Card>
              <CardHeader
                title="About"
                sx={{
                  bgcolor: "background.neutral",
                }}
              />
              <CardContent>
                <AboutCard user={user} />
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
          >
            <UserProfile user={user} />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <UserContactDetails contact={user.contact} />
          </Grid>
        </Grid>
      )}
    </Page>
  );
};
Profile.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Profile;
