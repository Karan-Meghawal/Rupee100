import Image from "@/components/Image";
import { adminApi } from "@/utils/api";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  alpha,
} from "@mui/material";
import AddHowItWorkButton from "./how-it-works/AddHowItWorkButton";
import DeleteHowItWorkButton from "./how-it-works/DeleteHowItWorkButton";
import UpdateHowItWorkButton from "./how-it-works/UpdateHowItWorkButton";

const HowItWorks = () => {
  const { data, isLoading } = adminApi.pages.home.getRecord.useQuery();
  const records = data?.howItWork ?? [];

  return (
    <Card>
      {isLoading && <LinearProgress />}
      <CardHeader
        sx={{ bgcolor: "background.neutral" }}
        title="How It Works"
        action={<AddHowItWorkButton />}
      />
      <CardContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ boxShadow: "none !important" }}>
                  Service
                </TableCell>
                <TableCell sx={{ boxShadow: "none !important" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records?.map((record, index) => (
                <TableRow key={index}>
                  <TableCell
                    component="th"
                    scope="row"
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, 0.1),
                          borderRadius: 999,
                          display: "grid",
                          placeItems: "center",
                          mr: 2,
                        }}
                      >
                        <Image
                          alt={record.heading}
                          src={record.image}
                        />
                      </Box>
                      <Stack
                        flexShrink={800}
                        spacing={1}
                      >
                        <Typography variant="subtitle2">
                          {record.heading}
                        </Typography>
                        <Typography
                          sx={{
                            wordBreak: "break-all",
                          }}
                          variant="body2"
                        >
                          {record.description}
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row">
                      <UpdateHowItWorkButton editData={record} />
                      <DeleteHowItWorkButton id={record.id} />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default HowItWorks;
