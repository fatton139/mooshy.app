import { format } from "date-fns";

export const formatDate = (date: Date) => format(date, "yyyy-MM-dd hh:mm:ss");
