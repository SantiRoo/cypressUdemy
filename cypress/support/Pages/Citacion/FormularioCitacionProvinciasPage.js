class FormularioCitacionProvinciasPage{
    seleccionarProvincia(provincia){
        cy.get('.appt-optionButton-label').contains(provincia).click();
    }
}
export default new FormularioCitacionProvinciasPage();