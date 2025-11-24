class FormularioCitacionCentrosPage{
    get todosLosCentrosBtn(){return '.select-all-button';}

    seleccionarTodosLosCentros(){
        cy.get(this.todosLosCentrosBtn).click()
    }
}

export default new FormularioCitacionCentrosPage();