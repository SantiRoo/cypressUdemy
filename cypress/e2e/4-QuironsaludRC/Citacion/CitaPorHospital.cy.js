import LoginPage from "../../../support/Pages/LoginPage";
import SeleccionDePacientesPage from "../../../support/Pages/SeleccionDePacientesPage";
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
    //LoginPage.acceptCookies();
    const email = 'santi@rc.es'
    const password = 'Tester01'
    LoginPage.fillLoginForm(email, password);
    LoginPage.submitLoginForm();
    cy.url().should('include', '/tkMain')
}

describe('Tests Cita Por Hospital', () => {
    beforeEach(()=>{
        cy.session('paciente logueado', loginPaciente);
        cy.visit('https://rc.quironsalud.com/idcsalud-client/cm/portal-paciente/tkMain');
    })

    afterEach(() =>{
        Cypress.session.clearAllSavedSessions();
    })

    it('Cita por hospital - Multicentro (Provincia) - Cita Privada',() => {
        SeleccionDePacientesPage.seleccionarPacienteTitular();
        CmiOCitaPage.visit()
        HomePage.cerrarModalConfiar();
        CmiOCitaPage.accederCitaProgramada();
        CaminoCitaPage.accederCitaPorHospital();
        FormularioCitacionPage.accederProvincias();
        FormularioCitacionProvinciasPage.seleccionarProvincia('A Coruña')
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
        cy.intercept('POST', '/idcsalud-client/cm/portal-paciente/pdp-api/v1/appointment/peticion/pending').as('llamadaPending');
        cy.intercept('POST', '/idcsalud-client/cm/portal-paciente/pdp-api/v1/citas/huecos').as('llamadaHuecos');
        PrivadaOAseguradora.clickVerFechas();
        //Le pasamos las intercepciones de arriba, y se manejan los waits dentro de huecos
        HuecosConHuecosPage.seleccionarYConfirmarHueco('@llamadaPending','@llamadaHuecos');
        //Me guardo todos los datos de la cita creada
        let fechaCitaCreada;
        let hospitalCitaCreada;
        HuecosConHuecosPage.getFechaYHoraCitaCreada().invoke('text').then(fechaEnHuecos => {
            fechaCitaCreada = fechaEnHuecos.trim();
        })
        HuecosConHuecosPage.getHospitalCitaCreada().invoke('text').then(hospitalEnHuecos => {
            hospitalCitaCreada = hospitalEnHuecos.trim();
        })
        //Voy a "Mis citas"
        cy.intercept('POST', '/idcsalud-client/cm/portal-paciente/pdp-api/v1/citas/all').as('llamadaCitasAll');
        HuecosConHuecosPage.irAMisCitas();
        cy.wait('@llamadaCitasAll')

        //Comparo los datos de la modal de cita confirmada con los datos en "Mis citas"
        MisCitas.getFechaCita().invoke('text').then(fechaEnMisCitas => {
            expect(fechaEnMisCitas.trim()).to.eq(fechaCitaCreada)
        })
        MisCitas.getCentro().invoke('text').then(hospitalEnMisCitas => {
            expect(hospitalEnMisCitas.trim()).to.eq(hospitalCitaCreada)
        })
        cy.intercept('POST', '/idcsalud-client/cm/portal-paciente/pdp-api/v1/cancel/appointment?isNotificationAppointment=false').as('llamadaAnulacion')
        MisCitas.anularCita();
        cy.wait('@llamadaAnulacion').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        })
        

    })

    it('Cita por hospital - Centro específico - Cita Privada - Presencial',() =>{
        cy.visit('https://rc.quironsalud.com/idcsalud-client/cm/portal-paciente/tkMain')
        cy.get('.listadoPatient li')
        .first()
        .click();
        cy.get('#buttonContinuar').click();
        CmiOCitaPage.visit();
        HomePage.cerrarModalConfiar();
        CmiOCitaPage.accederCitaProgramada();
        CaminoCitaPage.accederCitaPorHospital();
        FormularioCitacionPage.accederProvincias();
        FormularioCitacionProvinciasPage.seleccionarProvincia('A Coruña');
        FormularioCitacionPage.accederHospitales();
        FromularioCitacionCentrosPage.expandirCentros();
        FromularioCitacionCentrosPage.seleccionarCentro('Centro Médico Quirónsalud A Coruña (Riazor)')
    })

    it('Cita por hospital - Centro específico - Cita Privada - Telefónica', () => {

    })

    it('Cita por hospital - Centro específico - Cita Privada - Videoconsulta', () => {

    })

    it('Cita por hospital - Centro específico - Cita Privada - Videoconsulta', () => {

    })    

});