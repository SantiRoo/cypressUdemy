class HuecosConHuecosPage{

    //Le pasamos el alias de llamada a huecos para que espere a que termine dicha llamada
    seleccionarYConfirmarHueco(llamadaHuecos){
        cy.wait(llamadaHuecos)
        cy.get('.isFirstGap').click()
        cy.get('.gaps .gap-button')
        cy.intercept('POST', '/idcsalud-client/cm/portal-paciente/pdp-api/v1/appointment/new').as('creacionCita')
        cy.get('.appt-button').contains('Confirmar cita').click();
        cy.wait('@creacionCita');
        cy.get('.appointmentConfirmSummary').should('be.visible')  
    }
}

export default new HuecosConHuecosPage;