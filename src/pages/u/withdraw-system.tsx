import Layout from "@/layouts";
import { type NextPageWithLayout } from "../_app";

const WithdrawSystem: NextPageWithLayout = () => <div>WithdrawSystem</div>;
WithdrawSystem.getLayout = (page) => <Layout variant="dashboard">{page}</Layout>;
export default WithdrawSystem;
