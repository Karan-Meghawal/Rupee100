import { Card, CardHeader, InputAdornment } from "@mui/material";
import {
  GridToolbar,
  type DataGridProps,
  type GridColDef,
  type GridRenderCellParams,
  type GridRowsProp,
} from "@mui/x-data-grid";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import { type UseQueryResult } from "@tanstack/react-query";
import { type UseTRPCQueryResult } from "@trpc/react-query/shared";
import { useEffect } from "react";
import { type GridSortModelZod } from "~/types";
import useDataTable, {
  type DataTableQueryOptions,
} from "../hooks/useDataTable";
import ApiError from "./ApiError";
import DebouncedInput from "./DebounceInput";
import EmptyContent from "./EmptyContent";
import Iconify from "./Iconify";

export function customRowIndexColumn() {
  return {
    field: "#",
    sortable: false,
    filterable: false,
    maxWidth: 50,
    headerName: "#",
    renderCell: (index: GridRenderCellParams) => {
      const val =
        index.api.getRowIndexRelativeToVisibleRows(index.rowNode.id) + 1;
      return isNaN(val) ? 1 : val;
    },
  };
}

type Output = { rows: { id: string }[]; rowCount: number };

const NoResultsOverlay = () => <EmptyContent title="No Search Results Found" />;
const NoRowsOverlay = () => <EmptyContent title="No Data Found" />;

const DataTable = <T extends string>({
  title,
  subheader,
  columns: dataColumns,
  query,
  sortModel: defaultSortModel,
  ...restProps
}: Omit<DataGridProps, "rows"> & {
  columns: GridColDef[];
  title: React.ReactNode;
  sortModel: GridSortModelZod<T>;
  query: (
    options: DataTableQueryOptions<T>,
  ) => UseTRPCQueryResult<Output, UseQueryResult["error"]>;
  subheader?: string;
}) => {
  const columns = [customRowIndexColumn(), ...dataColumns];
  const {
    sortModel,
    paginationModel,
    pageSizeOptions,
    queryOptions,
    localeText,
    setPaginationModel,
    onSortModelChange,
    onFilterModelChange,
    onChangeSearchFilter,
  } = useDataTable({ sortModel: defaultSortModel });

  const { data, isLoading, isFetching, error } = query(queryOptions);
  const { rows, rowCount }: { rows: GridRowsProp; rowCount: number } = data ?? {
    rows: [],
    rowCount: 0,
  };

  useEffect(() => {
    if (JSON.stringify(sortModel) !== JSON.stringify(defaultSortModel))
      onSortModelChange(defaultSortModel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultSortModel]);

  if (error) return <ApiError error={error} />;
  return (
    <Card>
      <CardHeader
        sx={[
          (theme) => ({
            [theme.breakpoints.down("md")]: {
              "& .MuiCardHeader-action": {
                width: 1,
              },
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 2,
            },
          }),
        ]}
        title={title}
        subheader={subheader}
        action={
          <DebouncedInput
            placeholder="Search..."
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify
                    icon={"eva:search-fill"}
                    sx={{ color: "text.disabled", width: 20, height: 20 }}
                  />
                </InputAdornment>
              ),
            }}
            onChange={onChangeSearchFilter}
            fullWidth
          />
        }
      />
      <DataGridPremium
        getRowId={({ id }: Output["rows"][number]) => id}
        sx={{
          "& .MuiDataGrid-virtualScroller": {
            ...(!rows.length && {
              height: "500px !important",
              pointerEvents: "none",
            }),
          },
        }}
        rows={rows}
        rowCount={rowCount}
        loading={isLoading || isFetching}
        pageSizeOptions={pageSizeOptions}
        pagination
        paginationModel={paginationModel}
        paginationMode="server"
        sortingMode="server"
        filterMode="server"
        onPaginationModelChange={setPaginationModel}
        sortModel={sortModel}
        // todo fix ts error
        // @ts-ignore
        onSortModelChange={onSortModelChange}
        onFilterModelChange={onFilterModelChange}
        columns={columns}
        localeText={localeText}
        autoHeight={true}
        density="comfortable"
        disableRowSelectionOnClick
        disableColumnFilter
        slots={{
          toolbar: GridToolbar,
          noResultsOverlay: NoResultsOverlay,
          noRowsOverlay: NoRowsOverlay,
        }}
        disableAggregation
        {...restProps}
      />
    </Card>
  );
};

export default DataTable;
