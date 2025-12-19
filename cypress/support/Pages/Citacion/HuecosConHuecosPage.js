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
        cy.wait(llamadaHuecos).then((interception) => {
            const fechaHueco = interception.response.body[1].fechaCitaStr;
            const horaHueco = interception.response.body[1].horaCitaStr;
            const centroHueco = interception.response.body[1].idCentro;
            const idHueco = `[id="table_calendar_hour_${fechaHueco}_${horaHueco}_${centroHueco}"]`;
            cy.get(idHueco).click();
        });
       //cy.get('.isFirstGap').click();
       //cy.get('.gaps .gap-button').first().click();
        cy.intercept('POST', '/idcsalud-client/cm/portal-paciente/pdp-api/v1/appointment/new').as('creacionCita')
        cy.get('.appt-button').contains('Confirmar cita').click();
        //Hay que encadenar esto para que el idCita llegue al test
        return cy.wait('@creacionCita').then((interception)=> {
            const idCita = interception.response.body.idCita;
            return cy.get('.appointmentConfirmSummary').should('be.visible').then(()=> {return idCita}) 
        });
    }
    irAMisCitas(){
        this.irAMisCitasBtn.click();
    }
    
}

export default new HuecosConHuecosPage;