describe("Blog List", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("user can log in", function () {
    cy.get("#username").type("chicken");
    cy.get("#password").type("chicken");
    cy.get("#login-button").click();

    cy.contains("Logged in as chicken");
  });
});
