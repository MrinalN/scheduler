// const { should } = require("chai");

describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset")
    // Visits the root of our web server
    cy.visit("/");
    cy.contains("Monday");
  });

  it("should book an interview", () => {
      // Clicks on the "Add" button in the second appointment
      cy.get("[alt=Add]")
      .first()
      .click();
      // Enters their name
      cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
      // Chooses an interviewer
      cy.get("[alt='Sylvia Palmer']")
      .click()
      // Clicks the save button
      cy.contains('Save').click()
      // Sees the booked appointment
      cy.contains(".appointment__card--show", "Lydia Miller-Jones");
      cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
      // Clicks on the "Edit" button in the second appointment
      cy.get("[alt=Edit]")
      .first()
      .click({ force: true });
      // Enters their name
      cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
      // Chooses an interviewer
      cy.get("[alt='Tori Malcolm']").click();
      // Clicks the save button
      cy.contains('Save').click()
      // Sees the booked appointment
      cy.contains(".appointment__card--show", "Lydia Miller-Jones");
      cy.contains(".appointment__card--show", "Tori Malcolm");
  });
//   Visits the root of our web server
// Clicks the delete button for the existing appointment
// Clicks the confirm button
// Sees that the appointment slot is empty

    it("should cancel an interview", () => {
      // Clicks on the "Delete" button in the second appointment
      cy.get("[alt=Delete]")
      .click({ force: true });
      // Checks if Confirm screen pops up
      cy.contains(".appointment__card", 'Delete the appointment?')
      // Clicks the confirm button
      cy.contains('Confirm').click()
      // Sees the booked appointment does not exist
      cy.contains('.appointment__card--show', "Archie Cohen").should('not.exist');
    });
});