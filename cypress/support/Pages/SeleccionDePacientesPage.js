class SeleccionDePacientesPage{
    get pacienteTitularBtn() {return cy.get('.listadoPatient li').first();}
    get continuarBtn() {return cy.get('#buttonContinuar');}

    seleccionarPacienteTitular() {
        this.pacienteTitularBtn.click();
        this.continuarBtn.click();
    }
}

export default new SeleccionDePacientesPage;