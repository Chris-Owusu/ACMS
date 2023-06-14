const baseUrl = Cypress.config().baseUrl;

describe('ACMS', () => {
    beforeEach(() => {
        cy.fixture('example.json').then(function (data) {
            globalThis.data = data
            //cy.login(data.loginEmail, data.loginPassword)
            cy.visit('/login')
            cy.get('#email').type(data.loginEmail)
            cy.get('#password').type(data.loginPassword)
            cy.get('button').click()
            cy.url().should('include', baseUrl)
            // cy.wait(5000)
        });
    })

    it('Projects', () => {
        cy.xpath('//*[@id="root"]/div/div/div[1]').within(() => {
            cy.get('svg').eq(0).should('be.visible').and('have.attr', 'xmlns')
            cy.contains('p', 'Dashboard').should('be.visible').and('have.text', 'Dashboard')
            cy.contains('p', 'Users').should('be.visible').and('have.text', 'Users')
            cy.contains('p', 'Projects').should('be.visible').and('have.text', 'Projects').as('projects')
            cy.get('@projects').parent().should('have.attr','href', '/projects')
            cy.contains('p', 'Settings').should('be.visible').and('have.text', 'Settings')
            cy.xpath('//*[@id="root"]/div/div/div[1]/div[2]/div[1]').should('be.visible')
            cy.xpath('//*[@id="root"]/div/div/div[1]/div[2]/div[2]').should('be.visible')
            cy.contains('p', 'Logout').should('be.visible').and('have.text', 'Logout')
        })
    })

    it('Edit Profile Visibility', () => {
        cy.contains('p', 'Projects').as('projects')
        cy.get('@projects').click()
        cy.xpath("//h2[text()='Projects']").should('be.visible')
        cy.get('@projects').parent().should('have.class','bg-slate-700')
        cy.xpath('//div/p[text()="Create"]').should('be.visible')
        cy.xpath('//*[@id="root"]/div/div[2]/div[2]').within(() => {
            cy.xpath("//th[normalize-space()='NAME']").should('be.visible')
            cy.xpath("//th[normalize-space()='ASSIGNEES']").should('be.visible')
            cy.xpath("//th[normalize-space()='START DATE']").should('be.visible')
            cy.xpath("//th[normalize-space()='END DATE']").should('be.visible')
            cy.xpath("//th[normalize-space()='ACTION']").should('be.visible')
        })
    })

    it('Edit Profile clear button', () => {
        cy.contains('p', 'Projects').as('projects')
        cy.get('@projects').click()
        cy.xpath('//div/p[text()="Create"]').click()
        cy.xpath("(//*[name()='svg'][@class='text-red-600'])[1]").click()
    })

    it('Edit Profile', () => {
        cy.contains('p', 'Projects').as('projects')
        cy.get('@projects').click()
        cy.xpath('//div/p[text()="Create"]').click()
        cy.get("input[placeholder='Project Name']").type('ACMS')
        cy.get("textarea[placeholder='Project Details']").type('Awesome Project')
        // cy.xpath("//select").as('drop')
        // cy.get('@drop').click().select('Python')
        // cy.get('@drop').click().select('Node')
        // cy.get('@drop').click().select('Java')
        cy.xpath("(//input[@type='date'])[1]").type('30062023')
        cy.xpath("(//input[@type='date'])[2]").type('30072023')
        cy.xpath("//button[text()='Create']").click()
    })

    it('Add devs to project clear btn', () => {
        cy.contains('p', 'Projects').click()
        cy.xpath("//tbody/tr[1]/td[5]/div[2]").click()
        cy.xpath("//div[@class='flex justify-end']//*[name()='svg']").click()
    })

    it('Add devs to project assertions', () => {
        cy.contains('p', 'Projects').click()
        cy.xpath("//tbody/tr[1]/td[5]/div[2]").click()
        cy.xpath('//span[text()="Project Name"]').should('be.visible')
        cy.xpath('//label[text()="Select Developers"]').should('be.visible')
        cy.get('select').should('exist')
        cy.get("button[type='submit']").should('exist')
    })

    it('Add devs to project click btn', () => {
        cy.contains('p', 'Projects').click()
        cy.xpath("//tbody/tr[1]/td[5]/div[2]").click()
        cy.get("button[type='submit']").click()
    })
})