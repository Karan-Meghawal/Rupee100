import { useAppDispatch } from "@/redux/hook";
import { useConfiguration } from "@/redux/slices/configuration";
import { updateKyc, useUserAuth } from "@/redux/slices/userAuth";
import { userApi } from "@/utils/api";
import { LoadingButton } from "@mui/lab";
import { Card, CardContent, CardHeader } from "@mui/material";
import AboutCard from "./AboutCard";

const ProfileAbout = () => {
  const dispatch = useAppDispatch();
  const { user } = useUserAuth();
  const {
    configuration: { kycVerification },
  } = useConfiguration();

  const { kyc } = user!;
  const { mutate, isLoading: isMutating } =
    userApi.profile.verifyKyc.useMutation();

  const handleClick = () =>
    mutate(undefined, {
      onSuccess({ kyc }) {
        dispatch(updateKyc(kyc));
      },
    });

  if (!user) return null;
  return (
    <Card>
      <CardHeader
        title="About"
        sx={{
          bgcolor: "background.neutral",
        }}
      />
      <CardContent>
        <AboutCard user={user} />
        {kycVerification && (kyc === "rejected" || kyc === "unverified") && (
          <LoadingButton
            onClick={handleClick}
            loading={isMutating}
            variant="text"
            sx={{ mt: 1 }}
          >
            Verify Kyc
          </LoadingButton>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileAbout;
