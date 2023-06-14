const baseUrl = Cypress.config().baseUrl;

describe('dashboard', () => {
    beforeEach(() => {
        cy.fixture('example.json').then(function (data) {
            globalThis.data = data
            //cy.login(data.loginEmail, data.loginPassword)
            cy.visit('/login')
            cy.get('#email').type(data.loginEmail)
            cy.get('#password').type(data.loginPassword)
            cy.get('button').click()
            cy.url().should('include', baseUrl)
        });
        cy.xpath("//h2[text()='Dashboard']").should('be.visible')
    })

    it('dashboard', () => {
        cy.get('.sidebar-background').within(() => {
            cy.get('svg').eq(0).should('be.visible').and('have.attr', 'xmlns')
            cy.contains('p', 'Dashboard').should('be.visible').and('have.text', 'Dashboard').as('dash')
            cy.get('@dash').parent().should('have.attr','href', '/')
            //cy.get('@dash').parent().should('have.class','bg-slate-600')
            cy.contains('p', 'Users').should('be.visible').and('have.text', 'Users')
            cy.contains('p', 'Projects').should('be.visible').and('have.text', 'Projects')
            cy.contains('p', 'Settings').should('be.visible').and('have.text', 'Settings')
            cy.xpath('//*[@id="root"]/div/div/div[1]/div[2]/div[1]').should('be.visible')
            cy.xpath('//*[@id="root"]/div/div/div[1]/div[2]/div[2]').should('be.visible')
            cy.contains('p', 'Logout').should('be.visible').and('have.text', 'Logout')
        })
    })

    it('Category clear button', () => {
        cy.xpath('//*[@id="root"]/div/div/div[2]/div[2]/div[2]/div/div[1]/div[1]').click()
        cy.get('#root > div:nth-child(2) > div > div > div > svg').click()
    })

    it('Create Category', () => {
        cy.xpath('//*[@id="root"]/div/div/div[2]/div[2]/div[2]/div/div[1]/div[1]').click()
        cy.get('#skill-category').type('Quality Assurance')
        cy.get('button').click()
        cy.xpath('//*[@id="root"]/div/div/div[2]/div[2]/div[2]/div/div[2]').should('be.visible')
    })

    it('Not a unique keyword', () => {
        cy.xpath('//*[@id="root"]/div/div/div[2]/div[2]/div[2]/div/div[1]/div[1]').click()
        cy.get('#skill-category').type('Quality Assurance')
        cy.get('button').click()
        cy.xpath('//*[@id="root"]/div[2]/div/div/p[span[text()="server error"]]').should('be.visible').and('have.text', ' server error ')
    })

    
    it('Category clear button', () => {
        cy.xpath('//*[@id="root"]/div/div/div[2]/div[2]/div[2]/div/div[1]/div[2]').click()
        cy.get('#root > div:nth-child(2) > div > div > div > svg').click()
    })

    it('Add skills to category', () => {
        cy.xpath('//*[@id="root"]/div/div/div[2]/div[2]/div[2]/div/div[1]/div[2]').click()
        cy.xpath("//button[normalize-space()='Category']").click()
        cy.xpath('//h3[text()="Quality Assurance"]').click()
        cy.get('#skill-category').type('Manual Teating')
        cy.xpath('//span[text()=" Add"]').click()
        cy.get('#skill-category').type('Automation Teating')
        cy.xpath('//*[@id="root"]/div[2]/div/div/form/div/div[2]/button').click()
        cy.get('button').last().click()
    })

    
    it('Not a unique keyword', () => {
        cy.xpath('//*[@id="root"]/div/div/div[2]/div[2]/div[2]/div/div[1]/div[2]').click()
        cy.xpath("//button[normalize-space()='Category']").click()
        cy.xpath('//h3[text()="Quality Assurance"]').click()
        cy.get('#skill-category').type('Manual Teating')
        cy.xpath('//span[text()=" Add"]').click()
        cy.get('#skill-category').type('Automation Teating')
        cy.xpath('//*[@id="root"]/div[2]/div/div/form/div/div[2]/button').click()
        cy.get('button').last().click()
        cy.xpath('//*[@id="root"]/div[2]/div/div/p[span[text()="server error"]]').should('be.visible').and('have.text', ' server error ')
    })

    it('Check category visibility', () => {
        cy.xpath('//*[@id="root"]/div/div/div[2]/div[2]/div[2]/div/div[2]').should('exist')
        cy.xpath('//*[@id="root"]/div/div/div[2]/div[2]/div[2]/div/div[2]/div[1]/div/div/span').should('exist')
        cy.xpath("(//*[name()='svg'][@class='text-blue-500 text-sm cursor-pointer'])[1]").should('exist')
        cy.xpath("(//*[name()='svg'][@class='text-red-500 cursor-pointer'])[1]").should('exist')
    })

    // it.only('Check category dropdown visibility', () => {
    //     cy.xpath("(//*[name()='svg'][@class='cursor-pointer w-[10px] h-[10px]'])[1]").click()
    //     cy.get('.font-normal.text-sm.flex.flex-col').should('be.visible')
    //     // cy.get("(//*[name()='svg'][@stroke='currentColor'])[13]").first().should('be.visible')
    //     cy.get("//body//div//li[1]//*[name()='svg']//*[name()='path' and contains(@d,'M6 19c0 1.')]").should('be.visible')
    // })

    it('Delete Skills', () => {
        cy.xpath("(//*[name()='svg'][@class='cursor-pointer w-[10px] h-[10px]'])[1]").click()
        cy.xpath("//body//div//li[1]//*[name()='svg']").last().click()
        cy.xpath("//body//div//li[2]//*[name()='svg']").last().click()
        cy.wait(5000)
        // cy.get('body div li:nth-child(1)').should('not.be.visible')
        // cy.get('body div li:nth-child(1)').should('not.be.visible')
    })

    it('Delete Category', () => {
        cy.xpath("(//*[name()='svg'][@class='text-red-500 cursor-pointer'])[1]").click()
        cy.wait(5000)
        // cy.xpath('//*[@id="root"]/div/div/div[2]/div[2]/div[2]/div/div[2]/div[3]/div/div').should('not.be.visible')
    })


})