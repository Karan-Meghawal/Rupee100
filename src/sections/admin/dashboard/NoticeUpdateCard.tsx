import { adminApi } from "@/utils/api";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
} from "@mui/material";
import NoticeUpdateForm from "./NoticeUpdateForm";

const NoticeUpdateCard = () => {
  const { data, isLoading } = adminApi.dashboard.getNotice.useQuery();

  return (
    <Card sx={{ marginTop: 6 }}>
      {isLoading && <LinearProgress />}
      <CardHeader
        sx={{ bgcolor: "error.main", color: "#fff" }}
        title="Notice"
        action={!data ? undefined : <NoticeUpdateForm data={data} />}
      />
      <CardContent>
        <Box dangerouslySetInnerHTML={{ __html: data ?? "" }} />
      </CardContent>
    </Card>
  );
};

export default NoticeUpdateCard;
