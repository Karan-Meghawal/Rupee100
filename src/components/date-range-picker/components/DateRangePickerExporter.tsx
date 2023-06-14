import React from "react";
import DateRangePickerWrapper, {
  type DateRangePickerWrapperProps,
} from "./DateRangePickerWrapper";

const DateRangePickerExporter: React.FunctionComponent<
  DateRangePickerWrapperProps
> = (props: DateRangePickerWrapperProps) => (
  <DateRangePickerWrapper {...props} />
);

export default DateRangePickerExporter;
