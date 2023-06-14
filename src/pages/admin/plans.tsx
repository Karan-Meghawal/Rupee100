import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";

const Plans: NextPageWithLayout = () => <Page title="Plans">Plans</Page>;
Plans.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Plans;
