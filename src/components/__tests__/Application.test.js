import React from "react";

import { 
  render,
  cleanup, 
  waitForElement, 
  fireEvent, 
  getByText,
  queryByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText 
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

// it("defaults to Monday and changes the schedule when a new day is selected", async () => {
//   const { getByText } = render(<Application />);

//   await waitForElement(() => getByText("Monday"));
// });
describe("Application", () => {

it("changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(()=> getByText("Monday"));

  
  fireEvent.click(getByText("Tuesday"));
 
  
  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});

it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { debug, container } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));
  
  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];
  
  fireEvent.click(getByAltText(appointment, "Add"));
  
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
  fireEvent.click(getByText(appointment, "Save"));
  
  debug()
  
  expect(getByText(appointment, "SAVING")).toBeInTheDocument();
  
  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  
  expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  
});

})