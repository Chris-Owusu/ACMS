const baseUrl = Cypress.config().baseUrl;

describe('ACMS', () => {
    beforeEach(() => {
        cy.fixture('example.json').then(function (data) {
            globalThis.data = data
            cy.visit('/login')
        });
    })

    it('LogIn', () => {
        cy.url().should('include', baseUrl)
        cy.get('svg').eq(0).should('be.visible').and('have.attr', 'xmlns')
        cy.get('.rounded-md').first().should('be.visible')
        cy.contains('h1', 'Welcome back').should('have.text', 'Welcome back').and('not.have.class', 'uppercase')
        cy.get('#email').should('have.attr', 'type', 'email').and('have.attr', 'placeholder', 'Email').and('have.attr', 'value')
        cy.get('#password').should('have.attr', 'type', 'password').and('have.attr', 'placeholder', 'Password').and('have.attr', 'value')
        cy.get('button').should('not.have.class', 'uppercase').and('have.text', 'Login')
    })

    it('error message', () => {
        cy.get('button').click()
        cy.wait(2000)
        cy.contains('p', 'Please fill in all the required fields.').should('be.visible').and('have.text', ' Please fill in all the required fields. ')
    })

    it('LogIn error', () => {
        cy.get('#email').type('ama@gmail.com')
        cy.get('#password').type('123456')
        cy.get('button').click()
        cy.url().should('include', `${baseUrl}login`)
        cy.contains('p', 'Please check your credentials and try again.').should('be.visible').and('have.text', ' Please check your credentials and try again. ')
    })

    it('LogIn type', () => {
        cy.get('#email').type(data.loginEmail)
        cy.get('#password').type(data.loginPassword)
        cy.get('button').click()
        cy.url().should('include', baseUrl)
    })

})