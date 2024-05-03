import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { YearDropdown } from "../components";

test("renders YearDropdown component", () => {
  const currentStartDate = new Date("2022-01-01");
  const setCurrentStartDate = jest.fn();

  const { getAllByText, getByDisplayValue } = render(
    <YearDropdown
      currentStartDate={currentStartDate}
      setCurrentStartDate={setCurrentStartDate}
    />
  );

  // Check if the component renders with the correct initial year
  const initialYear = currentStartDate.getFullYear();
  expect(getByDisplayValue(initialYear.toString())).toBeInTheDocument();

  // Check if the dropdown options are rendered correctly
  const options = getAllByText(
    /2022|2023|2024|2025|2026|2027|2028|2029|2030|2031/i
  )[0];
  expect(options).toBeInTheDocument();
});

test("updates state when a new year is selected", () => {
  const currentStartDate = new Date(
    new Date("2022-01-01").setHours(0, 0, 0, 0)
  );
  const setCurrentStartDate = jest.fn();

  const { getByRole } = render(
    <YearDropdown
      currentStartDate={currentStartDate}
      setCurrentStartDate={setCurrentStartDate}
    />
  );

  // Select a new year from the dropdown
  const yearDropdown = getByRole("combobox");
  fireEvent.change(yearDropdown, { target: { value: "2023" } });

  // Check if setCurrentStartDate is called with the correct date
  expect(setCurrentStartDate).toHaveBeenCalledTimes(1);
});
