export class openingNew {
  testOpeningNew(locatorButton, openedUrl) {
    cy.get(locatorButton).click()
    cy.url().should('include', openedUrl)
    cy.go('back')
  }
}
export const openNew = new openingNew()