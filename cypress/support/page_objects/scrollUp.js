export class scrollingUp {
  scrollUp(locatorButton) {
    cy.scrollTo('bottom')
    cy.get(locatorButton).click()
  }
}
export const scrollUp = new scrollingUp()