import Page from "@/components/Page";
import Layout from "@/layouts";
import { type NextPageWithLayout } from "@/pages/_app";

const Investment: NextPageWithLayout = () => (
  <Page title="Investment">Investment</Page>
);
Investment.getLayout = (page) => <Layout variant="admin">{page}</Layout>;

export default Investment;
