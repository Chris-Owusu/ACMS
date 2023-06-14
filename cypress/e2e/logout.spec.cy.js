const baseUrl = Cypress.config().baseUrl;

describe('ACMS', () => {
    beforeEach(() => {
        cy.fixture('example.json').then(function (data) {
            globalThis.data = data
            cy.visit('/login')
            cy.get('#email').type(data.loginEmail)
            cy.get('#password').type(data.loginPassword)
            cy.get('button').click()
            cy.url().should('include', baseUrl)
            cy.wait(5000)
        });
        // cy.xpath('//*[@id="root"]/div/div/div[1]').should(
        //     (side) => {
        //         cy.wait(side).should('be.visible')
        //     }
        // )
    })

    it('Sidebar', () => {
        cy.xpath('//*[@id="root"]/div/div/div[1]').within(() => {
            cy.get('svg').eq(0).should('be.visible').and('have.attr', 'xmlns')
            cy.contains('p', 'Dashboard').should('be.visible').and('have.text', 'Dashboard').as('dash')
            cy.get('@dash').parent().should('have.class','bg-slate-700')
            cy.contains('p', 'Users').should('be.visible').and('have.text', 'Users')
            cy.contains('p', 'Projects').should('be.visible').and('have.text', 'Projects')
            cy.contains('p', 'Settings').should('be.visible').and('have.text', 'Settings')
            cy.xpath('//*[@id="root"]/div/div/div[1]/div[2]/div[1]').should('be.visible')
            cy.xpath('//*[@id="root"]/div/div/div[1]/div[2]/div[2]').should('be.visible')
            cy.contains('p', 'Logout').should('be.visible').and('have.text', 'Logout')
        })
    })

    it('Logout', () => {
        cy.contains('p', 'Logout').should('be.visible').and('have.text', 'Logout').as('logout')
        cy.get('@logout').click()
        cy.url().should('include', `${baseUrl}login`)
        cy.get('svg').eq(0).should('be.visible').and('have.attr', 'xmlns')
        cy.get('.rounded-md').first().should('be.visible')
        cy.contains('h1', 'Welcome back').should('have.text', 'Welcome back').and('not.have.class', 'uppercase')
        cy.get('#email').should('have.attr', 'type', 'email').and('have.attr', 'placeholder', 'Email').and('have.attr', 'value')
        cy.get('#password').should('have.attr', 'type', 'password').and('have.attr', 'placeholder', 'Password').and('have.attr', 'value')
        cy.get('button').should('not.have.class', 'uppercase').and('have.text', 'Login')

    })

})