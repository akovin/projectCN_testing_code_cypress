export class testAllSliders {
  testSlider(locatorText, locatorButtonNext, locatorButtonPrevoius, locatorFirstIndicator, locatorSecondIndicator) {
    cy.get(locatorFirstIndicator).should('have.class', 'v-btn--active')
    cy.get(locatorText).invoke('text').then((text1) => {
      cy.get(locatorButtonNext).click()
      cy.get(locatorText).invoke('text').should((text2) => {
        expect(text1).not.to.eq(text2)
      })
      cy.get(locatorSecondIndicator).should('have.class', 'v-btn--active')
      cy.get(locatorButtonPrevoius).click()
      cy.get(locatorText).invoke('text').should((text3) => {
        expect(text1).to.eq(text3)
      })
      cy.get(locatorFirstIndicator).should('have.class', 'v-btn--active')
    })
  }
}
export const testSlider = new testAllSliders()
