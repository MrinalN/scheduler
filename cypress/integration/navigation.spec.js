describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");
    // cy.get("li").contains("Tuesday");
    cy.contains("li", "Tuesday")
    //Click on it
    .click()
    //Should now appear selected
    .should("have.class", "day-list__item--selected");
  });
});