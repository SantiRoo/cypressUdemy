//Importamos la pagina que contiene los selectors y los metodos
import LoginPage from "../../../support/Pages/LoginPage";

describe ('Tests Login Page', () => {
    beforeEach(()=>{
        LoginPage.visit();
        LoginPage.acceptCookies();
    })

    it('Validar Presencia de elementos en pantalla',()=>{
        cy.get(LoginPage.logoQS).should('be.visible');
        cy.get(LoginPage.sobreTitulo).should('include.text', 'Portal del paciente')
        cy.get(LoginPage.titulo).should('include.text', 'Mi Quirónsalud')
        cy.get(LoginPage.subTitulo).should('include.text', 'Inicia sesión')
        cy.get(LoginPage.emailLabel).should('include.text', 'Correo electrónico')
        cy.get(LoginPage.emailInput).should('be.visible').should('have.attr', 'placeholder', 'nombre@mail.com');
        cy.get(LoginPage.passwordInput).should('be.visible');
        cy.get(LoginPage.resetPasswordBtn)
        .should('include.text', '¿Has olvidado tu contraseña?')
        .should('have.attr', 'href')
        .and('include', '/idcsalud-client/cm/portal-paciente/tkResetCurrentPasswd');
        cy.get(LoginPage.iniciarSesionBtn).should('be.visible')
        .and('include.text','Entrar') 
    })
    it('Iniciar sesión', () => {
        LoginPage.fillLoginForm('santi@rc.es', 'Tester01');
        LoginPage.submitLoginForm();
        cy.url().should('be.equal', 'https://rc.quironsalud.com/idcsalud-client/cm/portal-paciente/tkDfa');
    })
})