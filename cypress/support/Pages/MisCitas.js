class MisCitas{
    //Trabajar en la correcta obtencion de los textos
    getFechaCita(){return cy.get('.contentFirst').find('.fecha')};
    getTipoCita(){return cy.get('.contentFirst').find('.tipo')};
    getPrestacion(){return cy.get('.texto-destacado').eq(0)}
    getEspecialidad(){return cy.get('texto-destacado').eq(1)}
    getCentro(){return cy.get('.centro').first()}
    getProfesional(){return cy.get('.profesional').first()};
    get anularCitaBtn(){return cy.get('*[id^="eliminar_cita_desktop"]')}
    get confirmarAnulacionBtn(){return cy.get('#eliminar_cita_confirmar')}

    anularCita(){
        this.anularCitaBtn.click()
        this.confirmarAnulacionBtn.click()
    }
}

export default new MisCitas;