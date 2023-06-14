import Layout from "@/layouts";
import { type NextPageWithLayout } from "../_app";

const Setting: NextPageWithLayout = () => <div>Setting</div>;
Setting.getLayout = (page) => <Layout variant="dashboard">{page}</Layout>;
export default Setting;
