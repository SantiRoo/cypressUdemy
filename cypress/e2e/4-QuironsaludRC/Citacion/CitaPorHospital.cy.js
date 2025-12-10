import LoginPage from "../../../support/Pages/LoginPage";
import HomePage from "../../../support/Pages/HomePage";
import CmiOCitaPage from "../../../support/Pages/Citacion/CmiOCitaPage";
import CaminoCitaPage from "../../../support/Pages/Citacion/CaminoCitaPage";
import FormularioCitacionPage from "../../../support/Pages/Citacion/FormularioCitacionPage";
import FormularioCitacionProvinciasPage from "../../../support/Pages/Citacion/FormularioCitacionProvinciasPage";
import FromularioCitacionCentrosPage from "../../../support/Pages/Citacion/FromularioCitacionCentrosPage";
import FormularioCitacionEspecialidadesPage from "../../../support/Pages/Citacion/FormularioCitacionEspecialidadesPage";
import FormularioCitacionMotivosPage from "../../../support/Pages/Citacion/FormularioCitacionMotivosPage";
import FormularioCitacionProfesionalesPage from "../../../support/Pages/Citacion/FormularioCitacionProfesionalesPage";
import PrimeraOSucesivaPage from "../../../support/Pages/Citacion/PrimeraOSucesivaPage";
import PrestacionesPage from "../../../support/Pages/Citacion/PrestacionesPage";
import TipoCitaPage from "../../../support/Pages/Citacion/TipoCitaPage";
import PrivadaOAseguradora from "../../../support/Pages/Citacion/PrivadaOAseguradora";
import HuecosConHuecosPage from "../../../support/Pages/Citacion/HuecosConHuecosPage";
import HuecosPage from "../../../support/Pages/Citacion/HuecosPage";
import MisCitas from "../../../support/Pages/MisCitas";

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

    it('Cita por hospital - Multicentro - Cita Privada',() => {
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
        FormularioCitacionPage.accederEspecialidades();
        FormularioCitacionEspecialidadesPage.seleccionarEspecialidad('Cardiología');
        FormularioCitacionPage.accederMotivos();
        FormularioCitacionMotivosPage.seleccionarConsultaConMedico();
        //FormularioCitacionPage.accederProfesionales();
        //FormularioCitacionProfesionalesPage.seleccionarProfesional('Juan Carlos Ca Mi')
        FormularioCitacionPage.confirmarFormulario();
        PrimeraOSucesivaPage.seleccionarPrimeraCita();
        PrestacionesPage.seleccionarPrestacion('Consulta Primera')
        TipoCitaPage.seleccionarConsultaPresencial();
        TipoCitaPage.clickEnSiguiente();
        PrivadaOAseguradora.seleccionarCitaPrivada();
        PrivadaOAseguradora.aceptarAbonarImporte();
        cy.intercept('POST', '/idcsalud-client/cm/portal-paciente/pdp-api/v1/citas/huecos').as('llamadaHuecos');
        PrivadaOAseguradora.clickVerFechas();
        HuecosConHuecosPage.seleccionarYConfirmarHueco('@llamadaHuecos') //Seguir trabajando en migrar el PO a Huecos
        //cy.wait('@llamadaHuecos')
        //cy.get('.isFirstGap').click()
        //cy.get('.gaps .gap-button').first().click();
        //cy.intercept('POST', '/idcsalud-client/cm/portal-paciente/pdp-api/v1/appointment/new').as('creacionCita')
        //cy.get('.appt-button').contains('Confirmar cita').click();
        //cy.wait('@creacionCita');
        //cy.get('.appointmentConfirmSummary').should('be.visible');
        let fechaCitaCreada;
        HuecosConHuecosPage.getFechaYHoraCitaCreada().invoke('text').then(fechaEnHuecos => {
            fechaCitaCreada = fechaEnHuecos.trim();
        })
        HuecosConHuecosPage.irAMisCitas();
        MisCitas.getFechaCita().invoke('text').then(fechaEnCita => {
            expect(fechaEnCita.trim()).to.eq(fechaCitaCreada)
        })
        //Queda comparar datos de cita creada con los datos de la cita en mis citas

    })

    after(() =>{
        Cypress.session.clearAllSavedSessions();
    })
});