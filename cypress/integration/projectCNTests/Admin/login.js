describe('test login', () => {
  before('reset DB', () => {
    cy.resetDB()
  })
  beforeEach('test page opening', () => {
    // cy.clearCookie('auth._token.local')
    cy.checkPageLoad('/admin')
    cy.get('.page-login__title').contains('Войти в личный кабинет')
  })
  it('test login valid', () => {
    cy.get('[data-vv-name="email"]').type('admin@admin.ru')
    cy.get('[data-vv-name="password"]').type('123123')
    cy.get('.page-login__login-btn').click()
    cy.contains('Выйти').should('be.visible')
  })
  it('test login invalid', () => {
    cy.get('[data-vv-name="email"]').type('wrong@wrong.ru')
    cy.get('[data-vv-name="password"]').type('123123')
    cy.get('.page-login__login-btn').click()
    cy.contains('Пользователя с заданным email не зарегистрировано в системе').should('be.visible')
  })
  it('test password invalid', () => {
    cy.get('[data-vv-name="email"]').type('admin@admin.ru')
    cy.get('[data-vv-name="password"]').type('555555')
    cy.get('.page-login__login-btn').click()
    cy.contains('Указанный пароль для пользователя не верен').should('be.visible')
  })
  it('test password hide', () => {
    cy.get('[data-vv-name="password"]').invoke('attr', 'type').then(typeBefore => {
      cy.get('[aria-label="append icon"]').click()
      cy.get('[data-vv-name="password"]').invoke('attr', 'type').then(typeAfter => {
        expect(typeBefore).not.to.equal(typeAfter)
        cy.get('[aria-label="append icon"]').click()
      })
      cy.get('[data-vv-name="password"]').invoke('attr', 'type').then(typeAfterSecond => {
        expect(typeBefore).to.equal(typeAfterSecond)
      })
    })
  })
  it('test counter', () => {
    cy.get('[data-vv-name="password"]').type('555555')
    cy.get('.v-counter').invoke('text').then(value => {
      expect(value).to.equal('6')
    })
  })
  it('check tips', () => {
    cy.get('[data-vv-name="email"]').type(' ')
    cy.get('[data-vv-name="password"]').type(' ')
    cy.contains('Поле Email обязательно для заполнения').should('be.visible')
    cy.contains('Поле Пароль обязательно для заполнения').should('be.visible')
    cy.get('[aria-label="clear icon"]').click({ multiple: true })
    cy.get('[data-vv-name="email"]').invoke('text').then(text => {
      expect(text).to.equal('')
    })
    cy.get('[data-vv-name="password"]').invoke('text').then(text => {
      expect(text).to.equal('')
    })
  })
  it('check tip', () => {
    cy.get('[data-vv-name="email"]').type('admin@admin.ru')
    cy.get('[data-vv-name="password"]').type('123')
    cy.contains('Поле Пароль должно быть не менее 6 символов').should('be.visible')
  })
})