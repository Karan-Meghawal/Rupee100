import Label from "@/components/Label";
import { type GenealogyUser } from "@/pages/u/network/genealogy";
import { fDateTime } from "@/utils/formatTime";
import { Box, Stack, Typography } from "@mui/material";
import { capitalCase } from "@/utils/case";
import { type UserWithoutPassword } from "~/types";

type Props = {
  user: UserWithoutPassword | GenealogyUser;
};

const AboutCard = ({ user }: Props) => {
  const {
    userId,
    userName,
    email,
    createdAt,
    referralId,
    status,
    kyc,
    firstName,
    lastName,
    placementId,
    placementSide,
  } = user;
  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="subtitle2">Full Name</Typography>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {firstName} {lastName}
        </Typography>
      </Box>
      <Box>
        <Typography variant="subtitle2">User Id</Typography>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {userId}
        </Typography>
      </Box>
      <Box>
        <Typography variant="subtitle2">Username</Typography>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {userName}
        </Typography>
      </Box>
      <Box>
        <Typography variant="subtitle2">Placement Id</Typography>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {placementId ?? (
            <Typography
              component="span"
              variant="body2"
              color="error.main"
            >
              root
            </Typography>
          )}
        </Typography>
      </Box>
      <Box>
        <Typography variant="subtitle2">Placement Side</Typography>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {placementSide}
        </Typography>
      </Box>
      <Box>
        <Typography variant="subtitle2">Email</Typography>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {email}
        </Typography>
      </Box>
      <Box>
        <Typography variant="subtitle2">Member Since</Typography>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {fDateTime(createdAt)}
        </Typography>
      </Box>
      <Box>
        <Typography variant="subtitle2">Referral Id</Typography>
        <Typography variant="body2">
          {referralId ?? (
            <Typography
              variant="body2"
              component="span"
              color="error.main"
            >
              root
            </Typography>
          )}
        </Typography>
      </Box>
      <Box>
        <Typography variant="subtitle2">Status</Typography>
        <Label color={status === "active" ? "success" : "error"}>
          {capitalCase(status)}
        </Label>
      </Box>
      <Box>
        <Typography variant="subtitle2">Kyc</Typography>
        <Label
          color={
            (kyc === "verified" && "success") ||
            (kyc === "pending" && "warning") ||
            (kyc === "rejected" && "error") ||
            "info"
          }
        >
          {capitalCase(kyc)}
        </Label>
      </Box>
    </Stack>
  );
};

export default AboutCard;
