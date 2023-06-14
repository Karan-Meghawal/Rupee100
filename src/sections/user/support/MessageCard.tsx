import Image from "@/components/Image";
import { useUserAuth } from "@/redux/slices/userAuth";
import { type UserApiOutputs } from "@/utils/api";
import { fDateTime } from "@/utils/formatTime";
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import GetAvatar from "./GetAvatar";

type Props = UserApiOutputs["support"]["getTicket"]["messages"][number];

const MessageCard = ({ message, files, userId, createdAt, user }: Props) => {
  const { user: authUser } = useUserAuth();
  if (!authUser) return null;
  const isAdmin = authUser.userId !== userId;
  const { avatar, firstName, lastName } = user;
  const displayName = `${firstName} ${lastName}`;

  return (
    <Card sx={{ mb: 4, ...(isAdmin && { ml: 4 }) }}>
      <CardHeader
        avatar={
          <GetAvatar
            avatar={avatar}
            displayName={displayName}
          />
        }
        title={displayName}
        subheader={fDateTime(createdAt)}
        sx={{ pb: 0 }}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {message}
        </Typography>

        <List sx={{ display: "flex" }}>
          {files?.map((src, i) => (
            <ListItem
              component="div"
              key={i}
              sx={{
                p: 0,
                m: 0.5,
                width: 80,
                height: 80,
                borderRadius: 1.25,
                overflow: "hidden",
                position: "relative",
                display: "inline-flex",
                border: (theme) => `solid 1px ${theme.palette.divider}`,
              }}
            >
              <Image
                openOnClick
                alt="image"
                src={src}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default MessageCard;
