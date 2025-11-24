class FormularioCitacionProfesionalesPage{
    get todosLosProfesionales(){return cy.get('button').contains('Seleccionar todos los profesionales');}

    seleccionarTodosLosProfesionales(){
        this.todosLosProfesionales().click()
    }

    seleccionarProfesional(profesional){
        cy.get('.professional-btn').contains(profesional).click()
    }
}

export default new FormularioCitacionProfesionalesPage();