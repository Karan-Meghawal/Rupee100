import { format, formatDistanceToNow, getTime } from "date-fns";

// ----------------------------------------------------------------------

export function fDatePicker(date: string | Date) {
  return format(new Date(date), "dd/MM/yyyy");
}
export function fDate(date: string | Date) {
  return format(new Date(date), "dd MMM yyyy");
}

export function fDateTime(date: string | Date) {
  if (!date) return "-";
  return format(new Date(date), "dd MMM yyyy HH:mm:ss");
}

export function fDateToUtc(dateString: string | Date) {
  const utc = new Date(new Date(dateString).toUTCString().substring(0, 25));
  return format(utc, "yyyy-MM-dd HH:mm:ss");
}

export function fTimestamp(date: string | Date) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date: string | Date) {
  return format(new Date(date), "dd/MM/yyyy hh:mm p");
}

export function fToNow(date: string | Date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}
