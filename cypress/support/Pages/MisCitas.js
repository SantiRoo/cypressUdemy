class MisCitas{
    //Trabajar en la correcta obtencion de los textos
    getFechaCita(){return cy.get('.contentFirst').find('.fecha')}
    getTipoCita(){return cy.get('.contentFirst').find('.tipo')}
}

export default new MisCitas;