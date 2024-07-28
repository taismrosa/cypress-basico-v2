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
    cy.contains("button", "Enviar").click();
    cy.get(".success strong")
      .should("be.visible")
      .and("have.text", "Mensagem enviada com sucesso.");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#firstName").type("Taís");
    cy.get("#lastName").type("Medeiros");
    cy.get("#email").type("taismedeirosdarosa@gmail");
    cy.get("#open-text-area").type("Texto de teste ");
    cy.contains("button", "Enviar").click();
    cy.get(".error strong")
      .should("be.visible")
      .and("have.text", "Valide os campos obrigatórios!");
  });

  it("valida que o campo de telefone segue vazio ao preencher caracteres não numéricos", () => {
    cy.get("#phone")
      .type("Teste com caracteres não numéricos! @-=;./'?*&¨%$#$~^`´")
      .should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").type("Taís");
    cy.get("#lastName").type("Medeiros");
    cy.get("#email").type("taismedeirosdarosa@gmail.com");
    cy.get("#phone-checkbox").check();
    cy.get("#open-text-area").type("Texto de teste ");
    cy.contains("button", "Enviar").click();
    cy.get(".error strong")
      .should("be.visible")
      .and("have.text", "Valide os campos obrigatórios!");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    const firstName = "Taís";
    const lastName = "Medeiros";
    const email = "taismedeirosdarosa@gmail";
    const phone = "999999999";

    cy.get("#firstName")
      .type(firstName)
      .should("have.value", firstName)
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type(lastName)
      .should("have.value", lastName)
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type(email)
      .should("have.value", email)
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type(phone)
      .should("have.value", phone)
      .clear()
      .should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.contains("button", "Enviar").click();
    cy.get(".error strong")
      .should("be.visible")
      .and("have.text", "Valide os campos obrigatórios!");
  });

  it("envia o formulário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit(
      "Taís",
      "Medeiros",
      "taismedeirosdarosa@gmail.com",
      "Texto de teste"
    );
    cy.get(".success strong")
      .should("be.visible")
      .and("have.text", "Mensagem enviada com sucesso.");
  });
});
