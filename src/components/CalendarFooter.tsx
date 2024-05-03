import React from "react";
import { getCustomRange } from "../utils";
import { Button } from ".";
import { CUSTOM_RANGE } from "../utils/constants";

interface CalendarFooterProps {
  onSelectDateRange: (start: Date, end: Date) => void;
}

export const CalendarFooter: React.FC<CalendarFooterProps> = ({
  onSelectDateRange,
}) => {
  const handleCustomRange = (range: CUSTOM_RANGE) => {
    const { startDate, endDate } = getCustomRange(range);
    onSelectDateRange(startDate, endDate);
  };

  return (
    <div className="calendar-footer">
      <Button onClick={() => handleCustomRange(CUSTOM_RANGE.LAST_7)}>
        Last 7 Days
      </Button>
      <Button onClick={() => handleCustomRange(CUSTOM_RANGE.LAST_30)}>
        Last 30 Days
      </Button>
    </div>
  );
};
