import Iconify from "@/components/Iconify";
import {
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { getMonth, getYear, setMonth, setYear } from "date-fns";
import React from "react";

interface HeaderProps {
  date: Date;
  // eslint-disable-next-line no-unused-vars
  setDate: (date: Date) => void;
  nextDisabled: boolean;
  prevDisabled: boolean;
  onClickNext: () => void;
  onClickPrevious: () => void;
  locale?: Locale;
}

const generateYears = (relativeTo: Date, count: number) => {
  const half = Math.floor(count / 2);
  return Array(count)
    .fill(0)
    .map((_y, i) => relativeTo.getFullYear() - half + i); // TODO: make part of the state
};

const Header: React.FunctionComponent<HeaderProps> = ({
  date,
  setDate,
  nextDisabled,
  prevDisabled,
  onClickNext,
  onClickPrevious,
  locale,
}: HeaderProps) => {
  const MONTHS =
    typeof locale !== "undefined"
      ? [...Array(12).keys()].map((d) =>
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          locale.localize?.month(d, {
            width: "abbreviated",
            context: "standalone",
          }),
        )
      : [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "June",
          "July",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
        ];

  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    setDate(setMonth(date, parseInt(event.target.value as string, 10)));
  };

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setDate(setYear(date, parseInt(event.target.value as string, 10)));
  };

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid
        item
        sx={{ padding: "5px" }}
      >
        <IconButton
          sx={{
            padding: "10px",
            "&:hover": {
              background: "none",
            },
          }}
          disabled={prevDisabled}
          onClick={onClickPrevious}
          // size="large"
        >
          <Iconify
            icon="iconamoon:arrow-left-2-duotone"
            color={prevDisabled ? "disabled" : "action"}
          />
        </IconButton>
      </Grid>
      <Grid item>
        <FormControl variant="standard">
          <Select
            value={getMonth(date)}
            onChange={handleMonthChange}
            MenuProps={{ disablePortal: true }}
          >
            {MONTHS.map((month, idx) => (
              <MenuItem
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                key={month}
                value={idx}
              >
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item>
        <FormControl variant="standard">
          <Select
            value={getYear(date)}
            onChange={handleYearChange}
            MenuProps={{ disablePortal: true }}
          >
            {generateYears(date, 30).map((year) => (
              <MenuItem
                key={year}
                value={year}
              >
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* <Typography>{format(date, "MMMM YYYY")}</Typography> */}
      </Grid>
      <Grid
        item
        sx={{ padding: "5px" }}
      >
        <IconButton
          sx={{
            padding: "10px",
            "&:hover": {
              background: "none",
            },
          }}
          disabled={nextDisabled}
          onClick={onClickNext}
          // size="large"
        >
          <Iconify
            icon="iconamoon:arrow-right-2-duotone"
            color={nextDisabled ? "disabled" : "action"}
          />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Header;
