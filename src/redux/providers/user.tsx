import { userApi } from "@/utils/api";
import { isValidToken } from "@/utils/jwt";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../hook";
import { logout, updateUser, useUserAuth } from "../slices/userAuth";

const UserAuthProvider = () => {
  const { isAuthenticated } = useUserAuth();
  const dispatch = useAppDispatch();
  const isValid = isValidToken();

  const onLogout = useCallback(() => {
    dispatch(logout());
    toast.error("You have logged out");
  }, [dispatch]);

  userApi.profile.getSession.useQuery(undefined, {
    onError: (err) => err.data?.httpStatus === 401 && onLogout(),
    onSuccess: (data) => dispatch(updateUser(data)),
    enabled: isAuthenticated && isValid !== null,
  });

  useEffect(() => {
    const isValid = isValidToken();
    if (isValid === false && isAuthenticated) onLogout();
  }, [isAuthenticated, onLogout]);
  return null;
};

export default UserAuthProvider;
