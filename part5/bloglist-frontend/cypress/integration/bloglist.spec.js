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

  describe.only("When logged in", function () {
    const blog = {
      author: "meh",
      title: "something",
      url: "a.com",
    };

    beforeEach(function () {
      cy.get("#username").type(user.username);
      cy.get("#password").type(user.password);
      cy.get("#login-button").click();
    });

    it("A blog can be created", function () {
      cy.get(".toggleButton").click();
      cy.get("#author").type(blog.author);
      cy.get("#title").type(blog.title);
      cy.get("#url").type(blog.url);
      cy.get("#add-note").click();
      cy.contains("something");
    });

    it("A post can be liked", function () {
      cy.get(".toggleButton").click();
      cy.get("#author").type(blog.author);
      cy.get("#title").type(blog.title);
      cy.get("#url").type(blog.url);
      cy.get("#add-note").click();
      cy.get("#show-button").click();
      cy.get("#like-button").click();
      cy.get(".likes").should("contain", "1");
    });

    it("A blog can be deleted", function () {
      cy.get(".toggleButton").click();
      cy.get("#author").type(blog.author);
      cy.get("#title").type(blog.title);
      cy.get("#url").type(blog.url);
      cy.get("#add-note").click();
      cy.get("#show-button").click();
      cy.get("#like-button").click();
      cy.get("button").contains("remove").click();
      cy.get(".blog").should("not.exist");
    });

    it("Blogs are sorted  by likes", function () {
      cy.get(".toggleButton").click();
      cy.get("#author").type(blog.author);
      cy.get("#title").type(blog.title);
      cy.get("#url").type(blog.url);
      cy.get("#add-note").click();

      cy.get(".toggleButton").click();
      cy.get("#author").type("idk");
      cy.get("#title").type("dfgas");
      cy.get("#url").type(blog.url);
      cy.get("#add-note").click()

      cy.get(':nth-child(5) > :nth-child(1) > :nth-child(1) > #show-button').click()

      cy.get(':nth-child(6) > :nth-child(1) > :nth-child(1) > #show-button').click()

      cy.get('#root > :nth-child(1) > :nth-child(1) > :nth-child(5)').should("contain", "something meh")
      
      cy.get('#root > :nth-child(1) > :nth-child(1) > :nth-child(6)').should("contain", "dfgas idk")

      cy.get(':nth-child(6) > :nth-child(1) > .toggleableContent > .likes > #like-button').click()

      cy.get('#root > :nth-child(1) > :nth-child(1) > :nth-child(5)').should("contain", "dfgas idk")
    });
  });
});
