import React from "react";

interface YearDropdownProps {
  currentStartDate: Date;
  setCurrentStartDate: (value: React.SetStateAction<Date>) => void;
}
export function YearDropdown({
  currentStartDate,
  setCurrentStartDate,
}: YearDropdownProps) {
  return (
    <div className="year-dropdown-container">
      <select
        className="year-dropdown"
        value={currentStartDate.getFullYear()}
        onChange={(e) => {
          setCurrentStartDate(
            new Date(
              parseInt(e.target.value, 10),
              currentStartDate.getMonth(),
              1
            )
          );
        }}
      >
        {Array.from(
          { length: 10 },
          (_, index) => currentStartDate.getFullYear() - 5 + index
        ).map((year) => (
          <option className="year-dropdown-option" key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
