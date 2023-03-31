const { testSorting } = require("../../../support/page_objects/testSorting")

describe('test page territory', () => {
  before('test page opening', () => {
    cy.checkPageLoad('/')
    cy.get('[href="/land-plots"] span').then(element => {
      element.click()
    })
    cy.get('.my-areas-client-header__text').contains('Инвестиционная карта')
  })
  beforeEach('renew page territory', () => {
    cy.checkPageLoad('/land-plots').wait(1000)
  })
  it('test elements exist on page', () => {
    cy.get('.my-areas-client-header .v-input').should('be.visible')
    cy.get('.my-areas-client-filter').should('be.visible')
    cy.get('.my-areas-client-table__card').should('have.length', 3).should('be.visible')
    cy.get('.my-areas-client-table__card').find('.my-areas-client-table__status').should('have.length', 3).and('be.visible')
    cy.get('.my-areas-client-table__card').find('.my-areas-client-table__btn-open').should('have.length', 3).and('be.visible')
    cy.get('.my-areas-client-table__card').first().find('.my-helper-card-column-item__text').should('have.length', 7).and('be.visible')
  })
  it('check main filter', () => {
    cy.get('.my-areas-client-header .v-input').click()
    cy.get('[role="option"]').first().invoke('text').then((text1) => {
      cy.get('[role="option"]').first().click().wait(500).then(() => {
        cy.get('.my-areas-client-table__card').each($el => {
          cy.wrap($el).find('[data-test="Район"] .my-helper-card-column-item__text').invoke('text').then(text2 => {
            expect(text2).to.have.string(text1)
          })
        })
      })
    })
  })
  it('check cadastral number  filter', () => {
    //проверка фильтра по кадастровому номеру
    cy.get('.my-areas-client-filter > button').click()
    cy.get('[data-test="Кадастровый номер"] .my-helper-card-column-item__text').first().invoke('text').then(cad_number_before => {
      cy.get('.my-areas-client-filter [data-test="Кадастровый номер"]').type(cad_number_before).wait(1500)
      cy.get('[data-test="Кадастровый номер"] .my-helper-card-column-item__text').each($el => {
        cy.wrap($el).invoke('text').then(cad_number_after => {
          expect(cad_number_after).to.equal(cad_number_before)
        })
      })
    })
  })
  it('check minimal area filter', () => {
    //проверка фильтра по минимальному значению площади
    cy.get('[data-test="Площадь"] .my-helper-card-column-item__text').first().invoke('text').then(area_before => {
      const area_number_before = Number(area_before.match(/\d+/g))
      cy.get('.my-areas-client-filter > button').click()
      cy.get('.my-areas-client-filter [data-test="Минимальное значение площади"]').type(area_number_before).wait(1500)
      cy.get('[data-test="Площадь"] .my-helper-card-column-item__text').each($el => {
        cy.wrap($el).invoke('text').then(area_number => {
          const area_number_after = Number(area_number.match(/\d+/g))
          cy.wrap(area_number_after).should('be.gte', area_number_before)
        })
      })
    })
  })
  it('check maximum area filter', () => {
    //проверка фильтра по минимальному значению площади
    cy.get('[data-test="Площадь"] .my-helper-card-column-item__text').first().invoke('text').then(area_before => {
      const area_number_before = Number(area_before.match(/\d+/g))
      cy.get('.my-areas-client-filter > button').click()
      cy.get('.my-areas-client-filter [data-test="Максимальное значение площади"]').type(area_number_before).wait(1500)
      cy.get('[data-test="Площадь"] .my-helper-card-column-item__text').each($el => {
        cy.wrap($el).invoke('text').then(area_number => {
          const area_number_after = Number(area_number.match(/\d+/g))
          cy.wrap(area_number_before).should('be.gte', area_number_after)
        })
      })
    })
  })
  //по Гектару не проверяю фильтрацию, т.к. она не работает
  it('check sorting insrease and decrease area', () => {
    testSorting.sortingByNumericValue('.my-areas-client-filter > button', '.my-areas-client-filter [data-test="Сортировать по"]',
      '.v-menu__content', '[data-test="Площадь"] .my-helper-card-column-item__text', 'Возрастанию площади', 0, true)
    testSorting.sortingByNumericValue('.my-areas-client-filter > button', '.my-areas-client-filter [data-test="Сортировать по"]',
      '.v-menu__content', '[data-test="Площадь"] .my-helper-card-column-item__text', 'Убыванию площади', 10000000000000000, false)
  })
  it('check sorting new first first', () => {
    cy.reload().wait(1000)
    cy.get('.my-areas-client-filter > button').click().wait(300)
    cy.get('.my-areas-client-filter [data-test="Сортировать по"]').contains('Сначала новые').click().wait(500)
    var dayBefore = 32
    var monthBefore = 13
    var yearBefore = 3000
    var hourBefore = 25
    var minuteBefore = 61
    cy.get('.my-areas-client-table__status').each($el => {
      cy.wrap($el).invoke('text').then(text => {
        var datePublish = text.substr(23, 14)
        var matches = datePublish.match(/(\d{2})\.(\d{2})\.(\d{2}) (\d{2}):(\d{2})$/)
        var day = parseInt(matches[1], 10)
        var month = parseInt(matches[2], 10)
        var year = parseInt(matches[3], 10)
        var hour = parseInt(matches[4], 10)
        var minute = parseInt(matches[5], 10)
        if (year < yearBefore) {
          yearBefore = year
          monthBefore = month
          dayBefore = day
          hourBefore = hour
          minuteBefore = minute
        } else if (year > yearBefore) {
          throw new Error("test fails here")
        } else if (year = yearBefore) {
          if (month < monthBefore) {
            yearBefore = year
            monthBefore = month
            dayBefore = day
            hourBefore = hour
            minuteBefore = minute
          } else if (month > monthBefore) {
            throw new Error("test fails here")
          } else if (month = monthBefore) {
            if (day < dayBefore) {
              yearBefore = year
              monthBefore = month
              dayBefore = day
              hourBefore = hour
              minuteBefore = minute
            } else if (day < dayBefore) {
              throw new Error("test fails here")
            } else if (day = dayBefore) {
              if (hour < hourBefore) {
                yearBefore = year
                monthBefore = month
                dayBefore = day
                hourBefore = hour
                minuteBefore = minute
              } else if (hour > hourBefore) {
                throw new Error("test fails here")
              } else if (hour = hourBefore) {
                if (minute < minuteBefore) {
                  yearBefore = year
                  monthBefore = month
                  dayBefore = day
                  hourBefore = hour
                  minuteBefore = minute
                } else if (minute > minuteBefore) {
                  throw new Error("test fails here")
                } else if (minute = minuteBefore) {
                  yearBefore = year
                  monthBefore = month
                  dayBefore = day
                  hourBefore = hour
                  minuteBefore = minute
                }
              }
            }
          }
        }
      })
    })
  })
  it('check sorting old first', () => {
    cy.get('.my-areas-client-filter > button').wait(300).click().wait(300)
    cy.get('.my-areas-client-filter [data-test="Сортировать по"]').click()
    cy.get('.v-list-item__content').contains('Сначала старые').click().wait(1500)
    var dayBefore = 0
    var monthBefore = 0
    var yearBefore = 0
    var hourBefore = 0
    var minuteBefore = 0
    cy.get('.my-areas-client-table__status').each($el => {
      cy.wrap($el).invoke('text').then(text => {
        var datePublish = text.substr(23, 14)
        var matches = datePublish.match(/(\d{2})\.(\d{2})\.(\d{2}) (\d{2}):(\d{2})$/)
        var day = parseInt(matches[1], 10)
        var month = parseInt(matches[2], 10)
        var year = parseInt(matches[3], 10)
        var hour = parseInt(matches[4], 10)
        var minute = parseInt(matches[5], 10)
        if (year > yearBefore) {
          yearBefore = year
          monthBefore = month
          dayBefore = day
          hourBefore = hour
          minuteBefore = minute
        } else if (year < yearBefore) {
          throw new Error("test fails here")
        } else if (year = yearBefore) {
          if (month > monthBefore) {
            yearBefore = year
            monthBefore = month
            dayBefore = day
            hourBefore = hour
            minuteBefore = minute
          } else if (month < monthBefore) {
            throw new Error("test fails here")
          } else if (month = monthBefore) {
            if (day > dayBefore) {
              yearBefore = year
              monthBefore = month
              dayBefore = day
              hourBefore = hour
              minuteBefore = minute
            } else if (day < dayBefore) {
              throw new Error("test fails here")
            } else if (day = dayBefore) {
              if (hour > hourBefore) {
                yearBefore = year
                monthBefore = month
                dayBefore = day
                hourBefore = hour
                minuteBefore = minute
              } else if (hour < hourBefore) {
                throw new Error("test fails here")
              } else if (hour = hourBefore) {
                if (minute > minuteBefore) {
                  yearBefore = year
                  monthBefore = month
                  dayBefore = day
                  hourBefore = hour
                  minuteBefore = minute
                } else if (minute < minuteBefore) {
                  throw new Error("test fails here")
                } else if (minute = minuteBefore) {
                  yearBefore = year
                  monthBefore = month
                  dayBefore = day
                  hourBefore = hour
                  minuteBefore = minute
                }
              }
            }
          }
        }
      })
    })
  })
  it('check sorting by cadastral number increasing', () => {
    cy.get('.my-areas-client-filter > button').wait(300).click().wait(300)
    cy.get('.my-areas-client-filter [data-test="Сортировать по"]').click()
    cy.get('.v-list-item__content').contains('Кадастровому номеру от А до Я').click().wait(1500)
    var cadastralNumberBeforeText = '00:00:0000000:00'
    var cadastralNumberBefore = cadastralNumberBeforeText.match(/(\d{1})(\d{1})\:(\d{1})(\d{1})\:(\d{1})(\d{1})(\d{1})(\d{1})(\d{1})(\d{1,2}):(\d{1})(\d{1})/)
    cy.get('[data-test="Кадастровый номер"] .my-helper-card-column-item__text').each($el => {
      cy.wrap($el).invoke('text').then(cadastralNumberAfterText => {
        var cadastralNumberAfter = cadastralNumberAfterText.match(/(\d{1})(\d{1})\:(\d{1})(\d{1})\:(\d{1})(\d{1})(\d{1})(\d{1})(\d{1})(\d{1,2}):(\d{1})(\d{1})/)
        console.log(cadastralNumberAfter)
        for (var i = 1; i < cadastralNumberAfter.length; i++) {
          console.log(i)
          var cypherCadNumberBefore = cadastralNumberBefore[i]
          var cypherCadNumberAfter = cadastralNumberAfter[i]
          if (cypherCadNumberAfter > cypherCadNumberBefore) {
            break
          } else if (cypherCadNumberAfter < cypherCadNumberBefore) {
            throw new Error("test fails here")
          } else {
            continue
          }
        }
        cadastralNumberBefore = cadastralNumberAfter
      })
    })
  })
  it('check sorting by cadastral number decreasing', () => {
    cy.get('.my-areas-client-filter > button').wait(300).click().wait(300)
    cy.get('.my-areas-client-filter [data-test="Сортировать по"]').click()
    cy.get('.v-list-item__content').contains('Кадастровому номеру от Я до А').click().wait(1500)
    var cadastralNumberBeforeText = '99:99:9999999:99'
    var cadastralNumberBefore = cadastralNumberBeforeText.match(/(\d{1})(\d{1})\:(\d{1})(\d{1})\:(\d{1})(\d{1})(\d{1})(\d{1})(\d{1})(\d{1,2}):(\d{1})(\d{1})/)
    cy.get('[data-test="Кадастровый номер"] .my-helper-card-column-item__text').each($el => {
      cy.wrap($el).invoke('text').then(cadastralNumberAfterText => {
        var cadastralNumberAfter = cadastralNumberAfterText.match(/(\d{1})(\d{1})\:(\d{1})(\d{1})\:(\d{1})(\d{1})(\d{1})(\d{1})(\d{1})(\d{1,2}):(\d{1})(\d{1})/)
        console.log(cadastralNumberAfter)
        for (var i = 1; i < cadastralNumberAfter.length; i++) {
          console.log(i)
          if (i == 10 && cadastralNumberAfter[i].length == 2) {
            var cypherCadNumberBefore = cadastralNumberBefore[i].match(/(\d{1})(\d{1})/)
            var cypherCadNumberAfter = cadastralNumberAfter[i]
            if (cypherCadNumberAfter[0] < cypherCadNumberBefore[0]) {
              if (cypherCadNumberAfter[1] < cypherCadNumberBefore[1]) {
                break
              } else if (cypherCadNumberAfter[1] > cypherCadNumberBefore[1]) {
                throw new Error("test fails here")
              } else {
                continue
              }
            } else if (cypherCadNumberAfter[0] > cypherCadNumberBefore[0]) {
              throw new Error("test fails here")
            } else {
              if (cypherCadNumberAfter[1] < cypherCadNumberBefore[1]) {
                break
              } else if (cypherCadNumberAfter[1] > cypherCadNumberBefore[1]) {
                throw new Error("test fails here")
              } else {
                continue
              }
            }

          } else if (i == 10 && cadastralNumberAfter[i].length == 1) {
            var cypherCadNumberBefore = cadastralNumberBefore[i].match(/^(\d{1})/)
            var cypherCadNumberAfter = cadastralNumberAfter[i]
            if (cypherCadNumberAfter < cypherCadNumberBefore) {
              break
            } else if (cypherCadNumberAfter > cypherCadNumberBefore) {
              throw new Error("test fails here")
            } else {
              continue
            }
          }
          else {
            var cypherCadNumberBefore = cadastralNumberBefore[i]
            var cypherCadNumberAfter = cadastralNumberAfter[i]
            if (cypherCadNumberAfter < cypherCadNumberBefore) {
              break
            } else if (cypherCadNumberAfter > cypherCadNumberBefore) {
              throw new Error("test fails here")
            } else {
              continue
            }
          }
        }
        cadastralNumberBefore = cadastralNumberAfter
      })
    })
  })
  it('check opening card', () => {
    cy.get('[data-test="Кадастровый номер"] .my-helper-card-column-item__text').first().invoke('text').then(cadastralNumberText => {
      var cadastralNumber = cadastralNumberText.match(/(\d{1})(\d{1})\:(\d{1})(\d{1})\:(\d{1})(\d{1})(\d{1})(\d{1})(\d{1})(\d{1,2}):(\d{1})(\d{1})/)
      cy.get('.my-areas-client-table__card .my-areas-client-table__btn-open').first().click().then(() => {
        cy.get('.v-toolbar__title').contains(cadastralNumber[0])
      })
    })
  })
  it('check elements exist on card and close button working and scroll working', () => {
    cy.get('.my-areas-client-table__card .my-areas-client-table__btn-open').first().click().then(() => {
      cy.get('.v-toolbar__title').should('be.visible')
      cy.get('.v-dialog [data-test="Район"]').should('be.visible')
      cy.get('.v-dialog [data-test="Адрес"]').should('be.visible')
      cy.get('.v-dialog [data-test="Кадастровый номер"]').should('be.visible')
      cy.get('.v-dialog [data-test="Площадь"]').should('be.visible')
      cy.get('.v-dialog [data-test="Категория"]').should('be.visible')
      cy.get('.v-dialog [data-test="Форма собственности"]').should('be.visible')
      cy.get('.v-dialog [data-test="Разрешенное использование"]').should('be.visible')
      cy.get('.v-dialog [data-test="Транспортная инфраструктура"]').should('be.visible')
      cy.get('[data-test="dialog"]').scrollTo('bottom')
      cy.get('.v-dialog [data-test="Описание"]').should('be.visible')
      cy.get('[data-test="dialog"]').scrollTo('top')
      cy.get('.v-dialog [data-test="Инженерная инфраструктура"]').should('be.visible')
      cy.get('.v-dialog [data-test="Варианты приобретения"]').should('be.visible')
      cy.get('.v-dialog [data-test="Контакты"]').should('be.visible')
      cy.get('.v-dialog [data-test="my-areas-client-dialog-left-column-simple-buildings"]').should('be.visible')
      cy.get('.v-dialog [data-test="my-areas-client-dialog-left-column-simple-cadastralCost"]').should('be.visible')
      cy.get('.v-dialog [data-test="my-areas-client-dialog-left-column-simple-cost"]').should('be.visible')
      cy.get('.v-dialog [data-test="close-btn-icon"]').should('be.visible').click()
      cy.get('.v-toolbar__title').should('not.be.visible')
    })
  })
})