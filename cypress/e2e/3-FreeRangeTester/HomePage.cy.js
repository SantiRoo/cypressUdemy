describe('Home de FreeRangeTester', () =>{
    beforeEach(() => {
        cy.visit('https://www.freerangetesters.com/')
    })

    it('Should have title', () => {
        cy.wait(6000);
        cy.title().should('include', 'Free Range Testers');
    })
})