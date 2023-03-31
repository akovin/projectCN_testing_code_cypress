describe('buttons work', () => {
  before('reset DB', () => {
    cy.resetDB()
  })
  beforeEach('loginAndAuth', () => {
    cy.checkPageLoadWithAuth('/admin/news')
  })
  it('buttons hide, delete work', () => {
    cy.get('[data-test="my-news-admin-table-view-row-title"] .my-helper-card-column-item__text').first().invoke('text').then(title => {
      cy.get('[data-test="my-news-admin-table-view-row-title"] .my-helper-card-column-item__text').eq(1).invoke('text').then(title2 => {
        cy.contains(title.trim())
        cy.get('[data-test="my-news-admin-table-view-btn-publish"]').first().click().wait(100)
        cy.get('.my-news-admin-table-view').first().find('.my-news-admin-table-view__status--new').should('be.visible')
        cy.intercept('DELETE', '**/news/*').as('deleteNew')
        cy.get('[data-test="my-news-admin-table-view-btn-delete"]').first().click()
        cy.get('[data-test="success"]').click()
        cy.wait('@deleteNew').its('response.statusCode').should('be.equal', 200).then( () => {
          cy.get('[data-test="my-news-admin-table-view-row-title"]:first-child .my-helper-card-column-item__text', { timeout: 10000 }).should('include.text', title2.trim())
        })
      })
    })
  })
  it('buttons hide, publish work', () => {
    cy.get('[data-test="my-news-admin-table-view-btn-publish"]').first().click().wait(100)
    cy.get('.my-news-admin-table-view').first().find('.my-news-admin-table-view__status--new').should('be.visible')
    cy.get('[data-test="my-news-admin-table-view-btn-publish"]').first().click().wait(100)
    cy.get('.my-news-admin-table-view').first().find('.my-news-admin-table-view__status--published').should('be.visible')
  })
})