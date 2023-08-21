import { tokens } from "../theme";

export const setColorForTicketStatus = (status: "SEEN" | "UNSEEN" | "ANSWERED") => {
  const theme = "dark";
  const colors = tokens(theme);
  if (status === "ANSWERED") return colors.blueAccent[800];
  if (status === "SEEN") return colors.redAccent[600];
  if (status === "UNSEEN") return colors.grey[500];
};
