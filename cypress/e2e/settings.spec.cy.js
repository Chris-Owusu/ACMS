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
    })

    it('Settings', () => {
        cy.xpath('//*[@id="root"]/div/div/div[1]').within(() => {  
            cy.get('svg').eq(0).should('be.visible').and('have.attr', 'xmlns')
            cy.contains('p', 'Dashboard').should('be.visible').and('have.text', 'Dashboard')
            cy.contains('p', 'Users').should('be.visible').and('have.text', 'Users')
            cy.contains('p', 'Projects').should('be.visible').and('have.text', 'Projects')
            cy.contains('p', 'Settings').should('be.visible').and('have.text', 'Settings').as('setting')
            cy.get('@setting').parent().should('have.attr','href', '/settings')
            cy.xpath('//*[@id="root"]/div/div/div[1]/div[2]/div[1]').should('be.visible')
            cy.xpath('//*[@id="root"]/div/div/div[1]/div[2]/div[2]').should('be.visible')
            cy.contains('p', 'Logout').should('be.visible').and('have.text', 'Logout')
        })
    })

    it('Elements that were not suppose to be there', () => {
        cy.contains('p', 'Settings').as('setting')
        cy.get('@setting').click()
        cy.xpath("//h2[text()='Settings']").should('be.visible')
        cy.get('@setting').parent().should('have.class','bg-slate-600')
        cy.xpath("//h1[text()='User Information']").should('not.exist')
        cy.get("img[alt='Profile Picture']").should('not.exist')
        cy.xpath('//*[@id="root"]/div/div[2]/div[2]/div/div[3]').should('not.exist')
        cy.xpath('//*[@id="root"]/div/div[2]/div[2]/div/div[4]').should('not.exist')
        cy.xpath('//*[@id="root"]/div/div[2]/div[2]/div/div[5]').should('not.exist')
        cy.get('button').should('not.exist')
    })

    it('Edit Profile Visibility', () => {
        cy.contains('p', 'Settings').as('setting')
        cy.get('@setting').click()
        cy.xpath("//h2[text()='Settings']").should('be.visible')
        cy.get('@setting').parent().should('have.class','bg-slate-600')
        cy.xpath('//div/h2[text()="Email"]').should("be.visible")
        cy.xpath('//div/p[text()="acms@amalitech.org"]').should("be.visible")
        cy.xpath('//div/h2[text()="Role"]').should("be.visible")
        cy.xpath('//div/p[text()="Admin"]').should("be.visible")
    })
})