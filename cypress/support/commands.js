// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("getProcessedUsers", (options = {}) => {

    const baseUrl =
        options.baseUrl ||
        Cypress.env("apiBaseUrl") ||
        "https://jsonplaceholder.typicode.com";

    const route = options.route || "/users";
    const userId = options.userId ?? null;
    const useAlias = options.useAlias ?? false;
    const aliasName = options.aliasName || "processedData";
    const onlyMainFields = options.onlyMainFields ?? false;

    cy.log("Iniciando consumo da API de usuários...");
    cy.log(`Base URL: ${baseUrl}`);
    cy.log(`Rota: ${route}`);

    return cy.request({
        method: "GET",
        url: `${baseUrl}${route}`,
    }).then((response) => {
        cy.log(`Status code recebido: ${response.status}`);
        cy.log(`Quantidade de usuários recebidos: ${response.body.length}`);

        let users = response.body;

        if (userId !== null) {
            cy.log(`Filtrando usuário com ID: ${userId}`);
            users = users.filter(user => user.id === userId);
        }

        cy.log("Aplicando tratamento de formatação com Regex...");

        const processedUsers = users.map(user => {
            const normalizedPhone = user.phone.replace(/\D+/g, "");

            const normalizedWebsite = user.website
                .replace(/^(https?:\/\/)?(www\.)?/, "");

            const normalizedCompanyName = user.company.name
                .replace(/\s+/g, " ").trim();

            const normalizedUsername = user.username
                .replace(/[^\w-]/g, "")
                .trim();

            const normalizeZipcode = user.address.zipcode
                .replace(/\D+/g, "")
                .trim();

            const normalizedEmail = user.email
                .toLowerCase()
                .trim();

            const normalizedName = user.name
                .replace(/\s+/g, " ")
                .trim();

            const formattedUser = {
                id: user.id,
                name: normalizedName,
                username: normalizedUsername,
                email: normalizedEmail,
                phone: normalizedPhone,
                website: normalizedWebsite,
                company: {
                    name: normalizedCompanyName,
                    catchPhrase: user.company.catchPhrase,
                    bs: user.company.bs
                },
                address: {
                    street: user.address.street,
                    suite: user.address.suite,
                    city: user.address.city,
                    zipcode: normalizeZipcode,
                    geo: {
                        lat: user.address.geo.lat,
                        lng: user.address.geo.lng
                    }
                }
            };

            if (onlyMainFields) {
                return {
                    id: formattedUser.id,
                    name: formattedUser.name,
                    email: formattedUser.email,
                    phone: formattedUser.phone,
                    website: formattedUser.website
                };
            }

            return formattedUser;
        });

        cy.log(`Quantidade final de usuários processados: ${processedUsers.length}`);
        cy.log(`Primeiro usuário processado: ${JSON.stringify(processedUsers[0])}`);

        if (useAlias) {
            cy.wrap(processedUsers, { log: false }).as(aliasName);
            cy.log(`Alias "${aliasName}" criado com os dados processados.`);
        }
        return cy.wrap(processedUsers, { log: false });
    });

});
