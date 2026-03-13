describe('Upload', () => {
    it('Verificar que arquivo é enviado com sucesso', () => {
        cy.log('Acessando página upload');
        cy.visit('https://the-internet.herokuapp.com/upload');

        cy.log('Selecionando Arquivo');
        cy.get('#file-upload').selectFile('cypress/fixtures/testfile.txt');

        cy.log('Enviando arquivo');
        cy.get('#file-submit').click();

        cy.log('Validando que arquivo foi enviado');
        cy.get('h3').should('have.text', 'File Uploaded!');

    })
})