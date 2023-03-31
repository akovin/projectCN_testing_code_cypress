export class changingLanguage {
  changeLangByVal(locatorButtonActive, locatorButtonNotActive, attribute) {
    cy.get(locatorButtonActive).invoke(attribute).then(valLangActivePrevious => {
      cy.get(locatorButtonNotActive).click()
      cy.get(locatorButtonActive).invoke(attribute).then(valLangActiveNext => {
        expect(valLangActivePrevious).not.to.equal(valLangActiveNext)
      })
      //вернуть в прежнее состояние
      cy.get(locatorButtonNotActive).click()
    })
  }
}
export const changeLang = new changingLanguage()





