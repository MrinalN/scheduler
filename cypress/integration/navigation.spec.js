describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");
    // cy.get("li").contains("Tuesday");
    cy.contains("li", "Tuesday")
    .click()
    .should("have.class", "day-list__item--selected");
    //find day that contains "Tuesday"
    //Click on it
  });
});