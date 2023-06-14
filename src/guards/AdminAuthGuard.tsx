import Login from "@/pages/admin/login";
import { useAdminAuth } from "@/redux/slices/adminAuth";
import { NoSsr } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

const AdminAuthGuard = ({ children }: Props) => {
  const { isAuthenticated } = useAdminAuth();
  if (!isAuthenticated) {
    return (
      <NoSsr>
        <Login />
      </NoSsr>
    );
  }

  return <>{children}</>;
};

export default AdminAuthGuard;
