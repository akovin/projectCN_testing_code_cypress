describe('test filters admin', () => {
  beforeEach('loginAndAuth', () => {
    cy.checkPageLoadWithAuth('/admin/areas')
  })
  it('cadastral number', () => {
    //проверка фильтра по кадастровому номеру
    cy.get('[data-test="my-areas-admin-table-view-row-cadastralNumber"] .my-helper-card-column-item__text').first().invoke('text').then(cad_number_before => {
      cy.get('[data-test="areas-admin-filter-cadastralNumber"]').type(cad_number_before).wait(1500)
      cy.get('[data-test="my-areas-admin-table-view-row-cadastralNumber"] .my-helper-card-column-item__text').each($el => {
        cy.wrap($el).invoke('text').then(cad_number_after => {
          expect(cad_number_after).to.equal(cad_number_before)
        })
      })
    })
  })
  it('minimal area filter', () => {
    //проверка фильтра по минимальному значению площади
    cy.get('[data-test="my-areas-admin-table-view-row-dimension"] .my-helper-card-column-item__text').first().invoke('text').then(area_before => {
      const area_number_before = Number(area_before.match(/\d+/g))
      cy.get('[data-test="areas-admin-filter-areaMin"]').type(area_number_before).wait(1500)
      cy.get('[data-test="my-areas-admin-table-view-row-dimension"] .my-helper-card-column-item__text').each($el => {
        cy.wrap($el).invoke('text').then(area_number => {
          const area_number_after = Number(area_number.match(/\d+/g))
          cy.wrap(area_number_after).should('be.gte', area_number_before)
        })
      })
    })
  })
  it('check maximum area filter', () => {
    //проверка фильтра по минимальному значению площади
    cy.get('[data-test="my-areas-admin-table-view-row-dimension"] .my-helper-card-column-item__text').first().invoke('text').then(area_before => {
      const area_number_before = Number(area_before.match(/\d+/g))
      cy.get('[data-test="areas-admin-filter-areaMax"]').type(area_number_before).wait(1500)
      cy.get('[data-test="my-areas-admin-table-view-row-dimension"] .my-helper-card-column-item__text').each($el => {
        cy.wrap($el).invoke('text').then(area_number => {
          const area_number_after = Number(area_number.match(/\d+/g))
          cy.wrap(area_number_before).should('be.gte', area_number_after)
        })
      })
    })
  })
  it('check sorting new first, old first', () => {
    cy.get('[data-test="my-areas-admin-table-view-row-cadastralNumber"] .my-helper-card-column-item__text').first().invoke('text').then(cadastralNumberBefore => {
      cy.get('[data-test="form-sortingLabel"]').click().wait(300)
      cy.get('.menuable__content__active').contains('Сначала старые').click().wait(500)
      cy.get('[data-test="my-areas-admin-table-view-row-cadastralNumber"] .my-helper-card-column-item__text').first().invoke('text').then(cadastralNumberAfter => {
        expect(cadastralNumberBefore).not.to.equal(cadastralNumberAfter)
      })
      cy.get('[data-test="form-sortingLabel"]').click().wait(300)
      cy.get('.menuable__content__active').contains('Сначала новые').click().wait(500)
      cy.get('[data-test="my-areas-admin-table-view-row-cadastralNumber"] .my-helper-card-column-item__text').first().invoke('text').then(cadastralNumberAfter2 => {
        expect(cadastralNumberBefore).to.equal(cadastralNumberAfter2)
      })
    }
    )
  })
  it('check sorting increase area', () => {
    //проверяем сортировку по возрастанию площади
    cy.get('[data-test="form-sortingLabel"]').click()
    cy.get('.menuable__content__active').contains('Возрастанию площади').click().wait(500)
    let valueBefore = 0
    cy.get('[data-test="my-areas-admin-table-view-row-dimension"] .my-helper-card-column-item__text').each($el => {
      cy.wrap($el).invoke('text').then(areaNumber => {
        //любое число, все равно переопределяется
        let valueAfter = 0
        if (areaNumber.match(/.*Гектар.*/g)) {
          console.log('true')
          valueAfter = Number(areaNumber.match(/\d+/g)) * 10000
        } else {
          valueAfter = Number(areaNumber.match(/\d+/g))
        }
        cy.wrap(valueAfter).should('be.gte', valueBefore)
        valueBefore = valueAfter
      })
    })
  })
  it('check sorting decrease area', () => {
    //проверяем сортировку по возрастанию площади
    cy.get('[data-test="form-sortingLabel"]').click()
    cy.get('.menuable__content__active').contains('Убыванию площади').click().wait(500)
    let valueBefore = 9999999999999999
    cy.get('[data-test="my-areas-admin-table-view-row-dimension"] .my-helper-card-column-item__text').each($el => {
      cy.wrap($el).invoke('text').then(areaNumber => {
        //любое число, все равно переопределяется
        let valueAfter = 0
        if (areaNumber.match(/.*Гектар.*/g)) {
          console.log('true')
          valueAfter = Number(areaNumber.match(/\d+/g)) * 10000
        } else {
          valueAfter = Number(areaNumber.match(/\d+/g))
        }
        cy.wrap(valueBefore).should('be.gte', valueAfter)
        valueBefore = valueAfter
      })
    })
  })
  it('check sorting by cadastral number increasing', () => {
    cy.get('[data-test="form-sortingLabel"]').click()
    cy.get('.menuable__content__active').contains('Кадастровому номеру от А до Я').click().wait(1500)
    var cadastralNumberBeforeText = '00:00:0000000:00'
    var cadastralNumberBefore = cadastralNumberBeforeText.match(/(\d{1})(\d{1})\:(\d{1})(\d{1})\:(\d{1})(\d{1})(\d{1})(\d{1})(\d{1})(\d{1,2}):(\d{1})(\d{1})/)
    cy.get('[data-test="my-areas-admin-table-view-row-cadastralNumber"] .my-helper-card-column-item__text').each($el => {
      cy.wrap($el).invoke('text').then(cadastralNumberAfterText => {
        var cadastralNumberAfter = cadastralNumberAfterText.match(/(\d{1})(\d{1})\:(\d{1})(\d{1})\:(\d{1})(\d{1})(\d{1})(\d{1})(\d{1})(\d{1,2}):(\d{1})(\d{1})/)
        for (var i = 1; i < cadastralNumberAfter.length; i++) {
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
  //ДОДЕЛАТЬ ЭТОТ ТЕСТ
  it('check sorting by cadastral number decreasing', () => {
    cy.get('[data-test="form-sortingLabel"]').click()
    cy.get('.v-list-item__content').contains('Кадастровому номеру от Я до А').click().wait(1500)
    var cadastralNumberBeforeText = '99:99:9999999:99'
    var cadastralNumberBefore = cadastralNumberBeforeText.match(/(\d{1})(\d{1})\:(\d{1})(\d{1})\:(\d{1})(\d{1})(\d{1})(\d{1})(\d{1})(\d{1,2}):(\d{1})(\d{1})/)
    cy.get('[data-test="my-areas-admin-table-view-row-cadastralNumber"] .my-helper-card-column-item__text').each($el => {
      cy.wrap($el).invoke('text').then(cadastralNumberAfterText => {
        console.log('then')
        var cadastralNumberAfter = cadastralNumberAfterText.match(/(\d{1})(\d{1})\:(\d{1})(\d{1})\:(\d{1})(\d{1})(\d{1})(\d{1})(\d{1})(\d{1,2}):(\d{1})(\d{1})/)
        console.log(cadastralNumberAfter)
        for (var i = 1; i < cadastralNumberAfter.length; i++) {
          console.log(i)
          if (i == 10 && cadastralNumberAfter[i].length == 2) {
            // var cypherCadNumberBefore = cadastralNumberBefore[i].match(/(\d{1})(\d{1})/)
            var cypherCadNumberBefore = cadastralNumberBefore[i]
            console.log(cadastralNumberBefore[i])
            var cypherCadNumberAfter = cadastralNumberAfter[i]
            if (cypherCadNumberAfter[0] < cypherCadNumberBefore[0]) {
              console.log(cypherCadNumberAfter[0])
              console.log(cypherCadNumberBefore[0])
              if (cypherCadNumberAfter[1] < cypherCadNumberBefore[1]) {
                break
              } else if (cypherCadNumberAfter[1] > cypherCadNumberBefore[1]) {
                throw new Error("test fails here1")
              } else {
                continue
              }
            } else if (cypherCadNumberAfter[0] > cypherCadNumberBefore[0]) {
              throw new Error("test fails here2")
            } else {
              if (cypherCadNumberAfter[1] < cypherCadNumberBefore[1]) {
                break
              } else if (cypherCadNumberAfter[1] > cypherCadNumberBefore[1]) {
                throw new Error("test fails here3")
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
              throw new Error("test fails here4")
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
  it('filter status', () => {
    cy.intercept('GET', 'api/area*').as('chooseStatus1')
    cy.get('[data-test="areas-admin-filter-status"]').click()
    cy.get('.menuable__content__active').contains('Новые').click().then(() => {
      // cy.get('.my-areas-admin-table-view__status').each($el => {
      //   cy.wrap($el).should('have.class', 'my-areas-admin-table-view__status--new')
      // })
      cy.get('.my-areas-admin-table__notfound').should('be.visible')
      cy.intercept('GET', 'api/area*').as('chooseStatus2')
      cy.get('[data-test="areas-admin-filter-status"]').click()
      cy.get('.menuable__content__active').contains('Опубликованные').click().wait('@chooseStatus2')
    }).then(() => {
      cy.get('.my-areas-admin-table-view__status').each($el => {
        cy.wrap($el).should('have.class', 'my-areas-admin-table-view__status--published')
      })
      cy.intercept('GET', 'api/area*').as('chooseStatus3')
      cy.get('[data-test="areas-admin-filter-status"]').click()
      cy.get('.menuable__content__active').contains('Архивные').click().wait('@chooseStatus3').then(() => {
        cy.get('.my-areas-admin-table__notfound').should('be.visible')
      })
    })
  })
  //задача, которую пока не решил, пройтись по всем, кликнуть, открыть, проверить, вернуться назад и кликнуть следующую. 
  //ошибка Detached from the DOM выскакивает
  it.skip('filter district', () => {
    cy.get('[data-test="areas-admin-filter-areaRegion"]').click()
    cy.intercept('GET', `api/area*`).as('getArea')
    cy.get('.menuable__content__active').contains('Костомукшский ГО').click().wait('@getArea').wait(1000)
    cy.url().should('include', 'areaRegion=')
    cy.get('.my-areas-admin-table-view').should('have.length', 1)
    cy.get('.my-areas-admin-table-view__btn-open').first().click()
    cy.get('.my-helper-card').contains('Костомукшский ГО')
  })
})