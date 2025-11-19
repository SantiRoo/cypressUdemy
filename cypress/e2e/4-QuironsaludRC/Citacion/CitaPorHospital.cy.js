import LoginPage from "../../../support/Pages/LoginPage";
import HomePage from "../../../support/Pages/HomePage";

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
        //Uso el pageObject de Home
        HomePage.cerrarModalConfiar();
        HomePage.accederACitacion();
        //Esto deberia ir en un page objet de citación
        cy.get('.appointmentWay-block button.link-block').should('be.visible').click()
        cy.get('.button-list button.appt-optionButton').first().click();
        //Esto deberia ir en un page object de cita por hospital
        //seguir aqui con el formulario de citacion. Prueba Git
        cy.get('input[value="Buscar una provincia"').click()
        cy.get('.appt-optionButton-label').contains('Córdoba').click();
        cy.get('input[value="Selecciona un Hospital o centro"').click();
        cy.get('.select-all-button').click();
        cy.get('input[value="Selecciona una especialidad"').click()
        cy.get('.estilizado').contains('Cardiología').click();
        cy.get('input[value="Selecciona el motivo"').click();
        cy.get('.appt-optionButton').contains('Consulta con un médico').click();
        cy.get('input[value="Cualquier profesional"').click();
        cy.get('.professional-btn').contains('Juan Carlos Ca Mi').click()
        cy.get('.appt-button').contains('Siguiente').click()
        cy.get('.appt-button.btn-yes').click();
        cy.get('.appt-optionButton-label').contains('Consulta Primera').click();
        cy.get('.appt-optionButton-label').contains('Presencial').click();
        cy.get('.appt-button').contains('Siguiente').click()
        cy.get('.appt-optionButton-label').contains('Cita privada o seguro con reembolso').click();
        cy.get('#agree').click();
        cy.get('.appt-button').contains('Ver fechas');

    })

    after(() =>{
        Cypress.session.clearAllSavedSessions();
    })
});