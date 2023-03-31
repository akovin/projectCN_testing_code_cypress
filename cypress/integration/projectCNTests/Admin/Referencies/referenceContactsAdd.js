describe('add contacts', () => {
  before('login and open page users', () => {
    cy.resetDB()
  })
  beforeEach('loginAndAuth', () => {
    cy.checkPageLoadWithAuth('/admin/references/contact')
  })
  it('add contact', () => {
    //Тест добавления контакта только с обязательными полями
    cy.get('[data-test="create"]').click()
    cy.get('[data-vv-name="form.fio"]').type('Тестовый Тест Тестович')
    cy.get('[data-vv-name="form.email"]').type('test@test.ru')
    cy.get('[data-vv-name="form.active"]').scrollIntoView()
    cy.get('[data-vv-name="form.active"]').parent().parent().parent().click()
    cy.get('[role="option"]').first().click()
    cy.get('[data-test="submit-btn"]').click()
    cy.contains('Тестовый Тест Тестович')
    //тест на добавление контакта со всеми полями
    cy.get('[data-test="create"]').click()
    cy.get('[data-vv-name="form.fio"]').type('Тестовый2 Тест2 Тестович2')
    cy.get('[data-vv-name="form.email"]').type('test@test.ru')
    cy.get('[data-vv-name="form.phone"]').type('5555555')
    cy.get('[data-vv-name="form.phoneMobile"]').type('88888888')
    cy.get('[data-vv-name="form.post"]').type('Тестовая должность')
    cy.get('[data-vv-name="form.organization"]').type('Тестовая организация')
    cy.get('[data-vv-name="form.active"]').scrollIntoView()
    cy.get('[data-vv-name="form.active"]').parent().parent().parent().click()
    cy.get('[role="option"]').first().click()
    cy.get('[data-test="submit-btn"]').click()
    cy.contains('Тестовый2 Тест2 Тестович2')
    cy.visit('/admin/areas', {
      headers: {
        Cookie: `auth._token.local=Bearer ${Cypress.env('authToken')};`
      }
    })
    cy.get('[data-test="create-territory"]').click()
    cy.get('[data-vv-name="form.contacts"]').parent().parent().parent().click()
    cy.get('.menuable__content__active').contains('Тестовый Тест Тестович')
    cy.get('.menuable__content__active').contains('Тестовый2 Тест2 Тестович2')
  })
})