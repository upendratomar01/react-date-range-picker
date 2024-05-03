import { CUSTOM_RANGE } from "./constants";

export const isWeekend = (date: Date): boolean => {
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6; // Sunday = 0, Saturday = 6
};

export const getDaysArray = (year: number, month: number): number[] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // Starting day of the month (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const daysArray = Array.from(
    { length: daysInMonth + firstDayOfMonth },
    (_, index) => (index < firstDayOfMonth ? -1 : index - firstDayOfMonth + 1)
  );
  return daysArray;
};

export const compareDates = (date1: Date, date2: Date): number => {
  // Get the year, month, and day of each date
  const year1 = date1.getFullYear();
  const month1 = date1.getMonth();
  const day1 = date1.getDate();

  const year2 = date2.getFullYear();
  const month2 = date2.getMonth();
  const day2 = date2.getDate();

  if (year1 !== year2) {
    return year1 - year2;
  }
  if (month1 !== month2) {
    return month1 - month2;
  }
  return day1 - day2;
};

export const isDateOlder = (date1: Date, date2: Date): boolean => {
  return compareDates(date1, date2) < 0;
};

export const getCustomRange = (range: CUSTOM_RANGE) => {
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date();
  endDate.setHours(0, 0, 0, 0);
  switch (range) {
    case CUSTOM_RANGE.LAST_7:
      startDate.setDate(startDate.getDate() - 6);
      break;
    case CUSTOM_RANGE.LAST_30:
      startDate.setDate(startDate.getDate() - 29);
      break;
  }
  return { startDate, endDate };
};

export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because January is 0
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getWeekendsInRange = (
  startDate: Date,
  endDate: Date
): string[] => {
  const weekends: string[] = [];
  const currentDate = new Date(startDate);
  // Loop through each day in the range
  while (currentDate <= endDate) {
    // Check if the current day is a weekend (Saturday or Sunday)
    if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
      // Format the date as 'YYYY-MM-DD' and add it to the array
      const formattedDate = formatDate(currentDate);
      weekends.push(formattedDate);
    }
    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
  }

  return weekends;
};
