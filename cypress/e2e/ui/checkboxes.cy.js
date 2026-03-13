describe('Checkboxes', () => {
    it('Verificar que checkboxes sao marcados e desmarcados', () => {
        
        cy.log('Acessando a pagina CheckBoxes');
        cy.visit('https://the-internet.herokuapp.com/checkboxes');

        cy.log('Marcando o primeiro checkbox');
        cy.get('input[type="checkbox"]')
            .first()
            .check()
            .should('be.checked');

        cy.log('Desmarcando o segundo checkbox');
        cy.get('input[type="checkbox"]')
            .last()
            .uncheck()
            .should('not.be.checked');
    });
});