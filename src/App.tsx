import React, { useState } from "react";
import { CustomDatePicker } from "./components";
import "./App.css";

const App: React.FC = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [weekEnds, setWeekEnds] = useState<string[]>([]);

  const handleResponseRange = (range: string[][]) => {
    const [selectedrange, weekEnds] = range;
    const [start, end] = selectedrange;
    setWeekEnds(weekEnds);
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="container">
      <h1>Date Range Picker</h1>

      <div className="date-picker-container">
        <CustomDatePicker onSelectDateRange={handleResponseRange} />
      </div>

      <div className="selected-range">
        <h3>Selected Range:</h3>
        <p>Start Date: {startDate}</p>
        <p>End Date: {endDate}</p>
      </div>

      <div className="weekends-container">
        <h3>Weekends:</h3>
        {weekEnds.map((d, index) => (
          <p key={index} className="weekend">
            Weekend: {d}
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;
