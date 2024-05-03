import React from "react";
import { isWeekend } from "../utils";
import { Button, YearDropdown } from ".";

interface CalendarProps {
  currentStartDate: Date;
  isStartCalendar: boolean;
  daysArray: number[];
  selectedRange: Date[];
  selectedDate: Date | null;
  onSelectDate: (date: Date | null) => void;
  handleNextMonth: (val: boolean) => void;
  handlePrevMonth: (val: boolean) => void;
  setCurrentStartDate: (value: React.SetStateAction<Date>) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  currentStartDate,
  isStartCalendar,
  daysArray,
  selectedRange,
  selectedDate,
  onSelectDate,
  handleNextMonth,
  handlePrevMonth,
  setCurrentStartDate,
}) => {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleDateClick = (date: Date) => {
    if (isWeekend(date)) {
      return;
    }
    onSelectDate(date);
  };

  const getPrevMonthDays = (year: number, month: number): number[] => {
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // First day of the current month
    const daysInPrevMonth = new Date(year, month, 0).getDate(); // Total days in the previous month
    const prevMonthDaysArray = Array.from(
      { length: firstDayOfMonth },
      (_, index) => daysInPrevMonth - firstDayOfMonth + index + 1
    );
    return prevMonthDaysArray;
  };

  return (
    <div className="calendar">
      <div className="header">
        <Button onClick={() => handlePrevMonth(isStartCalendar)}>{"<"}</Button>
        <div className="month-year">
          <span>
            {currentStartDate.toLocaleDateString("default", {
              month: "long",
            })}
          </span>
          <YearDropdown
            setCurrentStartDate={setCurrentStartDate}
            currentStartDate={currentStartDate}
          />
        </div>
        <Button onClick={() => handleNextMonth(isStartCalendar)}>{">"}</Button>
      </div>
      <div className="days">
        {dayNames.map((dayName, index) => (
          <div key={index} className="day day-name">
            {dayName}
          </div>
        ))}
        {daysArray.map((day, index) => {
          const date = new Date(
            currentStartDate.getFullYear(),
            currentStartDate.getMonth(),
            day
          );
          const isSelected = date.getTime() === selectedDate?.getTime();
          const isInCurrentMonth =
            date.getMonth() === currentStartDate.getMonth();
          const isInRange =
            isInCurrentMonth &&
            selectedRange.some((d) => d.getTime() === date.getTime());
          const isDisabled = isWeekend(date) || day === -1;
          const classNames = ["day"];
          if (isSelected) classNames.push("selected");
          if (isInRange) classNames.push("in-range");
          if (isDisabled) classNames.push("disabled");
          if (!isInCurrentMonth) classNames.push("empty");

          // Render previous month days in empty slots of next month
          if (!isInCurrentMonth) {
            const prevMonthDays = getPrevMonthDays(
              currentStartDate.getFullYear(),
              currentStartDate.getMonth()
            );
            const prevMonthDay = prevMonthDays[index];
            return (
              <div
                key={index}
                className={`${classNames.join(" ")} dimmed`}
                onClick={() => handleDateClick(date)}
              >
                {prevMonthDay}
              </div>
            );
          }

          return (
            <div
              key={index}
              className={classNames.join(" ")}
              onClick={() => handleDateClick(date)}
            >
              {isInCurrentMonth && day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
