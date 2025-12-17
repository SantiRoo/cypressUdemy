import HuecosPage from "./HuecosPage";

class HuecosConHuecosPage extends HuecosPage{
    
    getFechaYHoraCitaCreada(){return cy.get('.gapsSearch-content-data-row.date').find('.gapsSearch-content-data-row-text');}
    getTipoCitaCreada(){return cy.get('.gapsSearch-content-data-row.codCitacion').find('.gapsSearch-content-data-row-text');}
    getHospitalCitaCreada(){return cy.get('.gapsSearch-content-data-row.hospital').find('.gapsSearch-content-data-row-text');}
    getEspecialidadYPrestacionCitaCreada(){return cy.get('gapsSearch-content-data-row.specialty').find('.gapsSearch-content-data-row-text');}
    getProfesionalCitaCreada(){return cy.get('.gapsSearch-content-data-row.professional').find('.gapsSearch-content-data-row-text');}
    getAseguradoraCitaCreada(){return cy.get('.gapsSearch-content-data-row.insurance').find('.gapsSearch-content-data-row-text');}
    get irAMisCitasBtn(){return cy.get('.appt-button').contains('Ir a Mis citas');}




    
    //Le pasamos el alias de llamada a huecos para que espere a que termine dicha llamada
    seleccionarYConfirmarHueco(llamadaPending, llamadaHuecos){
        cy.wait(llamadaPending);
        cy.wait(llamadaHuecos);
        cy.get('.isFirstGap').click();
        cy.get('.gaps .gap-button').first().click();
        cy.intercept('POST', '/idcsalud-client/cm/portal-paciente/pdp-api/v1/appointment/new').as('creacionCita')
        cy.get('.appt-button').contains('Confirmar cita').click();
        cy.wait('@creacionCita');
        cy.get('.appointmentConfirmSummary').should('be.visible')  
    }
    irAMisCitas(){
        this.irAMisCitasBtn.click();
    }
    
}

export default new HuecosConHuecosPage;