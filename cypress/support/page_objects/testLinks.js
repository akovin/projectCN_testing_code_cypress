export class testAllLinks {
  testLinks(locator) {
    cy.get(locator).then(hrefs => {
      for (let i = 0; i < hrefs.length; i++) {
        cy.get(hrefs[i])
          .invoke('attr', 'href')
          .then(href => {
            href = href.trim()
            if (href.includes('http')) {
              cy.request(href).its('status').should('eq', 200)
            }
            else if (href.includes('files')) {
            }
            else {
              cy.visit(href).go('back')
            }

          })
      }
    })
  }
}
export const testLinks = new testAllLinks()