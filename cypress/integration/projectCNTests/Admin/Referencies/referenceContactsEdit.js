describe('add contacts', () => {
  before('login and open page users', () => {
    cy.resetDB()
  })
  beforeEach('loginAndAuth', () => {
    cy.checkPageLoadWithAuth('/admin/references/contact')
  })
  it('add contact', () => {
        cy.get('.my-references-admin-table-contact-view .my-references-admin-table-contact-view__btn-open').click()
        cy.get('[data-vv-name="form.fio"]').clear().type('Тестовый3 Тест3 Тестович3')
        cy.get('[data-vv-name="form.email"]').clear().type('test@test.ru')
        cy.get('[data-vv-name="form.phone"]').clear().type('5555555')
        cy.get('[data-vv-name="form.phoneMobile"]').clear().type('88888888')
        cy.get('[data-vv-name="form.post"]').clear().type('Тестовая должность')
        cy.get('[data-vv-name="form.organization"]').clear().type('Тестовая организация')
        cy.get('[data-vv-name="form.active"]').scrollIntoView()
        cy.get('[data-vv-name="form.active"]').parent().parent().parent().click()
        cy.get('[role="option"]').eq(1).click()
        cy.get('[data-test="submit-btn"]').click()
        cy.get('.my-references-admin-table-contact-view').contains('Тестовый3 Тест3 Тестович3')
        cy.get('.my-references-admin-table-contact-view').find('.my-references-admin-table-contact-view__active--N')
      })
})