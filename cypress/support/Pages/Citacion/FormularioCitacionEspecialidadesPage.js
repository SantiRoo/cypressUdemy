class FormularioCitacionEspecialidadesPage{
    seleccionarEspecialidad(especialidad){
        cy.get('.estilizado').contains(especialidad).click()
    }
}

export default new FormularioCitacionEspecialidadesPage();