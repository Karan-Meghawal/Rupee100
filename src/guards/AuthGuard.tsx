import Login from "@/pages/login";
import { useUserAuth } from "@/redux/slices/userAuth";
import { NoSsr } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

const AuthGuard = ({ children }: Props) => {
  const { isAuthenticated } = useUserAuth();
  if (!isAuthenticated) {
    return (
      <NoSsr>
        <Login />
      </NoSsr>
    );
  }
  return <>{children}</>;
};

export default AuthGuard;
