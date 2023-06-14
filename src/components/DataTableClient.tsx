import { Card, CardHeader } from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridSortModel,
} from "@mui/x-data-grid";
import { type UseQueryResult } from "@tanstack/react-query";
import { type UseTRPCQueryResult } from "@trpc/react-query/shared";
import useDataTable from "../hooks/useDataTable";
import ApiError from "./ApiError";
import { customRowIndexColumn } from "./DataTable";
import EmptyContent from "./EmptyContent";

const NoResultsOverlay = () => <EmptyContent title="No Search Results Found" />;
const NoRowsOverlay = () => <EmptyContent title="No Data Found" />;
type Output = { id: string }[];

const DataTableClient = ({
  title,
  action,
  subheader,
  columns: dataColumns,
  query,
  sortModel: defaultSortModel,
}: {
  columns: GridColDef[];
  title: React.ReactNode;
  sortModel: GridSortModel;
  query: () => UseTRPCQueryResult<Output, UseQueryResult["error"]>;
  subheader?: string;
  action?: React.ReactNode;
}) => {
  const columns = [customRowIndexColumn(), ...dataColumns];
  const {
    sortModel,
    paginationModel,
    pageSizeOptions,
    localeText,
    onSortModelChange,
    onFilterModelChange,
  } = useDataTable({ sortModel: defaultSortModel });

  const { data, isFetching, error } = query();
  const rows = data ?? [];

  if (error) return <ApiError error={error} />;
  return (
    <Card>
      <CardHeader
        title={title}
        subheader={subheader}
        action={action}
      />
      <DataGrid
        sx={{
          "& .MuiDataGrid-virtualScroller": {
            ...(!rows.length && {
              height: "500px !important",
              pointerEvents: "none",
            }),
          },
        }}
        components={{ NoRowsOverlay, NoResultsOverlay }}
        getRowId={({ id }: Output[number]) => id}
        rows={rows}
        loading={isFetching}
        pageSizeOptions={pageSizeOptions}
        pagination
        paginationModel={paginationModel}
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
        onFilterModelChange={onFilterModelChange}
        columns={columns}
        localeText={localeText}
        autoHeight={true}
        density="comfortable"
        disableRowSelectionOnClick
      />
    </Card>
  );
};

export default DataTableClient;
