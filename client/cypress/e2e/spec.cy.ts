describe('empty spec', () => {

  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/')
})

  it('passes', () => {
    cy.get("[data-cy='modalButton']").click()
    cy.get("[data-cy='form']")
    cy.get("[data-testid='dayTest']").type('11')
    cy.get("[data-testid='providerTest']").type('111')
    cy.get("[data-testid='yearTest']").type('111')
    cy.get("[data-testid='pageTest']").type('111')
    cy.get("[data-testid='viewsTest']").type('111')
    
    cy.get('button[type="submit"]').click()

    cy.contains('Page: 11').should('be.visible')
    cy.contains('Provider: 1111').should('be.visible')
    cy.contains('Date: 1111 / 111').should('be.visible')
    cy.contains('Views: 111').should('be.visible')
  })
})