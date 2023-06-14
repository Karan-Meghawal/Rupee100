import {
  DateRangePicker,
  type DateRange,
} from "@/components/date-range-picker";
import { Box, Card, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Iconify from "../../../components/Iconify";
import { fDate } from "../../../utils/formatTime";

type Props = {
  startDate: Date;
  endDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  initialEndDate: Date;
  initialStartDate: Date;
};

const AnalyticsDateRange = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  initialEndDate,
  initialStartDate,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate,
    endDate,
  });
  const { startDate: start, endDate: end } = dateRange;
  const toggle = () => setOpen(!open);
  const startDateTime = fDate(startDate);
  const endDateTime = fDate(endDate);

  useEffect(() => {
    if (start) setStartDate(start);
    if (end) setEndDate(end);
  }, [start, end, setStartDate, setEndDate]);

  return (
    <Box>
      <Card
        onClick={toggle}
        sx={{
          cursor: "pointer",
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? "grey.200" : "grey.900",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 2 }}
        >
          <Typography>
            {startDateTime} - {endDateTime}
          </Typography>
          <Iconify
            sx={{ width: 30 }}
            icon="uim:calender"
          />
        </Stack>
      </Card>
      <Box sx={{ position: "absolute", right: 0 }}>
        <DateRangePicker
          initialDateRange={{
            startDate: initialStartDate,
            endDate: initialEndDate,
          }}
          open={open}
          toggle={toggle}
          onChange={(range) => setDateRange(range)}
        />
      </Box>
    </Box>
  );
};

export default AnalyticsDateRange;
