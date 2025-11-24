import LoginPage from "../../../support/Pages/LoginPage";
import HomePage from "../../../support/Pages/HomePage";
import CmiOCitaPage from "../../../support/Pages/Citacion/CmiOCitaPage";
import CaminoCitaPage from "../../../support/Pages/Citacion/CaminoCitaPage";
import FormularioCitacionPage from "../../../support/Pages/Citacion/FormularioCitacionPage";
import FormularioCitacionProvinciasPage from "../../../support/Pages/Citacion/FormularioCitacionProvinciasPage";
import FromularioCitacionCentrosPage from "../../../support/Pages/Citacion/FromularioCitacionCentrosPage";

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

    it('Cita por hospital por centro especifico',() => {
        cy.visit('https://rc.quironsalud.com/idcsalud-client/cm/portal-paciente/tkMain')
        cy.get('.listadoPatient li')
        .first()
        .click();
        cy.get('#buttonContinuar').click();
        //Vamos derecho a la cita para saltearnos la pantalla de destacados
        CmiOCitaPage.visit()
        HomePage.cerrarModalConfiar();
        CmiOCitaPage.accederCitaProgramada();
        CaminoCitaPage.accederCitaPorHospital();
        FormularioCitacionPage.accederProvincias();
        FormularioCitacionProvinciasPage.seleccionarProvincia('Córdoba')
        FormularioCitacionPage.accederHospitales();
        FromularioCitacionCentrosPage.seleccionarTodosLosCentros();
        //cy.get('.select-all-button').click();
        FormularioCitacionPage.accederEspecialidades();
        cy.get('.estilizado').contains('Cardiología').click();
        FormularioCitacionPage.accederMotivos()
        cy.get('.appt-optionButton').contains('Consulta con un médico').click();
        FormularioCitacionPage.accederProfesionales();
        cy.get('.professional-btn').contains('Juan Carlos Ca Mi').click()
        FormularioCitacionPage.confirmarFormulario();
        cy.get('.appt-button.btn-yes').click();
        cy.get('.appt-optionButton-label').contains('Consulta Primera').should('be.visible').click();
        cy.get('.appt-optionButton-label').contains('Presencial').click();
        cy.get('.appt-button').contains('Siguiente').click()
        cy.get('.appt-optionButton-label').contains('Cita privada o seguro con reembolso').click();
        cy.get('.slider.round').click();
        cy.get('.appt-button').contains('Ver fechas').click();

    })

    after(() =>{
        Cypress.session.clearAllSavedSessions();
    })
});