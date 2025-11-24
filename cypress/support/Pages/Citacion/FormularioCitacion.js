class FormularioCitacion{
    get provinciaSelector(){return 'input[value="Buscar una provincia"';}
    get hospitalSelector(){return 'input[value="Selecciona un Hospital o centro"'}
    get especialidadSelector() {return 'input[value="Selecciona una especialidad"'}
    get motivoSelector() {return 'input[value="Selecciona el motivo"'}
    get profesionalSelector (){return 'input[value="Cualquier profesional"'}
    
    abrirProvincias(){
        cy.get(this.provinciaSelector).click();
    }
    abrirHospitales(){
        cy.get(this.hospitalSelector).click();
    }
    abrirEspecialidades(){
        cy.get(this.especialidadSelector).click();
    }
    abrirMotivos(){
        cy.get(this.motivoSelector).click();
    }
    abrirProfesionales(){
        cy.get(this.profesionalSelector).click()
    }
    siguiente(){
        cy.get('.appt-button').contains('Siguiente').click()
    }

}

export default new FormularioCitacion();