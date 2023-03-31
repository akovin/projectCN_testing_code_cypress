export class visitAndCheckPages {
  visitPageAndCheck(url, assertPhrase) {
    cy.visit(url)
    cy.contains(assertPhrase)
  }
}
export const visitPageAndCheck = new visitAndCheckPages()