import LoginPage from "../../../support/Pages/LoginPage";
import HomePage from "../../../support/Pages/HomePage";
import CmiOCitaPage from "../../../support/Pages/Citacion/CmiOCitaPage";
import CaminoCitaPage from "../../../support/Pages/Citacion/CaminoCitaPage";
import FormularioCitacion from "../../../support/Pages/Citacion/FormularioCitacion";

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
        CmiOCitaPage.visit()
        HomePage.cerrarModalConfiar();
        //Tema de aviso destacado, habra que hacer un control para clickear cuando aparezca y sino ignorar
        //cy.wait(12000)
        //cy.get('.home-avisos-content .buttonCerrar').eq(1).click();
        //Uso el pageObject de Home
        //HomePage.accederACitacion();
        //Esto deberia ir en un page objet de citación
        CmiOCitaPage.accederCitaProgramada();
        CaminoCitaPage.accederCitaPorHospital();
        //cy.get('.button-list button.appt-optionButton').first().click();
        //Esto deberia ir en un page object de cita por hospital
        //seguir aqui con el formulario de citacion. Prueba Git
        FormularioCitacion.abrirProvincias()
        //cy.get('input[value="Buscar una provincia"').click()
        cy.get('.appt-optionButton-label').contains('Córdoba').click();
        FormularioCitacion.abrirHospitales();
        //cy.get('input[value="Selecciona un Hospital o centro"').click();
        cy.get('.select-all-button').click();
        FormularioCitacion.abrirEspecialidades();
        //cy.get('input[value="Selecciona una especialidad"').click()
        cy.get('.estilizado').contains('Cardiología').click();
        FormularioCitacion.abrirMotivos();
        //cy.get('input[value="Selecciona el motivo"').click();
        cy.get('.appt-optionButton').contains('Consulta con un médico').click();
        FormularioCitacion.abrirProfesionales();
        //cy.get('input[value="Cualquier profesional"').should('be.visible').click();
        cy.get('.professional-btn').contains('Juan Carlos Ca Mi').click()
        FormularioCitacion.siguiente();
        //cy.get('.appt-button').contains('Siguiente').click()
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