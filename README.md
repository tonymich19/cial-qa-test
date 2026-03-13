# CIAL Teste - UI and API

Projeto de automação de testes com Cypress, cobrindo cenários de UI e API.

## Tecnologias utilizadas 

- Cypress
- JavaScript
- Docker
- Docker Compose


## Testes de UI

Os testes de interface foram implementados com base nos componentes solicitados no desafio, utilizando o site:

`https://the-internet.herokuapp.com`

### Cenários cobertos

- Checkboxes - Verificar que checkboxes sao marcados e desmarcados
- Drag and Drop - Verificar que quadrados são movidos de coluna
- Dropdown - Verificar que opção do dropbox é selecionável
- Upload File -  Verificar que arquivo é enviado com sucesso
- Login - Varificar que Login é efetuado com sucesso/Verificar que Login falha ao informar credenciais inválidas
- Redirect Link - Verificar que redirecionamento é efetuado ao clicar no link

### Observação sobre Drag and Drop

O cenário de Drag and Drop pode apresentar comportamento inconsistente em automação por causa da implementação HTML5 da página utilizada no desafio. Mesmo assim, o teste foi estruturado para demonstrar a lógica de automação e validação esperada.

## Testes de API

A API pública utilizada foi:

`GET https://jsonplaceholder.typicode.com/users`

Foi criado um comando customizado no arquivo:

`cypress/support/commands.js`

### Responsabilidade do comando customizado

O comando `getProcessedUsers()` é responsável por:

- consumir a API com `cy.request()`
- aplicar transformações e normalizações nos dados retornados
- usar `cy.log()` para registrar o fluxo e os resultados processados
- disponibilizar os dados tratados para reuso em outros testes
- permitir parametrização opcional com baseUrl, rota, filtros e flags
- permitir criação opcional de alias

### Transformações aplicadas com RegEx

Foram aplicadas pelo menos 3 transformações de formatação, incluindo:

1. **Phone**
   - remove todos os caracteres não numéricos
   - exemplo: `1-770-736-8031 x56442` → `1770736803156442`

2. **Website**
   - remove `http://`, `https://` e `www.`
   - converte para minúsculo

3. **Company Name**
   - remove espaços duplicados e aplica `trim()`

4. **Username**
   - remove caracteres especiais, mantendo apenas letras, números, `_` e `-`

5. **Zipcode**
   - remove caracteres inválidos, mantendo apenas números e hífen

6. **Email**
   - aplica `trim()` e converte para minúsculo

7. **Name**
   - remove espaços duplicados

### Parâmetros suportados pelo comando

O comando suporta parametrização opcional:

- `baseUrl`
- `route`
- `userId`
- `useAlias`
- `aliasName`
- `onlyMainFields`

### Exemplos de uso

```javascript
cy.getProcessedUsers()
```

```javascript
cy.getProcessedUsers({ userId: 1 })
```

```javascript
cy.getProcessedUsers({ onlyMainFields: true })
```

```javascript
cy.getProcessedUsers({ useAlias: true, aliasName: "processedUsers" })
```

## Como executar localmente

Instale as dependências:

```bash
npm install
```

Abrir o Cypress em modo interativo:

```bash
npx cypress open
```

Executar todos os testes em modo headless:

```bash
npx cypress run
```

Executar apenas os testes de API:

```bash
npx cypress run --spec "cypress/e2e/api/users-api.cy.js"
```

Executar apenas os testes de UI:

```bash
npx cypress run --spec "cypress/e2e/frontend/**/*.cy.js"
```

## Execução com Docker

Este projeto pode ser executado em container utilizando o `Dockerfile`.

### Build da imagem

```bash
docker build -t cypress-tests .
```

### Executar os testes no container

```bash
docker run --rm cypress-tests
```

## Execução com Docker Compose

Também é possível executar com Docker Compose.

### Subir a execução

```bash
docker compose up --build
```

## Exemplo de Dockerfile

O projeto utiliza um `Dockerfile` para construir um ambiente padronizado de execução dos testes com Cypress.

```dockerfile
FROM cypress/included:15.11.0

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

CMD ["npx", "cypress", "run"]
```

## Observações finais

- Os testes de UI e API estão no mesmo projeto para facilitar a revisão e execução.
- A lógica de consumo e transformação dos dados da API foi centralizada em `cypress/support/commands.js`, conforme solicitado no desafio.
- As validações foram mantidas nos arquivos de teste para melhor separação de responsabilidades.
