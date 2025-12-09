class HuecosPage{
    
    //Cita creada con éxito modal
    get irAMisCitasBtn(){return cy.get('appt-button').contains('Ir a Mis citas');}
    //Trabajar en la obtencion del texto correctamente
    get fechaYHoraCitaCreadaText(){return cy.get('.gapsSearch-content-data-row.date').find('gapsSearch-content-data-row-text');}
    get tipoCitaCreadaText(){return cy.get('gapsSearch-content-data-row.codCitacion').find('gapsSearch-content-data-row-text');}
    get hospitalCitaCreadaText(){return cy.get('gapsSearch-content-data-row.hospital').find('gapsSearch-content-data-row-text');}
    get especialidadYPrestacionCitaCreadaText(){return cy.get('gapsSearch-content-data-row.specialty').find('gapsSearch-content-data-row-text');}
    get profesionalCitaCreadaText(){return cy.get('gapsSearch-content-data-row.professional').find('gapsSearch-content-data-row-text');}
    get aseguradoraCitaCreadaText(){return cy.get('gapsSearch-content-data-row.insurance').find('gapsSearch-content-data-row-text');}

    irAMisCitas(){
        this.irAMisCitasBtn.click();
    }
}

export default new HuecosPage