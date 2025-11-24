class FormularioCitacionMotivosPage{
    get consultaConUnMedicoBtn(){return cy.get('.appt-optionButton').contains('Consulta con un médico');}
    get pruebaOTratamientoBtn(){return cy.get('.appt-optionButton').contains('Realizar una prueba o tratamiento');}

    seleccionarConsultaConMedico(){
        this.consultaConUnMedicoBtn.should('be.visible').click();
    }
    seleccionarPrueba(){
        this.pruebaOTratamientoBtn.should('be.visible').click();
    }
}
export default new FormularioCitacionMotivosPage();