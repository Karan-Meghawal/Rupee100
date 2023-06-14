import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layouts";
import { USER_PATH } from "@/route";
import { api } from "@/utils/api";
import { LinearProgress } from "@mui/material";
import { type NextPageWithLayout } from "../_app";
import PlansPage from "../plans";

const Plans: NextPageWithLayout = () => {
  const { data, isLoading } = api.plan.useQuery();

  return (
    <Page title="Plans">
      <HeaderBreadcrumbs
        heading="Plan"
        links={[
          { name: "Dashboard", href: USER_PATH.dashboard },
          { name: "Plan" },
        ]}
      />

      {isLoading && <LinearProgress />}
      {data && (
        <PlansPage
          plans={data}
          head={false}
        />
      )}
    </Page>
  );
};
Plans.getLayout = (page) => <Layout variant="dashboard">{page}</Layout>;
export default Plans;
