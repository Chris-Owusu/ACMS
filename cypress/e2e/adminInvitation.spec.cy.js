const baseUrl = Cypress.config().baseUrl;

describe('dashboard', () => {
    beforeEach(() => {
        cy.fixture('example.json').then(function (data) {
            globalThis.data = data
            cy.visit('/login')
            cy.get('#email').type(data.loginEmail)
            cy.get('#password').type(data.loginPassword)
            cy.get('button').click()
            cy.url().should('include', baseUrl)
        });
        // console.log(`${baseUrl}projects/`)
        // cy.intercept(`https://acms-api.amalitech-dev.net/projects/`).as('dashboard')
        // cy.wait('@dashboard')
        // cy.xpath("//h2[text()='Dashboard']", { timeout: 5000 }).should('be.visible')
        // cy.xpath("//h2[text()='Dashboard']").should(
        //     (email) => {
        //         console.log(email)
        //         expect(email).to.be.visible()
        //     }
        // )

        cy.xpath("//h2[text()='Dashboard']").should('be.visible')
    })

    it('users', () => {
        cy.xpath('//*[@id="root"]/div/div/div[1]').within(() => {
            cy.get('svg').eq(0).should('be.visible').and('have.attr', 'xmlns')
            // cy.get('svg').eq(0).should(
            //     (email) => {
            //         expect(email).to.be.visible()
            //         expect(email).to.have.attr('xmlns')
            //     }
            // )
            cy.contains('p', 'Dashboard').should('be.visible').and('have.text', 'Dashboard')
            cy.contains('p', 'Users').should('be.visible').and('have.text', 'Users').as('users')
            cy.get('@users').parent().should('have.attr','href', '/users')
            cy.contains('p', 'Projects').should('be.visible').and('have.text', 'Projects')
            cy.contains('p', 'Settings').should('be.visible').and('have.text', 'Settings')
            cy.xpath('//*[@id="root"]/div/div/div[1]/div[2]/div[1]').should('be.visible')
            cy.xpath('//*[@id="root"]/div/div/div[1]/div[2]/div[2]').should('be.visible')
            cy.contains('p', 'Logout').should('be.visible').and('have.text', 'Logout')
        })
    })

    it('invite button close', () => {
        cy.contains('p', 'Users').as('users')
        cy.get('@users').click()
        cy.get('@users').parent().should('have.class','bg-slate-700')
        cy.xpath("//h2[text()='Users']").should('be.visible')
        cy.xpath('//*[@id="root"]/div/div[2]/div[1]/div').within(() => {
            cy.contains('p', 'Invite').should('be.visible').and('have.text', 'Invite').as('invite')
            cy.get('@invite').click()
            cy.xpath("//h2[text()='Invite members']").should('be.visible')
            // cy.get("svg").click()
        })
    })

    it('invite without invalid email', () => {
        cy.contains('p', 'Users').click()
        cy.xpath('//*[@id="root"]/div/div[2]/div[1]/div').within(() => {
            cy.contains('p', 'Invite').should('be.visible').and('have.text', 'Invite').as('invite')
            cy.get('@invite').click()
            cy.xpath("(//input[@id='email'])[1]").type(data.emailInvalid)
            cy.xpath("(//select[@id='role'])[1]").select("Developer").invoke("val").should("eq", "developer")
            cy.xpath("//button[normalize-space()='Send Invitation']").click()
        })
        cy.wait(2000)
        cy.xpath('//div[text()="The user with the email provided exists."]').should('be.visible').and('have.text', 'The user with the email provided exists.')
    })

    
    it('invite but already exit', () => {
        cy.contains('p', 'Users').click()
        cy.xpath('//*[@id="root"]/div/div[2]/div[1]/div').within(() => {
            cy.contains('p', 'Invite').should('be.visible').and('have.text', 'Invite').as('invite')
            cy.get('@invite').click()
            cy.xpath("(//input[@id='email'])[1]").type(data.email)
            cy.xpath("(//select[@id='role'])[1]").select("Developer").invoke("val").should("eq", "developer")
            cy.xpath("//button[normalize-space()='Send Invitation']").click()
        })
        cy.wait(2000)
        cy.xpath('//div[text()="The user with the email provided exists."]').should('be.visible').and('have.text', 'The user with the email provided exists.')
    })

    it('invite with valid credentials', () => {
        cy.contains('p', 'Users').click()
        cy.xpath('//*[@id="root"]/div/div[2]/div[1]/div').within(() => {
            cy.contains('p', 'Invite').should('be.visible').and('have.text', 'Invite').as('invite')
            cy.get('@invite').click()
            cy.xpath("(//input[@id='email'])[1]").type(data.emailValid)
            cy.xpath("(//select[@id='role'])[1]").select("Developer").invoke("val").should("eq", "developer")
            cy.xpath("//button[normalize-space()='Send Invitation']").click()
        })
    })

    it('Assign project to developer assertions', () => {
        cy.contains('p', 'Users').click()
        cy.xpath('//*[@id="root"]/div/div[2]/table/tbody/tr[2]').click()
        cy.xpath('//span[text()="Name"]').should('exist')
        cy.xpath('//span[text()="Status"]').should('exist')
        cy.xpath('//*[@id="root"]/div[2]/div[1]/div[4]').should('exist')
        cy.xpath('//label[text()="Assign to project"]').should('exist')
        cy.xpath('//*[@id="root"]/div[2]/div[1]/form/select').should('be.visible')
        cy.get("button[type='submit']").should('be.visible')
    })

    it('Assign project to developer close button', () => {
        cy.contains('p', 'Users').click()
        cy.xpath('//*[@id="root"]/div/div[2]/table/tbody/tr[3]').click()
        cy.xpath("//div[@class='flex justify-end']//*[name()='svg']").click()
    })

    it('Assign project to developer', () => {
        cy.contains('p', 'Users').click()
        cy.xpath('//*[@id="root"]/div/div[2]/table/tbody/tr[2]').click()
        cy.xpath('//*[@id="root"]/div[2]/div[1]/form/select').select('ACMS')
        cy.get("button[type='submit']").click()
    })

    it('Check if dev has been assigned to a project ', () => {
        cy.contains('p', 'Users').click()
        cy.xpath('//*[@id="root"]/div/div[2]/table/tbody/tr[3]').click()
        cy.xpath('//span[text()="Name"]').should('exist')
        cy.xpath('//span[text()="Status"]').should('exist')
        cy.xpath('//span[text()="Not Available"]').should('be.visible')
        cy.xpath('//div/span[text()="Working On"]').should('be.visible')
        cy.xpath('//div/span[text()="Project Start Date"]').should('be.visible')
        cy.xpath('//div/span[text()="Project End Date"]').should('be.visible')
        cy.xpath('//div/span[text()="Available from"]').should('be.visible')
    })

    it('Check the sorting effect for available devs', () =>{
        cy.contains('p', 'Users').click()
        cy.get('thead').within(() => {
            cy.xpath("//th[normalize-space()='FULL NAME']").should('be.visible')
            cy.xpath("//th[normalize-space()='EMAIL']").should('be.visible')
            cy.xpath("//th[normalize-space()='ROLE']").should('be.visible')
            cy.xpath("//th[normalize-space()='STATUS']").should('be.visible')
        })
    })

    it('Check the sorting effect for available devs', () =>{
        cy.contains('p', 'Users').click()
        cy.xpath("//button[normalize-space()='All']").click()
        cy.xpath('//div/h3[normalize-space()="DEVELOPER"]').click()
        cy.xpath("//button[normalize-space()='All']").click()
        cy.xpath('//div/h3[normalize-space()="Available"]').click()
        cy.xpath('//table/tbody/tr/td[text()="Available"]').should('be.visible')
    })

    it('Check the sorting effect for available project managers', () =>{
        cy.contains('p', 'Users').click()
        cy.xpath("//button[normalize-space()='All']").click()
        cy.xpath('//div/h3[normalize-space()="DEVELOPER"]').click()
        cy.xpath("//button[normalize-space()='All']").click()
        cy.xpath('//div/h3[normalize-space()="Unavailable"]').click()
        cy.xpath('//table/tbody/tr/td[text()="Unavailable"]').should('be.visible')
    })

    it('Check the sorting effect for project managers', () =>{
        cy.contains('p', 'Users').click()
        cy.xpath("//button[normalize-space()='All']").click()
        cy.xpath('//div/h3[normalize-space()="PROJECT MANAGER"]').click()
        cy.xpath("//td[@class='text-start text-green-500']").should('be.visible')
    })
})


