describe('DropDown', () => {
    it('Verificar que opção do dropbox é selecionável', () => {
        cy.log('Acessando a página dropdown');
        cy.visit('https://the-internet.herokuapp.com/dropdown');

        cy.get('#dropdown')
            .select('Option 2')
            .should('have.value', '2');

    })
})