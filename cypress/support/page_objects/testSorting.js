export class testAllSortings {
  sortingByNumericValue(locatorOpenFilterMain,locatorOpenSorting,locatorOpenedListOfSorting,locatorValueOnCard, typeOfSorting, InitiativeValue, sortByIncreasing) {
    //проверяем сортировку по возрастанию площади
    cy.get(locatorOpenSorting).then(($el) => {
      if(!Cypress.dom.isVisible($el)){
        cy.get(locatorOpenFilterMain).wait(100).click()
      } // true
    })
    cy.get(locatorOpenSorting).click()
    cy.get(locatorOpenedListOfSorting).contains(typeOfSorting).click().wait(500)
    let valueBefore = InitiativeValue
    cy.get(locatorValueOnCard).each($el => {
      cy.wrap($el).invoke('text').then(area_number => {
        let valueAfter = Number(area_number.match(/\d+/g))
        if(sortByIncreasing){  
          cy.wrap(valueAfter).should('be.gte', valueBefore)
        }else{
          cy.wrap(valueBefore).should('be.gte', valueAfter)
        }
        valueBefore= valueAfter
      })
    })
  }
}
export const testSorting = new testAllSortings()