describe('edit territory', () => {
  before('login', () => {
    cy.resetDB()
  })
  beforeEach('loginAndAuth', () => {
    cy.checkPageLoadWithAuth('/admin/areas')
  })
  it('buttons hide, archive, delete', () => {
    cy.get('.my-areas-admin-table-view__btn-publish').first().click()
    cy.get('.my-areas-admin-table-view').first().find('.my-areas-admin-table-view__status--new')
    cy.get('.my-areas-admin-table-view__btn-archive').click()
    cy.get('[data-test="success"]').click({ force: true })
    cy.get('.my-areas-admin-table-view').first().find('.my-areas-admin-table-view__status--archive')
    cy.get('.my-areas-admin-table-view').should('have.length', 3)
    cy.get('.my-areas-admin-table-view__btn-delete').click()
    cy.get('[data-test="success"]').click({ force: true })
    cy.get('.my-areas-admin-table-view').should('have.length', 2)
  })
  it('buttons hide, archive, restore, publish', () => {
    cy.get('.my-areas-admin-table-view__btn-publish').first().click()
    cy.get('.my-areas-admin-table-view').first().find('.my-areas-admin-table-view__status--new')
    cy.get('.my-areas-admin-table-view__btn-archive').click()
    cy.get('[data-test="success"]').click({ force: true })
    cy.get('.my-areas-admin-table-view').first().find('.my-areas-admin-table-view__status--archive')
    cy.get('.my-areas-admin-table-view__btn-archive').click()
    cy.get('.my-areas-admin-table-view').first().find('.my-areas-admin-table-view__status--new')
    cy.get('.my-areas-admin-table-view__btn-publish').first().click()
    cy.get('.my-areas-admin-table-view').first().find('.my-areas-admin-table-view__status--published')
  })
})