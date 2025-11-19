class HomePage{
    //Selectors. Como se ve los punto y coma van dentro de las llaves para los selectors
    get cierreModalConfiarBtn() {return '.appt-link.btn-link';}
    get quieroPedirCitaBtn() {return '.home-tarjeta-saludo-botones__destacado.btnIcon__red';}

    cerrarModalConfiar(){
        cy.get(this.cierreModalConfiarBtn).click();
    }
    accederACitacion(){
        cy.get(this.quieroPedirCitaBtn).click();
    }
}

//Exporto la clase para que la puedan usar otros archivos
export default new HomePage();