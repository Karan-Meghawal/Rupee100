import Layout from "@/layouts";
import { useUserAuth } from "@/redux/slices/userAuth";
import { getReferralLink } from "@/utils/fns";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { USER_PATH } from "@/route";
import { type NextPageWithLayout } from "../_app";

const AddMember: NextPageWithLayout = () => {
  const router = useRouter();
  const { user } = useUserAuth();

  useEffect(() => {
    if (user) {
      const { userId } = user;
      const link = getReferralLink(userId);
      void router.push(link);
    } else {
      void router.push(USER_PATH.login);
    }
  }, [router, user]);

  return null;
};
AddMember.getLayout = (page) => <Layout variant="dashboard">{page}</Layout>;
export default AddMember;
