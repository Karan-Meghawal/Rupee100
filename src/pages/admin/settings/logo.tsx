import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import { RESPONSIVE_GAP } from "@/config";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import {
  FaviconUpload,
  FullLogoUpload,
  LogoUpload,
} from "@/sections/admin/logo-setting";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";

const Logo: NextPageWithLayout = () => (
  <Page title="Logo">
    <HeaderBreadcrumbs
      heading="Logo & Favicon"
      links={[{ name: "System Configuration" }, { name: "Logo & Favicon" }]}
    />

    <Grid
      container
      spacing={RESPONSIVE_GAP}
    >
      <Grid
        item
        xs={12}
        sm={6}
      >
        <Card>
          <CardHeader
            title="Logo"
            sx={{ bgcolor: "background.neutral" }}
          />
          <CardContent>
            <LogoUpload />
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
      >
        <Card>
          <CardHeader
            title="Full Logo"
            sx={{ bgcolor: "background.neutral" }}
          />
          <CardContent>
            <FullLogoUpload />
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
      >
        <Card>
          <CardHeader
            title="Favicon"
            sx={{ bgcolor: "background.neutral" }}
          />
          <CardContent>
            <FaviconUpload />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Page>
);
Logo.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Logo;
