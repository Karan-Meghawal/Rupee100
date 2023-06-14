import Page from "@/components/Page";
import { useAdminAuth } from "@/redux/slices/adminAuth";
import { ADMIN_PATH } from "@/route";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AdminHome = () => {
  const router = useRouter();
  const { isAuthenticated } = useAdminAuth();

  useEffect(() => {
    if (isAuthenticated) {
      void router.replace(ADMIN_PATH.dashboard);
    } else {
      void router.replace(ADMIN_PATH.login);
    }
  }, [isAuthenticated, router]);

  return <Page title="Admin">
    
  </Page>;
};

export default AdminHome;
