import { userApi } from "@/utils/api";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
} from "@mui/material";

const NoticeCard = () => {
  const { data, isLoading } = userApi.dashboard.getNotice.useQuery();
  return (
    <Card sx={{ marginTop: 6 }}>
      {isLoading && <LinearProgress />}
      <CardHeader
        sx={{ bgcolor: "error.main", color: "#fff", fontWeight: 900 }}
        title="Notice"
      />
      <CardContent>
        <Box dangerouslySetInnerHTML={{ __html: data ?? "" }} />
      </CardContent>
    </Card>
  );
};

export default NoticeCard;
