import Iconify from "@/components/Iconify";
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
import AddHomeServiceButton from "./service/AddServiceButton";
import DeleteServiceButton from "./service/DeleteServiceButton";
import UpdateServiceButton from "./service/UpdateServiceButton";

const Services = () => {
  const { data, isLoading } = adminApi.pages.home.getRecord.useQuery();
  const records = data?.services ?? [];

  return (
    <Card>
      {isLoading && <LinearProgress />}
      <CardHeader
        sx={{ bgcolor: "background.neutral" }}
        title="Services"
        action={<AddHomeServiceButton />}
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
              {records?.map((service, index) => (
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
                        <Iconify
                          color="primary.main"
                          icon={service.icon}
                        />
                      </Box>
                      <Stack
                        flexShrink={800}
                        spacing={1}
                      >
                        <Typography variant="subtitle2">
                          {service.heading}
                        </Typography>
                        <Typography
                          sx={{
                            wordBreak: "break-all",
                          }}
                          variant="body2"
                        >
                          {service.description}
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row">
                      <UpdateServiceButton editData={service} />
                      <DeleteServiceButton id={service.id} />
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

export default Services;
