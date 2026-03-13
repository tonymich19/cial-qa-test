describe('Login', () => {
    it('Varificar que Login é efetuado com sucesso', () =>{
        cy.log('Acessando página de Login');
        cy.visit('https://the-internet.herokuapp.com/login');

        cy.log("preenchendo username");
        cy.get('[name="username"]').type('tomsmith');
        
        cy.log("preenchendo senha");
        cy.get('[name="password"]').type('SuperSecretPassword!');

        cy.log('clicando no botão Login');
        cy.get('.fa').click();

        cy.log('Validando que o login foi efetuado com sucesso');
        cy.url().should('include', 'secure');
        cy.get('#flash').should('contain.text', 'You logged into a secure area!');

    });

    it('Verificar que Login falha ao informar credenciais inválidas', () =>{
        cy.log('Acessando página de Login');
        cy.visit('https://the-internet.herokuapp.com/login');

        cy.log("preenchendo username");
        cy.get('[name="username"]').type('tomsmith');
        
        cy.log("preenchendo senha");
        cy.get('[name="password"]').type('SuperSecretPassword@');

        cy.log('clicando no botão Login');
        cy.get('.fa').click();

        cy.log('Validando que o login falhou com as credenciais inválidas');
        cy.url().should('include', 'login');
        cy.get('#flash').should('contain.text', 'Your password is invalid!');

    });
});
