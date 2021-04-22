import React from "react";
import axios from "axios";

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
  queryByAltText,
  getByPlaceholderText 
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(()=> getByText("Monday"));

    
    fireEvent.click(getByText("Tuesday"));
  
    
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    
    fireEvent.click(getByAltText(appointment, "Add"));
    
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    fireEvent.click(getByText(appointment, "Save"));
    
    
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();
    
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
      );
      
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
      
  });


  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(appt => queryByText(appt, "Archie Cohen"))
    // console.log(prettyDOM(appointment))

    fireEvent.click(queryByAltText(appointment, "Delete"));
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Confirm")).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "DELETING")).toBeInTheDocument();
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => queryByAltText(appointment, "Add"));
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

  });


  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Gets appt matching Archie Cohen
    const appointment = getAllByTestId(container, "appointment").find(appt => queryByText(appt, "Archie Cohen"))
    // 4. Click the "Edit" button on the booked appointment.
    fireEvent.click(queryByAltText(appointment, "Edit"));
    // 5. Checks content of input
    // expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();
    // 6. Input different selection
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Jane" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // 7. Click Save
    fireEvent.click(getByText(appointment, "Save"));

    // 8. Wait for name to change
    await waitForElement(() => getByText(container, "Jane"));

    // 9. Check if spots stayed the same

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

  });

  it("shows the save error when failing to save an appointment", async() => {
    axios.put.mockRejectedValueOnce();

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    
    fireEvent.click(getByAltText(appointment, "Add"));
    
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    fireEvent.click(getByText(appointment, "Save"));

    
    await waitForElement(() => (appointment, "Could not save message. Please try again."));
    
    expect(getByText(appointment, "Error")).toBeInTheDocument();
    
    
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.put.mockRejectedValueOnce();
    // 1. Render the Application.
    const { container } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(appt => queryByText(appt, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Delete"));
    fireEvent.click(getByText(appointment, "Confirm"));


    await waitForElement(() => (appointment, "Could not delete message. Please try again."));
    
  });


})