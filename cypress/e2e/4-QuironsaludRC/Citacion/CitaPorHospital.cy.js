import LoginPage from "../../../support/Pages/LoginPage";

const loginPaciente = () => {
    LoginPage.visit();
    cy.wait(5000)
    LoginPage.acceptCookies();
    const email = 'santi@rc.es'
    const password = 'Tester01'
    LoginPage.fillLoginForm(email, password);
    LoginPage.submitLoginForm();
    cy.url().should('include', '/tkMain')
}

describe('Tests Cita Por Hospital', () => {
    before(()=>{
        cy.session('paciente logueado', loginPaciente)
    })

    it('Cita por hospi',() => {
        cy.visit('https://rc.quironsalud.com/idcsalud-client/cm/portal-paciente/tkMain')
        cy.get('.listadoPatient li')
        .first()
        .click();
        cy.get('#buttonContinuar').click();
        //Esto deberia ir en un page object de "Home"
        cy.get('.appt-link.btn-link').click();
        cy.get('.home-tarjeta-saludo-botones__destacado.btnIcon__red').click();
        //Esto deberia ir en un page objet de citación
        cy.get('.appointmentWay-block button.link-block').should('be.visible').click()
        cy.get('.button-list button.appt-optionButton').first().click();
        //Esto deberia ir en un page object de cita por hospital
        //seguir aqui con el formulario de citacion. Prueba Git
    })
});