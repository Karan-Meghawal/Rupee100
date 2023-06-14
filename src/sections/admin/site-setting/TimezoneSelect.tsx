import { MenuItem } from "@mui/material";
import { RHFSelect } from "../../../components/hook-form";
import { timezones } from "./timezones";

interface Props {
  name: string;
  disabled: boolean;
  label: string;
}

const TimezoneSelect = (props: Props) => (
  <RHFSelect {...props}>
    {timezones.map(({ label, timezone }) => (
      <MenuItem
        key={timezone}
        value={timezone}
      >
        {label}
      </MenuItem>
    ))}
  </RHFSelect>
);
export default TimezoneSelect;
