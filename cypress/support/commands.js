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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
// let counterSkips = {
//   counter: 0
// 
Cypress.Commands.add('resetDB', (pageToLoad) => {
  cy.exec('docker exec -i navigatorregistryofterritory_db_1 mongorestore --username "navigator-user" --password "password" --db navigator --archive --drop < 2021-01-19', { timeout: 120000 })
})

Cypress.Commands.add('openPageAdmin', (pageToLoad) => {
  cy.intercept('GET', pageToLoad).as('visitPage')
  cy.visit(pageToLoad, {}).wait('@visitPage')
})

Cypress.Commands.add('loginAndOpenPageAdmin', (pageToLoad) => {
  cy.intercept('GET', pageToLoad).as('visitPage')
  cy.request({
    method: 'POST',
    url: Cypress.env('apiLoginAdmin'), // baseUrl is prepended to url
    body: { email: Cypress.env('emailAdmin'), password: Cypress.env('passwordAdmin') }
  }).then(
    (response) => {
      Cypress.env('authToken', response.body.token)
      cy.visit(pageToLoad, {
        headers: {
          Cookie: `auth._token.local=Bearer ${Cypress.env('authToken')};`
        }
      }
      )
    }).wait('@visitPage')
})

Cypress.Commands.add('checkPageLoadWithAuth', (pageToLoad) => {
  cy.loginAndOpenPageAdmin(pageToLoad)
    .get("body").then($body => {
      cy.log('ПРОВЕРКА НА ЗАГРУЗКУ СТРАНИЦЫ, ВОЗМОЖНО ОЖИДАНИЕ')
      if ($body.find('.v-avatar').length > 0) {
        if ($body.find('.page-login__login-btn').length > 0) {
          cy.loginAndOpenPageAdmin(pageToLoad)
        }
      } else {
        cy.wait(3000)
        cy.checkPageLoadWithAuth(pageToLoad)
      }
    })
})

Cypress.Commands.add('checkPageLoad', (pageToLoad) => {
  cy.openPageAdmin(pageToLoad)
    .get("body").then($body => {
      cy.log('ПРОВЕРКА НА ЗАГРУЗКУ СТРАНИЦЫ, ВОЗМОЖНО ОЖИДАНИЕ')
      if ($body.find('.v-avatar').length > 0) {
      } else {
        cy.wait(3000)
        cy.checkPageLoad(pageToLoad)
      }
    })
})

Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  console.log('options for visit', options)
  return originalFn(url, options)
})

// Cypress.Commands.overwrite('request', (originalFn, url, options) => {
//   // options.timeout = 30000
//   console.log('options for request', options)
//   return originalFn(url, options)
// })

Cypress.Commands.overwrite('request', (originalFn, url, options) => {
  return originalFn(url, options)
});