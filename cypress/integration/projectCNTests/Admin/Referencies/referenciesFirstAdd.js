function addItemActive(referenceAddItem, itemName, numberAfterAddActive) {
  cy.get('[data-test="create"]').click()
  cy.get('[data-vv-name="form.name"]').type('Тестовый item активный')
  cy.get('[data-vv-name="form.active"]').click({ force: true })
  cy.get('[role="option"]').first().click()
  cy.intercept('POST', referenceAddItem).as(itemName)
  cy.get('[data-test="submit-btn"]').click()
  cy.wait(`@${itemName}`)
  cy.get('.my-references-admin-table-view').should('have.length', numberAfterAddActive)
  cy.get('.my-references-admin-table-view').contains('Тестовый item активный').parent().parent().parent().find('.my-references-admin-table-view__active--Y')
}

function addItemArchive(referenceAddItem, itemName, numberAfterAddArchive) {
  cy.get('[data-test="create"]').click()
  cy.get('[data-vv-name="form.name"]').type('Тестовый item архивный')
  cy.get('[data-vv-name="form.active"]').click({ force: true })
  cy.get('[role="option"]').eq(1).click()
  cy.intercept('POST', referenceAddItem).as(itemName)
  cy.get('[data-test="submit-btn"]').click()
  cy.wait(`@${itemName}`)
  cy.get('.my-references-admin-table-view').should('have.length', numberAfterAddArchive)
  //здесь надо добавить проверку на Архивность my-references-admin-table-view__active--N пока баг не исправлен не имееет смысла
  cy.get('.my-references-admin-table-view').contains('Тестовый item архивный').parent().parent().parent().find('.my-references-admin-table-view__active')
}

function checkIfElementsExist(){
  //когда будет исправлен баг с созданием архивной записи, здесь надо добавить проверку, что статус стоит архивная
  cy.get('.menuable__content__active').contains('Тестовый item активный')
  cy.get('.menuable__content__active').contains('Тестовый item архивный')
}

describe('add all items', () => {
  before('login and open page users', () => {
    cy.resetDB()
    cy.checkPageLoadWithAuth('/')
  })
  it('add all items', () => {

    cy.request({
      method: 'POST',
      url: 'api/auth/login', // baseUrl is prepended to url
      body: { email: "admin@admin.ru", password: "123123" }
    }).then(
      (response) => {
        cy.fixture('references.json').then((references) => {
          for (let i = 0; i < references.length; i++) {
            cy.log(`ADDING NEW ITEMS ACTIVE AND ARCHIVE IN ${references[i].link}`)
            cy.visit(references[i].link, {
              headers: {
                Cookie: `auth._token.local=Bearer ${response.body.token};`
              }
            })
            addItemActive(references[i].api, references[i].aliasesForRequests[0], references[i].expectedNumberOfItems[0])
            addItemArchive(references[i].api, references[i].aliasesForRequests[1], references[i].expectedNumberOfItems[1])
          }
        })
        cy.visit('/admin/areas', {
          headers: {
            Cookie: `auth._token.local=Bearer ${response.body.token};`
          }
        })
        cy.get('[data-test="create-territory"]').click({force:true})
        cy.get('[data-vv-name="form.region"]').click({force: true})
        cy.get('.menuable__content__active').scrollTo('bottom')
        checkIfElementsExist()
        cy.get('[data-vv-name="form.category"]').click({force: true})
        checkIfElementsExist()
        cy.get('[data-vv-name="form.ownership"]').click({force: true})
        checkIfElementsExist()
        cy.get('[data-vv-name="form.kindId"]').click({force: true})
        checkIfElementsExist()
        cy.get('#my-areas-admin-usage-form').find('[data-vv-name="form.optionId"]').click({force: true})
        checkIfElementsExist()
        cy.get('#my-areas-admin-transport-form').find('[data-vv-name="form.optionId"]').click({force: true})
        checkIfElementsExist()
        cy.get('#my-areas-admin-engineering-form').find('[data-vv-name="form.optionId"]').click({force: true})
        checkIfElementsExist()
        cy.get('[data-vv-name="form.acquisition"]').click({force: true})
        checkIfElementsExist()
      })
  })
})