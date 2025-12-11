class FormularioCitacionCentrosPage{
    get todosLosCentrosBtn(){return '.select-all-button';};
    get listaHospitales(){return '.hospitals-list'};
    getCentroBtn(nombreCentro){return cy.get('.hospital-btn').find('.name').contains(nombreCentro)};
    get expandirCentrosBtn(){return cy.contains('button', 'Ver todos los edificios o centros')}

    seleccionarTodosLosCentros(){
        cy.get(this.todosLosCentrosBtn).click()
    }

    seleccionarCentro(nombreCentro){
        this.getCentroBtn(nombreCentro).click()
    }

    expandirCentros(){
        this.expandirCentrosBtn.click()
    }

    
}

export default new FormularioCitacionCentrosPage();