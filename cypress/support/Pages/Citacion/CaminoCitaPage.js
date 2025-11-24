class CaminoCitaPage{
    get porHospital(){return cy.get('.button-list button.appt-optionButton').eq(0);}
    get porEspecialidad(){return cy.get('.button-list button.appt-optionButton').eq(1);}
    get porProfesional(){return cy.get('.button-list button.appt-optionButton').eq(2);}

    accederCitaPorHospital(){
        this.porHospital.click()
    }
    accederCitaPorEspecialidad(){
        this.porHospital.click()
    }
    accederCitaPorProfesional(){
        this.porHospital.click()
    }
}

export default new CaminoCitaPage();