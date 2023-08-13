/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('assertNumberButtonsDisabled', () => {
  const numbersArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  numbersArray.forEach(number => {
    cy.get(`[data-testid="${number}"]`).should('be.disabled');
  });
});

Cypress.Commands.add('assertNumberButtonsEnabled', () => {
  const numbersArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  numbersArray.forEach(number => {
    cy.get(`[data-testid="${number}"]`).should('be.enabled');
  });
});

Cypress.Commands.add('assertAmountAndChange', (amountText, changeText) => {
  cy.get('[role="ah"]').should('have.text', amountText);
  cy.get('[role="ch"]').should('have.text', changeText);
});