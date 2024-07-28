/// <reference types="cypress" />

Cypress.Commands.add(
  "fillMandatoryFieldsAndSubmit",
  (firstName, lastName, email, text) => {
    cy.get("#firstName").type(firstName);
    cy.get("#lastName").type(lastName);
    cy.get("#email").type(email);
    cy.get("#open-text-area").type(text);
    cy.contains("button", "Enviar").click();
  }
);
