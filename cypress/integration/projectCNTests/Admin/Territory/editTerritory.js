let chosenValue
function chooseNewValue(index) {
  cy.get('.menuable__content__active [role="option"]').eq(index).click().invoke('text').then(valueInput => {
    chosenValue = valueInput
  })
  // console.log(chosenValue.text)
}

describe('edit territory', () => {
  before('login', () => {
    cy.resetDB()
  })
  beforeEach('loginAndAuth', () => {
    cy.checkPageLoadWithAuth('/admin/areas')
  })
  it('edit territory form main', () => {
    //добавляем корректную территорию
    cy.get('.my-areas-admin-table-view__btn-open').first().click({force:true})
    cy.get('[data-test="edit-info"]').click()
    cy.get('[data-vv-name="form.cadastralNumber"]').clear().type('10:01:0010126:99')
    cy.get('[data-vv-name="form.region"]').click({ force: true })
    let chosenDistrict = {}
    let chosenCategory = {}
    let chosenUnit = {}
    let chosenOwnership = {}
    chooseNewValue(1)
    cy.then(() => {
      chosenDistrict = chosenValue
      // cy.wait(3000)
      // console.log(t)
      cy.get('[data-vv-name="form.address"]').clear().type('Тестовый адрес2')
      cy.get('[data-vv-name="form.category"]').click({ force: true })
      chooseNewValue(1)
    }).then(() => {
      chosenCategory = chosenValue
      cy.get('[data-vv-name="form.dimension.value"]').clear().type('30000')
      cy.get('[data-vv-name="form.dimension.unit"]').click({ force: true })
      chooseNewValue(1)
    }).then(() => {
      chosenUnit = chosenValue
      cy.get('[data-vv-name="form.ownership"]').click({ force: true })
      chooseNewValue(1)
    }).then(() => {
      chosenOwnership = chosenValue
      cy.get('[data-vv-name="form.description"]').clear().type('Тестовое описание 2')
      cy.get('[data-vv-name="form.buildings"]').clear().type('Тестовые существующие строения 2')
      cy.get('[data-vv-name="form.cadastralCost"]').clear().type('100000')
      cy.get('[data-vv-name="form.cost"]').clear().type('80000')
      cy.get('[data-vv-name="form.remark"]').clear().type('Тестовый комментарий 2')
      cy.get('[form="my-areas-info-update-form"]').click()
    }).then(() => {
      cy.contains('10:01:0010126:99')
      cy.contains(chosenDistrict)
      cy.contains('Тестовый адрес2')
      cy.contains(chosenCategory)
      cy.contains('30000')
      cy.contains(chosenUnit)
      cy.contains(chosenOwnership)
      cy.contains('Тестовое описание 2')
      cy.contains('Тестовые существующие строения 2')
      cy.contains('100000')
      cy.contains('80000')
      cy.contains('Тестовый комментарий 2')
    })
  })
  it('edit territory form usage', () => {
    cy.get('.my-areas-admin-table-view__btn-open').first().click()
    cy.get('[data-test="edit-usage"]').click()
    cy.get('[data-test="delete-usage"]').click()
    cy.get('#my-areas-admin-usage-form [role="button"]').first().click()
    let chosenUsageForm = {}
    let chosenUsageType = {}
    chooseNewValue(1)
    cy.then(() => {
      chosenUsageForm = chosenValue
      cy.get('#my-areas-admin-usage-form [role="button"]').eq(1).click()
      chooseNewValue(1)
    })
      .then(() => {
        chosenUsageType = chosenValue
        cy.get('[type="submit"]').click()
        cy.get('.v-card__actions > .v-btn .v-btn__content').click()
        cy.contains(chosenUsageForm)
        console.log(chosenUsageType)
        cy.contains(chosenUsageType)
      })
  })
  it('edit territory form transport', () => {
    cy.get('.my-areas-admin-table-view__btn-open').first().click()
    cy.get('[data-test="edit-transport"]').click()
    cy.get('[data-test="delete-transport"]').click()
    cy.get('#my-areas-admin-transport-form [role="button"]').first().click()
    let chosenUsageForm = {}
    let chosenUsageType = {}
    chooseNewValue(1)
    cy.then(() => {
      chosenUsageForm = chosenValue
      cy.get('[data-vv-name="form.transport-description"]').type('Тестовая транспортная инфраструктура 2')
      chosenUsageType = 'Тестовая транспортная инфраструктура 2'
      cy.get('[type="submit"]').click()
      cy.get('.v-card__actions > .v-btn .v-btn__content').click()
      cy.contains(chosenUsageForm)
      cy.contains(chosenUsageType)
    })
  })
  //не доделал
  it('edit territory form engineering', () => {
    cy.get('.my-areas-admin-table-view__btn-open').first().click()
    cy.get('[data-test="edit-engineering"]').click()
    // cy.get('[data-test="delete-engineering"]').click()
    cy.get('#my-areas-admin-engineering-form [role="button"]').first().click()
    let chosenUsageForm = {}
    let chosenUsageType = {}
    chooseNewValue(1)
    cy.then(() => {
      chosenUsageForm = chosenValue
      cy.get('[data-vv-name="form.engineering-description"]').type('Тестовая инженерная инфраструктура 2')
      chosenUsageType = 'Тестовая инженерная инфраструктура 2'
      cy.get('[type="submit"]').click()
      cy.get('.v-card__actions > .v-btn .v-btn__content').click()
      cy.contains(chosenUsageForm)
      cy.contains(chosenUsageType)
    })
  })
  it('edit territory form acquisition', () => {
    cy.get('.my-areas-admin-table-view__btn-open').first().click()
    // cy.get('[data-test="delete-usage"]').click()
    cy.get('[data-test="edit-acquisition"]').click()
    cy.get('[data-vv-name="form.acquisition"]').click({ force: true })
    let chosenAcquisition = {}
    chooseNewValue(0)
    cy.then(() => {
      chosenAcquisition = chosenValue
      cy.get('.v-card__actions > .v-btn .v-btn__content').click()
      cy.contains(chosenAcquisition)
    })
  })
  it('edit territory form contacts', () => {
    cy.get('.my-areas-admin-table-view__btn-open').first().click()
    // cy.get('[data-test="delete-usage"]').click()
    cy.get('[data-test="edit-contacts"]').click()
    cy.get('[aria-label="clear icon"]').click()
    cy.get('[data-vv-name="form.contacts"]').click({ force: true })
    let chosenContacts = {}
    chooseNewValue(0)
    cy.then(() => {
      chosenContacts = chosenValue
      cy.get('.v-card__actions > .v-btn .v-btn__content').click()
      cy.contains(chosenContacts)
    })
  })
  it('edit territory form map', () => {
    cy.get('.my-areas-admin-table-view__btn-open').first().click()
    cy.get('[data-test="change-component"]').click()
    cy.get('.leaflet-draw-draw-polygon').click()
    cy.get('.vue2leaflet-map').click('topLeft').click('topRight').click('bottom').click('topLeft')
    cy.get('.v-card__actions > .v-btn .v-btn__content').click()
  })
})