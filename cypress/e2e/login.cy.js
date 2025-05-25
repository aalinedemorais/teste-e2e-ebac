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

    it('Login usando fixture', () => {
        cy.fixture('perfil').then(login => {
            cy.login(login.usuario, login.senha)
        })
        cy.get('.page-title').should('contain', 'Minha conta')
        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').clear().type('Aline')
        cy.get('#account_last_name').clear().type('de Morais')
        cy.get('#account_display_name').clear().type('Aline')
        cy.get('.woocommerce-Button').click()
        cy.get('.woocommerce-message').should('exist')
    });

})