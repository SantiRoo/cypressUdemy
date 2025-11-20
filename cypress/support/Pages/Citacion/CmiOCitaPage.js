class CmiOCitaPage{
    get cmiBtn(){return '.cmi-block button.link-block';}
    get citaProgramadaBtn(){return '.appointmentWay-block button.link-block';}

    accederCitaCmi(){
        cy.get(this.cmiBtn).click();
    }
    accederCitaProgramada(){
        cy.get(this.citaProgramadaBtn).should('be.visible').click();
    }
}

export default new CmiOCitaPage();