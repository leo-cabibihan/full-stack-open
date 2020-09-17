describe("Blog List", function () {
  const user = {
    name: "Matti Luukkainen",
    username: "mluukkai",
    password: "salainen",
  };
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    //add new user
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type(user.username);
      cy.get("#password").type(user.password);
      cy.get("#login-button").click();
      cy.contains("Logged in as mluukkai");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type(user.name);
      cy.get("#password").type(user.password);
      cy.get("#login-button").click();
      cy.contains("username or password is wrong");
    });
  });
});
