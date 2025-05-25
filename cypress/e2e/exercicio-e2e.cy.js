/// <reference types="cypress"/>
import produtosPage from "../support/page_objects/produtos.page";

describe('Funcionalidade: Produtos', () => {

    //context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        produtosPage.VisitarURL()
    });

    it('Login', () => {
        cy.login('aluno_ebac@teste.com', 'teste@teste.com')
        cy.get('.page-title').should('contain', 'Minha conta')
    })

    it('Buscando produto', () => {
        let produto = 'Aether Gym Pant'
        produtosPage.buscarProduto(produto)
        cy.get('.product_title').should('contain', produto)
        cy.get('.button-variable-item-33').click()
        cy.get('.button-variable-item-Brown').click()
        cy.get('.single_add_to_cart_button').click()
        cy.get('.woocommerce-message').should('contain', 'no seu carrinho.')
    });

    it('Visitando a página do produto', () => {
        produtosPage.visitarProduto('Arcadio Gym Short')
        cy.get('.product_title').should('contain', 'Arcadio Gym Short')
        cy.get('.button-variable-item-36').click()
        cy.get('.button-variable-item-Red').click()
        cy.get('.single_add_to_cart_button').click()
        cy.get('.woocommerce-message').should('exist')
    });

    it('Adicionando com page objects', () => {
        produtosPage.buscarProduto('Ariel Roll Sleeve Sweatshirt')
        let qtd = 1
        produtosPage.addProdutoCarrinho('XL', 'Green', qtd)
        cy.get('.woocommerce-message').should('contain', 'no seu carrinho.')
    });

    it('Adicionando produto com massa de dados', () => {
        cy.fixture('produtos').then(dados => {
            produtosPage.buscarProduto(dados[1].nomeProduto)
            produtosPage.addProdutoCarrinho(
                dados[1].tamanho,
                dados[1].cor,
                dados[1].quantidade)
            cy.get('.woocommerce-message').should('contain', dados[1].nomeProduto)
        })
    });

    it('Concluindo a compra', () => {
        cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()
        cy.get('.checkout-button').click()
        cy.get('#terms').click()
        cy.get('#place_order').click()
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    });

});