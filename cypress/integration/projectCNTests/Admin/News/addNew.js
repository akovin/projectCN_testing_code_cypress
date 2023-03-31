describe('add new', () => {
  before('reset DB before', () => {
    cy.resetDB()
  })
  beforeEach('loginAndAuth', () => {
    cy.checkPageLoadWithAuth('/admin/news')
  })
  after('reset DB after', () => {
    cy.resetDB()
  })
  it('add new', () => {
    cy.get('[data-test="create-new"]').click()
    cy.get('[data-vv-name="form.title"]').type('Тестовое название новости')
    cy.get('[data-vv-name="form.preview"]').type('Тестовое описание новости')
    cy.get('[data-vv-name="form.text"]').type('Тестовое содержание новости')
    cy.get('[data-test="submit-btn"]').click()
    cy.contains('Тестовое название новости')
    cy.contains('Тестовое описание новости')
  })
})