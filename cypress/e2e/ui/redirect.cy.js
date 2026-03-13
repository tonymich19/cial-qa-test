describe('Redirect', () => {
    it('Verificar que redirecionamento é efetuado ao clicar no link', () => {
        cy.log('Acessando págica direct');
        cy.visit('https://the-internet.herokuapp.com/redirector');

        cy.log('Clicando no link de redirecionamento');
        cy.get('#redirect').click();

        cy.log("Validando que o redirecionamento foi efetuado com sucesso")
        cy.url().should('include', 'status_codes')


    })
})