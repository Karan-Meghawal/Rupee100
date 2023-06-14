import { fDateTime } from "@/utils/formatTime";
import { Alert, AlertTitle, Grid, Stack } from "@mui/material";
import { type UserKyc } from "@prisma/client";
import ApproveButton from "./ApproveButton";
import RejectButton from "./RejectButton";

type Props = UserKyc;

const ProfileKycSection = ({
  createdAt,
  id,
  message,
  status,
  updatedAt,
  userId,
}: Props) => (
  <>
    {status === "pending" && (
      <>
        <Grid
          item
          xs={12}
        >
          <Stack
            justifyContent={"flex-end"}
            direction="row"
            spacing={3}
          >
            <RejectButton id={id} />
            <ApproveButton id={id} />
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Alert severity="warning">
            <AlertTitle>Pending</AlertTitle>
            {userId} requested for kyc verification on {fDateTime(createdAt)}
          </Alert>
        </Grid>
      </>
    )}
    {status === "verified" && (
      <Grid
        item
        xs={12}
      >
        <Alert severity="success">
          <AlertTitle>Verified</AlertTitle>
          Kyc verified on {fDateTime(updatedAt)}
        </Alert>
      </Grid>
    )}
    {status === "rejected" && (
      <Grid
        item
        xs={12}
      >
        <Stack spacing={1}>
          <Alert severity="error">
            <AlertTitle>Rejected</AlertTitle>
            Kyc rejected on {fDateTime(updatedAt)}
          </Alert>
          <Alert severity="info">{message}</Alert>
        </Stack>
      </Grid>
    )}
  </>
);

export default ProfileKycSection;
