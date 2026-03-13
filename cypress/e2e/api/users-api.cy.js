describe('Users API', () => {
    it('Validar consumo da API de usuários e aplicar tratamento de formatação', () => {

        cy.getProcessedUsers().then((processedUsers) => {

            expect(processedUsers).to.be.an('array').that.is.not.empty;
            processedUsers.forEach(user => {
                expect(user).to.have.property('id').that.is.a('number');
                expect(user).to.have.property('name').that.is.a('string').and.is.not.empty;
                expect(user).to.have.property('username').that.is.a('string').and.is.not.empty;
                expect(user).to.have.property('email').that.is.a('string').and.matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
                expect(user).to.have.property('phone').that.is.a('string').and.matches(/^\d+$/);
                expect(user).to.have.property('website').that.is.a('string').and.matches(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

                expect(user).to.have.property('address').that.is.an('object');
                expect(user).to.have.property('company').that.is.an('object');

                expect(user.address).to.have.property('street').that.is.a('string').and.is.not.empty;
                expect(user.address).to.have.property('suite').that.is.a('string').and.is.not.empty;
                expect(user.address).to.have.property('city').that.is.a('string').and.is.not.empty;
                expect(user.address).to.have.property('zipcode').that.is.a('string').and.matches(/^\d+$/);

                expect(user.address).to.have.property('geo').that.is.an('object');
                expect(user.address.geo).to.have.property('lat').that.is.a('string').and.matches(/^-?\d+(\.\d+)?$/);
                expect(user.address.geo).to.have.property('lng').that.is.a('string').and.matches(/^-?\d+(\.\d+)?$/);

                expect(user.company).to.have.property('name').that.is.a('string').and.is.not.empty;
                expect(user.company).to.have.property('catchPhrase').that.is.a('string').and.is.not.empty;
                expect(user.company).to.have.property('bs').that.is.a('string').and.is.not.empty;


            });
        });
    });

    it("Validar as transformações de formatação", () => {
        cy.log("Validando as regras de transformação");

        cy.getProcessedUsers().then((users) => {
            users.forEach((user) => {
                expect(user.phone).to.match(/^\d+$/);
                expect(user.website).to.not.match(/^https?:\/\//i);
                expect(user.website).to.not.match(/^www\./i);
                expect(user.website).to.eq(user.website.toLowerCase());
                expect(user.company.name).to.eq(user.company.name.trim());
                expect(user.username).to.match(/^[\w-]+$/);
                expect(user.address.zipcode).to.match(/^[\d-]+$/);
            });
        });
    });

    it("Validar permissão de filtro por userId", () => {
        cy.log("Filtrando usuário por id");

        cy.getProcessedUsers({ userId: 1 }).then((users) => {
            expect(users).to.have.length(1);
            expect(users[0].id).to.eq(1);
        });
    });


    it("Validar retorno resumido com a flag onlyMainFields", () => {
        cy.log("Buscando usuários com apenas os campos principais");

        cy.getProcessedUsers({ onlyMainFields: true }).then((users) => {
            expect(users).to.be.an("array");
            expect(users.length).to.be.greaterThan(0);

            users.forEach((user) => {
                expect(user).to.include.all.keys("id", "name", "email", "phone", "website");
            });
        });
    });

    it("Validar reutilização com alias", () => {
        cy.log("Criando alias com os usuários processados");

        cy.getProcessedUsers({
            useAlias: true,
            aliasName: "processedUsers"
        });

        cy.get("@processedUsers").then((users) => {
            cy.log("Validando dados recuperados via alias");

            expect(users).to.be.an("array");
            expect(users.length).to.be.greaterThan(0);
        });
    });

});