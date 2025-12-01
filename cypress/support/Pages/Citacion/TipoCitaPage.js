class TipoCitaPage{
    get presencialBtn(){return cy.get('.appt-optionButton-label').contains('Presencial');}
    get telefonicaBtn(){return cy.get('.appt-optionButton-label').contains('Telefónica');}
    get videollamadaBtn(){return cy.get('.appt-optionButton-label').contains('Videollamada');}
    get siguienteBtn(){return cy.get('.appt-button').contains('Siguiente')};

    seleccionarConsultaPresencial(){
        this.presencialBtn().click();
    }
    
    seleccionarConsultaTelefonica(){
        this.telefonicaBtn().click();
    }
    
    seleccionarConsultaVideollamada(){
        this.videollamadaBtn().click();
    }

    clickEnSiguiente(){
        this.siguienteBtn().click();
    }
}

export default new TipoCitaPage();