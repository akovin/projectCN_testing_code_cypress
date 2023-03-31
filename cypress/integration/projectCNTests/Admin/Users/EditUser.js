function addTestingUser() {
  //создание тестовой записи
  cy.request({
    method: 'POST',
    url: '/api/user', // baseUrl is prepended to url
    body: {
      "firstname": "Тестовая фамилия",
      "secondname": "Тестовое имя",
      "lastname": "Тестовое отчество",
      "email": "test@test.ru",
      "post": "Тестовая должность",
      "phone": "555555",
      "role": [
        "admin"
      ],
      "active": "Y",
      "password": "123456789"
    },
    headers: {
      Authorization: `Bearer ${Cypress.env('authToken')}`
    }
  }).then(() => {
    cy.reload()
  })
}

describe('test editing user', () => {
  before('login and open page users', () => {
    cy.resetDB()
  })
  beforeEach('DBreset', () => {
    cy.checkPageLoadWithAuth('/admin/users')
  })
  after('DBreset', () => {
    cy.resetDB()
  })
  it('testing edit user', () => {
    //редактирование тестовой записи
    addTestingUser()
    cy.contains('Тестовая фамилия').parent().parent().contains('Редактировать').click()
    cy.get('[data-vv-name="form.lastname"]').last().type('-edited')
    cy.get('[data-vv-name="form.firstname"]').last().type('-edited')
    cy.get('[data-vv-name="form.secondname"]').last().type('-edited')
    cy.get('[data-vv-name="form.phone"]').last().type('66')
    cy.get('[data-vv-name="form.email"]').last().type('e')
    cy.get('[data-vv-name="form.post"]').last().type('-edited')
    cy.get('[data-vv-name="form.role"]').last().click({ force: true })
    cy.get('.menuable__content__active .v-list-item').last().click()
    cy.get('[data-test="dialog"]').last().click()
    cy.get('[data-vv-name="form.active"]').last().click({ force: true })
    cy.get('.menuable__content__active .v-list-item').last().click()
    cy.get('[data-test="submit-btn"]').last().click()
    cy.contains('Тестовая фамилия-edited')
  })
  it('editing user fails', () => {
    //редактирование пользователя не удачно
    cy.contains('Тестовая фамилия').parent().parent().contains('Редактировать').click()
    cy.get('[data-vv-name="form.lastname"]').last().clear()
    cy.get('[data-vv-name="form.firstname"]').last().clear()
    cy.get('[data-vv-name="form.secondname"]').last().clear()
    cy.get('[data-vv-name="form.phone"]').last().clear()
    cy.get('[data-vv-name="form.email"]').last().clear()
    cy.get('[data-vv-name="form.post"]').last().clear()
    cy.get('[data-vv-name="form.role"]').parent().parent().find('[aria-label="clear icon"]').click()
    cy.get('[data-test="submit-btn"]').last().click()
    cy.get('[data-vv-name="form.lastname"]').parent().parent().parent().parent().should('have.class', 'v-input--has-state')
    cy.get('[data-vv-name="form.firstname"]').parent().parent().parent().parent().should('have.class', 'v-input--has-state')
    cy.get('[data-vv-name="form.secondname"]').parent().parent().parent().parent().should('have.class', 'v-input--has-state')
    cy.get('[data-vv-name="form.phone"]').parent().parent().parent().parent().should('have.class', 'v-input--has-state')
    cy.get('[data-vv-name="form.email"]').parent().parent().parent().parent().should('have.class', 'v-input--has-state')
    cy.get('[data-vv-name="form.post"]').parent().parent().parent().parent().should('have.class', 'v-input--has-state')
    cy.get('[data-vv-name="form.role"]').parent().parent().parent().parent().parent().should('have.class', 'v-input--has-state')
  })
  it('test cancel btn', () => {
    //проверка кнопки отмены
    cy.get('.v-dialog__content.v-dialog__content--active').should('not.exist')
    cy.contains('Тестовая фамилия').parent().parent().contains('Редактировать').click()
    cy.get('.v-dialog__content.v-dialog__content--active').should('exist')
    cy.get('[data-test="close-btn"]').click()
    cy.get('.v-dialog__content.v-dialog__content--active').should('not.exist')
  })
  it('test close btn icon', () => {
    cy.get('.v-dialog__content.v-dialog__content--active').should('not.exist')
    cy.contains('Тестовая фамилия').parent().parent().contains('Редактировать').click()
    cy.get('.v-dialog__content.v-dialog__content--active').should('exist')
    cy.get('[data-test="close-btn-icon"]').click()
    cy.get('.v-dialog__content.v-dialog__content--active').should('not.exist')
  })
  it('test email tip', () => {
    cy.contains('Тестовая фамилия').parent().parent().contains('Редактировать').click()
    cy.get('[data-vv-name="form.email"]').clear().type('tst')
    cy.get('[data-vv-name="form.email"]').parent().parent().parent().parent().should('have.class', 'v-input--has-state')
  })
})