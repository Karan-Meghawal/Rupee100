import Layout from "@/layouts";
import { type NextPageWithLayout } from "../_app";

const Incomes: NextPageWithLayout = () => <div>Incomes</div>;
Incomes.getLayout = (page) => <Layout variant="dashboard">{page}</Layout>;
export default Incomes;
