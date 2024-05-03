import React, { useEffect, useRef, useState } from "react";
import Calendar from "./Calendar";
import {
  formatDate,
  getDaysArray,
  getWeekendsInRange,
  isDateOlder,
  isWeekend,
} from "../utils";
import { Button, CalendarFooter } from ".";
import "./CustomDatePicker.css";

interface CustomDatePickerProps {
  onSelectDateRange: (range: string[][]) => void;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  onSelectDateRange,
}) => {
  const today = new Date();
  const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const [showCalendars, setShowCalendars] = useState<boolean>(false);
  const [currentStartDate, setCurrentStartDate] = useState<Date>(prevMonth);
  const [currentEndDate, setCurrentEndDate] = useState<Date>(new Date());
  const calendarsRef = useRef<HTMLDivElement>(null);

  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const handleSelectStartDate = (date: Date | null) => {
    setSelectedStartDate(date);
  };

  const handleSelectEndDate = (date: Date | null) => {
    if (date) {
      if (selectedStartDate && isDateOlder(date, selectedStartDate)) {
        setSelectedEndDate(selectedStartDate);
        setSelectedStartDate(date);
      } else {
        setSelectedEndDate(date);
      }
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      calendarsRef.current &&
      !calendarsRef.current.contains(event.target as Node)
    ) {
      setShowCalendars(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePrevMonth = (isStartCalendar: boolean) => {
    if (isStartCalendar) {
      setCurrentStartDate(
        new Date(
          currentStartDate.getFullYear(),
          currentStartDate.getMonth() - 1,
          1
        )
      );
    } else {
      setCurrentEndDate(
        new Date(currentEndDate.getFullYear(), currentEndDate.getMonth() - 1, 1)
      );
    }
  };

  const handleNextMonth = (isStartCalendar: boolean) => {
    if (isStartCalendar) {
      setCurrentStartDate(
        new Date(
          currentStartDate.getFullYear(),
          currentStartDate.getMonth() + 1,
          1
        )
      );
    } else {
      setCurrentEndDate(
        new Date(currentEndDate.getFullYear(), currentEndDate.getMonth() + 1, 1)
      );
    }
  };

  const startDaysArray = getDaysArray(
    currentStartDate.getFullYear(),
    currentStartDate.getMonth()
  );
  const endDaysArray = getDaysArray(
    currentEndDate.getFullYear(),
    currentEndDate.getMonth()
  );

  // Calculate selected range
  const selectedRange: Date[] = [];
  if (selectedStartDate && selectedEndDate) {
    const currentDate = new Date(selectedStartDate);
    while (currentDate <= selectedEndDate) {
      if (!isWeekend(currentDate)) {
        selectedRange.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  const onSelectedDateRange = (start: Date, end: Date) => {
    handleSelectEndDate(end);
    handleSelectStartDate(start);
  };

  const handleSubmit = () => {
    if (selectedStartDate && selectedEndDate) {
      const range = [
        formatDate(selectedStartDate),
        formatDate(selectedEndDate),
      ];
      const weekEnds = getWeekendsInRange(selectedStartDate, selectedEndDate);
      onSelectDateRange([range, weekEnds]);
      setShowCalendars(false);
    }
  };

  return (
    <div className="custom-date-picker" ref={calendarsRef}>
      <div
        className="input-container"
        onClick={() => setShowCalendars(!showCalendars)}
      >
        <input
          type="text"
          data-testid="rangeInput"
          readOnly
          value={
            selectedStartDate && selectedEndDate
              ? `${selectedStartDate.toLocaleDateString()} - ${selectedEndDate.toLocaleDateString()}`
              : "Select date range"
          }
        />
        <span className="icon">&#x25B6;</span>
      </div>
      {showCalendars && (
        <div className="wrapper">
          <p className="selected-range-label">
            {selectedStartDate && selectedEndDate
              ? `${selectedStartDate.toLocaleDateString()} - ${selectedEndDate.toLocaleDateString()}`
              : "Select date range"}
          </p>
          <hr className="hr-horizontal" />
          <div className="calendars-container">
            <Calendar
              key={1}
              currentStartDate={currentStartDate}
              isStartCalendar={true}
              daysArray={startDaysArray}
              selectedRange={selectedRange}
              selectedDate={selectedStartDate}
              onSelectDate={handleSelectStartDate}
              handleNextMonth={handleNextMonth}
              handlePrevMonth={handlePrevMonth}
              setCurrentStartDate={setCurrentStartDate}
            />
            <hr className="hr-vertical" />
            <Calendar
              key={2}
              currentStartDate={currentEndDate}
              isStartCalendar={false}
              daysArray={endDaysArray}
              selectedRange={selectedRange}
              selectedDate={selectedEndDate}
              onSelectDate={handleSelectEndDate}
              handleNextMonth={handleNextMonth}
              handlePrevMonth={handlePrevMonth}
              setCurrentStartDate={setCurrentEndDate}
            />
          </div>
          <div className="calendar-footer-wrapper">
            <CalendarFooter onSelectDateRange={onSelectedDateRange} />
            <Button
              data-testid="submitBtn"
              disabled={!selectedStartDate || !selectedEndDate}
              onClick={handleSubmit}
            >
              Go
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
