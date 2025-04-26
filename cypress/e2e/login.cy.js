/// <reference types="cypress" />
let dadosLogin
import { faker } from '@faker-js/faker';

context('Funcionalidade Login', () => {
    before(() => {
        cy.fixture('perfil').then(perfil => {
            dadosLogin = perfil
        })
    });

    beforeEach(() => {
        cy.visit('minha-conta')
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Login com sucesso usando Comando customizado', () => {
        cy.login('aluno_ebac@teste.com', 'teste@teste.com')
        cy.get('.page-title').should('contain', 'Minha conta')
        cy.cadastro(faker.person.firstName(), faker.person.lastName())
        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta')
    });

    it('Login usando fixture', () => {
        cy.fixture('perfil').then(login => {
            cy.login(login.usuario, login.senha)
        })
        cy.get('.page-title').should('contain', 'Minha conta')
    });

    it('Deve fazer login com sucesso - sem otimização', () => {
       cy.get('#username').type('aluno_ebac@teste.com')
       cy.get('#password').type('teste@teste.com', { log: false })
        cy.get('.woocommerce-form > .button').click()
        cy.get('.page-title').should('contain', 'Minha conta')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, aluno_ebac')
        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').clear().type('Aline')
        cy.get('#account_last_name').clear().type('de Morais')
        cy.get('.woocommerce-Button').click()
        cy.get('.woocommerce-message').should('exist')
    });

})