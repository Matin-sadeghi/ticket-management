import moment from "moment";

export const relativeTime = (date: number | Date) => {
  date = new Date(date);
  return moment(date, "YYYYMMDD").fromNow();
};
