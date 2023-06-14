import {
  type GridFilterModel,
  type GridPaginationModel,
} from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { type GridSortModelZod } from "~/types";

const pageSizeOptions = [10, 25, 50, 100];

interface Props<T extends string> {
  sortModel: GridSortModelZod<T>;
}

export interface DataTableQueryOptions<T extends string> {
  paginationModel: GridPaginationModel;
  sortModel: GridSortModelZod<T>;
  searchFilter: string;
  filterModel: null | GridFilterModel;
}

const useDataTable = <T extends string>(props: Props<T>) => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: pageSizeOptions[0] as number,
    page: 0,
  });
  const [sortModel, setSortModel] = useState(props.sortModel);
  const [filterModel, setFilterModel] = useState<GridFilterModel | null>(null);
  const [searchFilter, setSearchFilter] = useState<string>("");

  const onSortModelChange = (model: GridSortModelZod<T>) => {
    if (JSON.stringify(model) !== JSON.stringify(sortModel)) {
      setSortModel(model);
    }
  };
  const onFilterModelChange = (filter: GridFilterModel) =>
    setFilterModel(filter);

  const onChangeSearchFilter = (value: string) => setSearchFilter(value);

  const queryOptions = useMemo(
    () => ({
      paginationModel,
      setPaginationModel,
      sortModel,
      searchFilter,
      filterModel,
    }),
    [filterModel, paginationModel, searchFilter, sortModel],
  );

  const localeText = {
    MuiTablePagination: {
      labelRowsPerPage: "Rows per page:",
      labelDisplayedRows: ({
        from,
        to,
        count,
      }: {
        from: number;
        to: number;
        count: number;
      }) => `${from} - ${to} of ${count}`,
    },
  };

  return {
    sortModel,
    paginationModel,
    filterModel,
    searchFilter,
    //
    queryOptions,
    localeText,
    pageSizeOptions,
    //
    setPaginationModel,
    onSortModelChange,
    onFilterModelChange,
    onChangeSearchFilter,
  };
};

export default useDataTable;
