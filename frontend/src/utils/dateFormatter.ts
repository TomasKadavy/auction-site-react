import { format } from "date-fns";
import { DATE_FORMAT } from "../constants/constants";

export function formatDate(date: Date) {
  return format(new Date(date + "Z"), DATE_FORMAT);
}

export function dateWithinBoundaries(
  dateToCheck: Date,
  startTime: Date,
  endTime: Date
) {
  const date = new Date(dateToCheck);
  return date < new Date(endTime + "Z") && date > new Date(startTime + "Z");
}

export function toBackendDateFormat(date: string | Date) {
  return new Date(date).toISOString().slice(0, -1);
}
