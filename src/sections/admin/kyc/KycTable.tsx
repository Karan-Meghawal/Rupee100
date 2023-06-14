import DataTable from "@/components/DataTable";
import Iconify from "@/components/Iconify";
import Label from "@/components/Label";
import TableUser from "@/components/TableUser";
import IconifyIcons from "@/IconifyIcons";
import { ADMIN_PATH } from "@/route";
import {
  adminApi,
  type AdminApiInputs,
  type AdminApiOutputs,
} from "@/utils/api";
import { capitalCase, upperCase } from "@/utils/case";
import { fDateTime } from "@/utils/formatTime";
import { Box, IconButton, Typography } from "@mui/material";
import { type Prisma } from "@prisma/client";
import NextLink from "next/link";
import { type GridColKeys } from "~/types";

type Row = AdminApiOutputs["kyc"]["getRecords"]["rows"][number];

type Props = {
  title: string;
  status: AdminApiInputs["kyc"]["getRecords"]["status"];
  sortBy?: Prisma.UserKycScalarFieldEnum;
  pending?: boolean;
};

const KycTable = ({ title, sortBy = "createdAt", pending, status }: Props) => {
  const columns: GridColKeys<Row>[] = [
    {
      field: "user.email",
      headerName: upperCase("user"),
      minWidth: 260,
      flex: 1,
      renderCell: ({
        row: {
          user: { avatar, userId, email, firstName, lastName },
        },
      }) => (
        <TableUser
          avatar={avatar}
          title={`${firstName} ${lastName}`}
          subtitle={email}
          userId={userId}
        />
      ),
    },
    {
      field: "userId",
      headerName: upperCase("username / userId"),
      minWidth: 150,
      flex: 1,
      renderCell({
        row: {
          user: { userName, userId },
        },
      }) {
        return (
          <Box>
            <Typography variant="body2">{userName}</Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
            >
              {userId}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "createdAt",
      headerName: upperCase("requested At"),
      minWidth: 200,
      flex: 1,
      renderCell: ({ row: { createdAt } }) => fDateTime(createdAt),
    },
    {
      field: "status",
      headerName: upperCase("Status"),
      minWidth: 100,
      flex: 1,
      renderCell({ row: { status } }) {
        return (
          <Label
            color={
              (status === "pending" && "warning") ||
              (status === "verified" && "success") ||
              "error"
            }
          >
            {capitalCase(status)}
          </Label>
        );
      },
    },
    {
      field: "id",
      headerName: upperCase("Action"),
      minWidth: 50,
      sortable: false,
      renderCell: ({ row: { id } }) => (
        <IconButton
          LinkComponent={NextLink}
          href={ADMIN_PATH.kyc.view(id)}
        >
          <Iconify icon={IconifyIcons.rightDirectionArrow} />
        </IconButton>
      ),
    },
  ];
  if (!pending) {
    columns.splice(3, 0, {
      field: "updatedAt",
      headerName: upperCase("proceed at"),
      minWidth: 200,
      flex: 1,
      renderCell: ({ row: { updatedAt } }) => fDateTime(updatedAt),
    });
  }
  return (
    <DataTable<Prisma.UserKycScalarFieldEnum>
      title={title}
      query={(options) =>
        adminApi.kyc.getRecords.useQuery({
          status,
          table: options,
        })
      }
      sortModel={[
        {
          field: sortBy,
          sort: pending ? ("asc" as const) : ("desc" as const),
        },
      ]}
      columns={columns}
    />
  );
};

export default KycTable;
