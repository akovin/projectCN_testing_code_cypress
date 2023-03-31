function editAndCheck(linkToPage, itemName, apiEndpoint, lengthOfItems, response) {
  cy.visit(linkToPage, {
    headers: {
      Cookie: `auth._token.local=Bearer ${response.body.token};`
    }
  })
  cy.get('.my-references-admin-table-view').first().find('.my-references-admin-table-view__btn-open').click()
  cy.get('[data-vv-name="form.name"]').clear().type('Тестовый item edited')
  cy.get('[data-vv-name="form.active"]').click({ force: true })
  cy.get('[role="option"]').eq(1).click()
  console.log(apiEndpoint)
  cy.intercept('PUT', `${apiEndpoint}/*`).as(itemName)
  cy.get('[data-test="submit-btn"]').click()
  cy.wait(`@${itemName}`)
  cy.get('.my-references-admin-table-view').should('have.length', lengthOfItems)
  cy.get('.my-references-admin-table-view').contains('Тестовый item edited').parent().parent().parent().find('.my-references-admin-table-view__active--N')
}

describe('edit all items', () => {
  before('reset database', () => {
    cy.resetDB()
    cy.checkPageLoadWithAuth('/')
  })
  it('edit all items', () => {

    cy.request({
      method: 'POST',
      url: 'api/auth/login', // baseUrl is prepended to url
      body: { email: "admin@admin.ru", password: "123123" }
    }).then(
      (response) => {
        cy.fixture('references.json').then((references) => {
          for (let i = 0; i < references.length; i++) {
            editAndCheck(references[i].link, references[i].aliasesForRequests[1],references[i].api, references[i].expectedNumberOfItems[0] - 1, response)
          }
        })
      })
  })
})