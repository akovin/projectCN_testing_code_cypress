function addTestingUser() {
  //создание тестовой записи
  cy.request({
    method: 'POST',
    url: '/api/news', // baseUrl is prepended to url
    body: { title: "Тестовое название новости", preview:"Тестовое описание новости", text: "Тестовое содержание новости", lang: "ru" },
    headers: {
      Authorization: `Bearer ${Cypress.env('authToken')}`
    }
  }).then(() => {
    cy.reload()
  })
}

describe('edit new', () => {
  before('reset DB before', () => {
    cy.resetDB()
  })
  beforeEach('loginAndAuth', () => {
    cy.checkPageLoadWithAuth('/admin/news')
  })
  after('reset DB after', () => {
    cy.resetDB()
  })
  it('edit new', () => {
    addTestingUser()
    cy.get('[data-test="my-news-admin-table-view-btn-open"]').first().click()
    cy.get('[data-test="new-edit"]').click()
    cy.get('[data-vv-name="form.name"]').clear().type('Название новости edited')
    cy.get('[data-vv-name="form.preview"]').clear().type('Описание новости edited')
    cy.get('.ql-editor').clear().type('Содержание новости edited')
    cy.get('[type="submit"]').click()
  })
})