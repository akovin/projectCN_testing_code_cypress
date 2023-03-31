describe('test opening users', () => {
  before('check page loads', () => {
    cy.checkPageLoadWithAuth('/admin/users')
  })
  it('all elements exist', () => {
    cy.get('[data-test="create-user"]').should('be.visible')
    cy.get('[data-test="my-users-admin-table-view-item-fio"]').should('be.visible')
    cy.get('[data-test="my-users-admin-table-view-item-email"]').should('be.visible')
    cy.get('[data-test="my-users-admin-table-view__btn-change-password"]').should('be.visible')
    cy.get('[data-test="my-users-admin-table-view__btn-edit"]').should('be.visible')
    cy.get('[data-test="my-users-admin-table-view__active"]').should('be.visible')
  })
})