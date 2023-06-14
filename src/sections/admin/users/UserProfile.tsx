import ApiError from "@/components/ApiError";
import { api } from "@/utils/api";
import { LinearProgress } from "@mui/material";
import { type UserWithoutPassword } from "~/types";
import UserProfileForm from "./UserProfileForm";

type Props = {
  user: UserWithoutPassword;
};

const UserProfile = ({ user }: Props) => {
  const { data, isLoading, error } = api.getKycData.useQuery();

  if (error) return <ApiError error={error} />;
  if (isLoading) return <LinearProgress />;
  return (
    <UserProfileForm
      user={user}
      kycData={data}
    />
  );
};

export default UserProfile;
