class MisCitas{
    //Trabajar en la correcta obtencion de los textos
    get fechaCitaText(){return cy.get('contentFirst').find('.fecha').invoke('text')}
    get tipoCitaText(){return cy.get('contentFirst').find('.tipo').invoke('text')}
}