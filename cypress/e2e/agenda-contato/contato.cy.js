/// <reference types="cypress" />

describe('Testes para a página de contatos', () => {
  const nome = 'Anderson Lopes';
  const email = 'andersonlopes017@gmail.com';
  const telefone = '99 9999999';

  beforeEach(() => {
    cy.visit('https://agenda-contatos-react.vercel.app/')
  })

  it('Deve preencher o formulário de contato apenas se o nome não existir', () => {
    cy.get('.sc-beqWaB.eQdhbg.contato').then(list => {
      if (!list.text().includes(nome)) {
        cy.get('input[type=text]').type(nome)
        cy.get('input[type=email]').type(email)
        cy.get('input[type=tel]').type(telefone)
        cy.get('button.adicionar').click()
        cy.get('.sc-beqWaB.eQdhbg.contato').should('contain', nome)
        cy.screenshot('tela-contato-preenchido')
      }
    })
  })

  it('Deve atualizar o contato', () => {
    cy.get(':nth-child(5) > .sc-gueYoa > .edit').click()
    cy.get('input[type=text]').clear()
    cy.get('input[type=text]').type(`${nome} Atualizado`)
    cy.get('button[type=submit]').click()
    cy.get('.sc-beqWaB.eQdhbg.contato').should('contain', `${nome} Atualizado`)
    cy.screenshot('tela-contato-atualizado')
  })

  it('Deve excluir o contato', () => {
    cy.get(':nth-child(5) > .sc-gueYoa > .delete').click()
    cy.get('.contato').should('not.contain', nome)
    cy.screenshot('tela-contato-excluido')
  })
})
