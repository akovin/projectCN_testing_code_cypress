describe('test changing language and site name exist', () => {
  beforeEach('check loading page',() => {
    cy.checkPageLoad('/')
  })
  it('test changing on english and back', () => {
    cy.contains('CN')
    cy.get('[data-test="my-main-client-header-lang-en"]').click()
    cy.contains('Home')
    cy.get('[data-test="my-main-client-header-lang-ru"]').click()
    cy.contains('CN')
  })
  it('site name exist', () => {
    cy.get('[data-test="my-main-client-header__name"]').should('be.visible')
  })
})