import { format, utcToZonedTime } from "date-fns-tz";
import esLocale from "date-fns/locale/es";

export const dateToBlogDateString = (date: string) => {
  return format(utcToZonedTime(date, "America/Santiago"), "dd MMMM, yyyy. O", {
    locale: esLocale,
  });
};
