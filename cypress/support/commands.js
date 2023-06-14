// ***********************************************
// This example commands.js shows you how to
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

require('cypress-xpath');
require('cypress-mailosaur');

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

Cypress.Commands.add('login', (loginEmail, loginPassword) => {
    cy.session([loginEmail, loginPassword], () => {
      cy.visit('/login')
      cy.get('#email').type(data.loginEmail)
      cy.get('#password').type(data.loginPassword)
      cy.get('button').click()
      cy.url().should('include', 'https://acms.amalitech-dev.net/')
    })
  })
