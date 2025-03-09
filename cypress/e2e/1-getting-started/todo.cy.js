/// <reference types="cypress" />

describe("Dummy Test Case", () => {
  it("should visit example.com and check the title", () => {
    // Visit the dummy website
    cy.visit("https://example.com");

    // Assert that the page title is correct
    cy.title().should("eq", "Example Testing Domain");
  });
});