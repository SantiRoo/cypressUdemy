class FormularioCitacionPage{
    get provinciasSelector(){return cy.get('input[value="Buscar una provincia"');}
    get hospitalesSelector(){return  cy.get('input[value="Selecciona un Hospital o centro"');}
    get especialidadesSelector(){return cy.get('input[value="Selecciona una especialidad"');}
    get motivosSelector(){return cy.get('input[value="Selecciona el motivo"');}
    get profesionalesSelector(){return cy.get('input[value="Cualquier profesional"');}
    get siguienteBtn(){return cy.get('.appt-button').contains('Siguiente');}

    accederProvincias(){
        this.provinciasSelector.click();
    }
    accederHospitales(){
        this.hospitalesSelector.click();
    }
    accederEspecialidades(){
        this.especialidadesSelector.click();
    }
    accederMotivos(){
        this.motivosSelector.click();
    }
    accederProfesionales(){
        this.profesionalesSelector.click();
    }
    confirmarFormulario(){
        this.siguienteBtn.click();
    }
}