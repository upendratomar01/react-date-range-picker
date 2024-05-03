import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

test("renders Date Range Picker header", () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(/Date Range Picker/i);
  expect(headerElement).toBeInTheDocument();
});

test("selects date range and displays selected range and weekends", async () => {
  const { getByText, getAllByText, getByTestId } = render(<App />);

  // Click the custom date picker to open it
  fireEvent.click(getByTestId("rangeInput"));

  // Wait for the date picker to be visible
  await waitFor(() => getByText("Select date range"));

  // Select a date range by clicking on specific dates
  fireEvent.click(getAllByText("10")[0]);
  fireEvent.click(getAllByText("15")[1]);

  fireEvent.click(getByTestId("submitBtn"));
  // Check if the selected range and weekends are displayed correctly
  expect(getByText("Start Date: 2024-04-10")).toBeInTheDocument();
  expect(getByText("End Date: 2024-05-15")).toBeInTheDocument();
  expect(getByText("Weekend: 2024-04-20")).toBeInTheDocument();
  expect(getByText("Weekend: 2024-04-13")).toBeInTheDocument();
});
