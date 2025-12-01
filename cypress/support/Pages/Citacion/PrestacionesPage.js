class PrestacionesPage{
    seleccionarPrestacion(prestacion){
        cy.get('.appt-optionButton-label').contains(prestacion).click();
    }
}
export default new PrestacionesPage();