import { userApi } from "@/utils/api";
import { Alert, AlertTitle } from "@mui/material";

const ProfileKycStatus = () => {
  const { data } = userApi.profile.getLastKyc.useQuery();
  return data?.status === "rejected" ? (
    <Alert
      sx={{ mb: 2 }}
      severity="error"
    >
      <AlertTitle>Kyc Rejected</AlertTitle>
      {data?.message}
    </Alert>
  ) : null;
};

export default ProfileKycStatus;
