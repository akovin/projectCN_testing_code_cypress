describe('test feedback', () => {
  beforeEach('test page opening', () => {
    cy.checkPageLoad('/')
    cy.get('[href="/feedback"] span').then(element => {
      element.click()
      cy.wait(100)
    })
    cy.get('.page-feedback__header-text').contains('Форма обратной связи')
  })
  it('test form required fields', () => {
    cy.get('[data-vv-name="recipient"]').click({ force: true })
    cy.get('.v-list-item').contains('golovin@krc.karelia.ru').first().click({ force: true })
    cy.get('[data-vv-name="fio"]').type('Тестер Тест Тестович')
    cy.get('[data-vv-name="email"]').type('test@test.ru')
    cy.get('[data-vv-name="question"]').type('Тестовый вопрос')
    cy.get('.ql-editor').type('Тестовое содержимое формы')
    cy.get('[form="my-claim-client-form"]').click()
    cy.contains('Ваше обращение отправлено')
  })
  it('test form all fields', () => {
    cy.get('[data-vv-name="recipient"]').click({ force: true })
    cy.get('.v-list-item').contains('golovin@krc.karelia.ru').first().click({ force: true })
    cy.get('[data-vv-name="fio"]').type('Тестер Тест Тестович')
    cy.get('[data-vv-name="email"]').type('test@test.ru')
    cy.get('[data-vv-name="phone"]').type('555555')
    cy.get('[data-vv-name="question"]').type('Тестовый вопрос')
    cy.get('.ql-editor').type('Тестовое содержимое формы')
    cy.get('[form="my-claim-client-form"]').click()
    cy.contains('Ваше обращение отправлено')
  })
  it('test form all fields empty', () => {
    cy.get('[form="my-claim-client-form"]').click()
    cy.contains('Поле Адресат обязательно для заполнения')
    cy.contains('Поле Ваше имя обязательно для заполнения')
    cy.contains('Поле Email обязательно для заполнения')
    cy.contains('Поле Тема обязательно для заполнения')
    cy.contains('Поле Содержание обращения обязательно для заполнения')
  })
  it('test field email', () => {
    cy.get('[data-vv-name="email"]').type('test@test')
    cy.contains('Поле Email должно быть действительным электронным адресом')
  })
  it('test field phone', () => {
    cy.get('[data-vv-name="phone"]').type('ttt')
    cy.contains('Поле Телефон имеет ошибочный формат')
  })
//ql editor не удалось протестировать, не откликался на нажатия
})