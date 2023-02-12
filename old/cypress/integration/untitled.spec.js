describe("Test navigation, and basic page loading", () => {
  beforeEach(() => {
    cy.visit("https://farese.com/");
    cy.clearCookies();
    cy.reload(true);
  });

  it("Tests all the nav links, and makes sure the basic parts of pages load.", () => {
    cy.viewport(1920, 1065);
    cy.visit("https://farese.com/", { headers: {} });
    cy.get("ul > :nth-child(1) > a").click();
    cy.get("ul > :nth-child(2) > a").click();
    cy.get(
      ":nth-child(3) > :nth-child(1) > :nth-child(1) > :nth-child(1) > p"
    ).contains("John Farese was born in 1956");
    cy.get(":nth-child(3) > a").click();
    cy.get(":nth-child(4) > a").click();
    cy.get("tbody > :nth-child(1) > :nth-child(2)").contains(
      "Berean Bible Church"
    );
    cy.get("nav > :nth-child(1) > :nth-child(1)").click();
  });
});

// /**
//   * Code generated with Fd Cypress Recorder.
//   * https://github.com/FDMediagroep/fd-cypress-recorder
//   */

// /// <reference types="Cypress" />
// describe('Test Suite ...', () => {
//   beforeEach(() => {
//     cy.visit('https://farese.com/');
//     cy.clearCookies();
//     cy.reload(true);
//   });

//   afterEach(() => {
//     cy.clearCookies();
//   });

//   it('should ...', () => {
//     cy.viewport(1920, 1065);
//     cy.visit('https://farese.com/', {headers: {}});
//     cy.get(':nth-child(3) > a').click();
//     cy.get('h4').contains('Providence Reformed Baptist Church');
//     cy.get('#website > a').contains('magherafeltrbc.org');
//   });
// });

/**
 * Code generated with Fd Cypress Recorder.
 * https://github.com/FDMediagroep/fd-cypress-recorder
 */

/// <reference types="Cypress" />
describe("Test Suite ...", () => {
  beforeEach(() => {
    cy.visit("https://farese.com/");
    cy.clearCookies();
    cy.reload(true);
  });

  afterEach(() => {
    cy.clearCookies();
  });

  it("should ...", () => {
    cy.viewport(1920, 1065);
    cy.visit("https://farese.com/", { headers: {} });
    cy.get(":nth-child(3) > a").click();
    cy.get("input").click();
    cy.get("input").type("magherafelt");
    cy.get(":nth-child(1) > a > :nth-child(1) > :nth-child(1)").click();
    cy.get("canvas").click();
    cy.get("#website > a").contains("magherafeltrbc.org");
  });
});
