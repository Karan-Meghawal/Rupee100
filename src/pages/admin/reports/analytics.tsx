import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import { RESPONSIVE_GAP } from "@/config";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";
import { AnalyticGraph } from "@/sections/admin/analytics";
import { adminApi } from "@/utils/api";
import { Grid } from "@mui/material";

const Analytics: NextPageWithLayout = () => (
  <Page title="Analytics">
    <HeaderBreadcrumbs
      heading="Analytics"
      links={[{ name: "Reports" }, { name: "Analytics" }]}
    />
    <Grid
      container
      spacing={RESPONSIVE_GAP}
    >
      <Grid
        item
        xs={12}
      >
        <AnalyticGraph
          title={"Registrations"}
          query={(data) =>
            adminApi.report.analytics.useQuery({
              event: "registration",
              ...data,
            })
          }
        />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <AnalyticGraph
          title={"Deposits"}
          query={(data) =>
            adminApi.report.analytics.useQuery({
              event: "deposit",
              ...data,
            })
          }
          isCurrency
        />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <AnalyticGraph
          title={"Withdraw"}
          query={(data) =>
            adminApi.report.analytics.useQuery({
              event: "withdraw",
              ...data,
            })
          }
          isCurrency
        />
      </Grid>
    </Grid>
  </Page>
);
Analytics.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Analytics;
