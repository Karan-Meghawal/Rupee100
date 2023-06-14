import { userApi, type UserApiOutputs } from "@/utils/api";
import { capitalCase, upperCase } from "@/utils/case";
import { Box, Tooltip } from "@mui/material";
import { type GridColKeys } from "~/types";
import DataTable from "../../../components/DataTable";
import Iconify from "../../../components/Iconify";
import { fDateTime } from "../../../utils/formatTime";
import LoginSessionRemove from "./LoginSessionRemove";
import LogoutAll from "./LogoutAll";

type Row = UserApiOutputs["profile"]["getLoginSessions"]["rows"][number];

const LoginSessions = () => {
  const columns: GridColKeys<Row>[] = [
    {
      field: "region",
      headerName: upperCase("location"),
      minWidth: 200,
      flex: 1,
      renderCell: ({ row: { region, city, country } }) => (
        <Tooltip title={[region, city, country].join(" - ")}>
          <Box>{[region, city, country].join(" - ")}</Box>
        </Tooltip>
      ),
    },
    {
      field: "browser",
      headerName: upperCase("device"),
      minWidth: 300,
      flex: 1,
      renderCell: ({ row: { browser, os } }) => [browser, os].join(" - "),
    },
    { field: "ip", headerName: upperCase("ip"), minWidth: 150, flex: 1 },
    {
      field: "createdAt",
      headerName: upperCase("time"),
      minWidth: 200,
      flex: 1,
      filterable: false,
      renderCell: ({ row: { createdAt } }) => fDateTime(createdAt),
    },
    {
      field: "status",
      headerName: upperCase("session"),
      minWidth: 50,
      flex: 0.5,
      renderCell: ({ row: { status } }) => (
        <Tooltip title={capitalCase(status)}>
          <Box>
            <Iconify
              color={`${status === "active" ? "success" : "error"}.main`}
              sx={{ fontSize: 24 }}
              icon={
                status === "active"
                  ? "lucide:check-circle"
                  : "ri:close-circle-line"
              }
            />
          </Box>
        </Tooltip>
      ),
    },
    {
      field: "id",
      headerName: upperCase("action"),
      maxWidth: 100,
      minWidth: 100,
      sortable: false,
      flex: 1,
      renderCell: ({ row: { id, status } }) =>
        status === "active" ? (
          <LoginSessionRemove id={id} />
        ) : (
          <Box>{capitalCase(status)}</Box>
        ),
    },
  ];
  return (
    <DataTable
      title={
        <Box>
          Login Sessions
          <LogoutAll />
        </Box>
      }
      query={(options) => userApi.profile.getLoginSessions.useQuery(options)}
      sortModel={[
        {
          field: "createdAt",
          sort: "desc" as const,
        },
      ]}
      columns={columns}
    />
  );
};

export default LoginSessions;
