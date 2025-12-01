class PrivadaOAseguradora{
    get citaPrivadaBtn(){return cy.get('.appt-optionButton-label').contains('Cita privada o seguro con reembolso');}
    get citaAseguradoraBtn(){return cy.get('.appt-optionButton-label').contains('Tengo seguro médico');}
    get condicionesSlider(){return cy.get('.slider.round');}
    get verFechasBtn(){return cy.get('.appt-button').contains('Ver fechas');}

    seleccionarCitaPrivada(){
        this.citaPrivadaBtn.click();
    }
    aceptarAbonarImporte(){
        this.condicionesSlider.click()
    }

    seleccionarCitaAseguradora(){
        this.citaAseguradoraBtn.click();
    }

    clickVerFechas(){
        this.verFechasBtn.click();
    }

    //seleccionarAseguradora(){
    //    if (cy.get('.tarjetaAseguradoraTodas').visible()){
    //        cy.get('.tarjetaAseguradoraTodas-tarjetas').first().click();
    //    }
    //    else {
    //
    //    }
    //}
}
export default new PrivadaOAseguradora();