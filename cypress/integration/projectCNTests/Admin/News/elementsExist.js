describe('elements should exist news', () => {
  beforeEach('loginAndAuth', () => {
    cy.checkPageLoadWithAuth('/admin/news')
  })
  it('some elements should exist, which dont persist in other tests', () => {
    cy.get('[data-test="my-news-admin-table-view-row-title"]').should('be.visible')
    cy.get('[data-test="my-news-admin-table-view-row-preview"]').should('be.visible')
  })
})