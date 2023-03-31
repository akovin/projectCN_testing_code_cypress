describe('test about page opening', () => {
  //проверяем все ссылки на странице
  beforeEach('check loading page',() => {
    cy.checkPageLoad('/')
  })
  it('test page about', () => {
    cy.get('[href="/about"] span').then(element => {
      element.click()
    })
    cy.get('.page-about__header-text').contains('О проекте')
  })
})