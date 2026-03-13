describe('Drag and Drop', () => {
    it('Verificar que quadrados são movidos de coluna', () => {
        
        cy.log('Acessando a página drag and drop');
        cy.visit('https://the-internet.herokuapp.com/drag_and_drop');

        cy.log('Criando objeto DataTransfer para o HTML5 drag and drop');
        cy.window().then((win) => {
            const dataTransfer = new win.DataTransfer()
        cy.log('Iniciando o drag na coluna A')
        cy.get('#column-a').trigger('dragstart', { dataTransfer });

        cy.log('Soltando a coluna A sobre a coluna B')
        cy.get('#column-b').trigger('drop', { dataTransfer });

        cy.log('Finalizando o drag')
        cy.get('#column-a').trigger('dragend', { dataTransfer });
        });

        cy.log('Validando que quadrado foi movido');
        cy.get('#column-a')
            .should('have.text', 'B');
        
        cy.get('#column-b')
            .should('have.text', 'A');
            

    });
});