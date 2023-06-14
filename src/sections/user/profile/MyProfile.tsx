import ApiError from "@/components/ApiError";
import { api } from "@/utils/api";
import { LinearProgress } from "@mui/material";
import MyProfileForm from "./MyProfileForm";

const MyProfile = () => {
  const { data, isLoading, error } = api.getKycData.useQuery();

  if (error) return <ApiError error={error} />;
  if (isLoading) return <LinearProgress />;
  return <MyProfileForm kycData={data} />;
};

export default MyProfile;
