function addTestingUser(authToken) {
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
      Authorization: `Bearer ${authToken}`
    }
  })
  cy.reload()
}

describe('change password', () => {
  before('login and open page users', () => {
    cy.resetDB()
    cy.checkPageLoadWithAuth('/admin/users').then(() => {
      addTestingUser(Cypress.env('authToken'))
    })
  })
  after('DBreset', () => {
    cy.resetDB()
  })
  it('change password', () => {
    //смена пароля
    cy.contains('Тестовая фамилия').parent().parent().contains('Сменить пароль').click({force:true})
    cy.get('[data-vv-name="password"]').type('12345678910')
    cy.get('[data-vv-name="confirmPassword"]').type('12345678910')
    cy.get('[data-test="submit-btn"]').click()
    cy.request('POST', '/api/auth/logout').then(() => {
      cy.request({
        method: 'POST',
        url: Cypress.env('apiLoginAdmin'), // baseUrl is prepended to url
        body: { email: Cypress.env('emailAdmin'), password: Cypress.env('passwordAdmin') }
      })
    })
  })
})