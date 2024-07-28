/// <reference types="cypress" />

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", () => {
    cy.title().should("eq", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", () => {
    cy.get("#firstName").type("Taís");
    cy.get("#lastName").type("Medeiros");
    cy.get("#email").type("taismedeirosdarosa@gmail.com");
    cy.get("#open-text-area").type(
      "Texto de teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste",
      { delay: 0 }
    );
    cy.get("button[type='submit']").click();
    cy.get(".success strong")
      .should("be.visible")
      .and("have.text", "Mensagem enviada com sucesso.");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#firstName").type("Taís");
    cy.get("#lastName").type("Medeiros");
    cy.get("#email").type("taismedeirosdarosa@gmail");
    cy.get("#open-text-area").type("Texto de teste ");
    cy.get("button[type='submit']").click();
    cy.get(".error strong")
      .should("be.visible")
      .and("have.text", "Valide os campos obrigatórios!");
  });

  it("valida que o campo de telefone segue vazio ao preencher caracteres não numéricos", () => {
    cy.get("#phone")
      .type("Teste com caracteres não numéricos! @-=;./'?*&¨%$#$~^`´")
      .should("have.value", "");
  });
});
