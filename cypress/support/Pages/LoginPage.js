class LoginPage{
    //Selectors. Como se ve los punto y coma van dentro de las llaves para los selectors
    get logoQS() {return '.logo-box';}
    get sobreTitulo() {return '.seccion-titulo h1';}
    get titulo(){return '.miquironsalud-text';}
    get subTitulo(){return '.iniciar-sesion-text';}
    get emailLabel(){return 'p.appt-selector-label.p-email label';}
    get emailInput(){return '#dvLogin';}
    get passwordInput(){return '#dvPass';}
    get resetPasswordBtn(){return '.reset-password-text a';}
    get iniciarSesionBtn(){return '.form-login-box-boton';}
    get acceptCookiesBtn(){return '#onetrust-accept-btn-handler';}

    visit(){
        cy.visit('https://uat.quironsalud.com/idcsalud-client/cm/portal-paciente/tkMain')
    }
    acceptCookies(){
        cy.get(this.acceptCookiesBtn).click(); 
    }

    fillLoginForm(email, password){
        cy.get(this.emailInput).click();
        cy.get(this.emailInput).type(email);
        cy.get(this.passwordInput).click();
        cy.get(this.passwordInput).type(password);
    }

    submitLoginForm(){
        cy.get(this.iniciarSesionBtn).click();
    }
}
//Exporto la clase para que la puedan usar otros archivos
export default new LoginPage();