class PrimeraOSucesivaPage{
    get primeraBtn(){return '.appt-button.btn-yes';}
    get sucesivaBtn(){return 'appt-button.secondary.no-hover'}

    seleccionarPrimeraCita(){
        cy.get(this.primeraBtn).click();
    }

    seleccionarYaEstoyProcMedico(){
        cy.get(this.sucesivaBtn).click();
    }
}

export default new PrimeraOSucesivaPage();