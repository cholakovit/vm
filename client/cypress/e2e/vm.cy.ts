describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000');

    cy.get('#buttonFormEnter').should('be.disabled');
    cy.get('[data-testid="enterButton"]').should('be.disabled');
    cy.get('[data-testid="resetButton"]').should('be.disabled');
    cy.assertNumberButtonsDisabled();

    cy.get('#filled-basic').type('11');
    cy.get('#buttonFormEnter').should('be.enabled');
    cy.get('#buttonFormEnter').type('{enter}');
    //cy.get('.MuiButtonBase-root').should('have.focus');
    cy.contains('Amount: $ 11').should('be.visible');

    cy.get('[data-testid="enterButton"]').should('be.enabled');
    cy.get('[data-testid="resetButton"]').should('be.enabled');
    cy.assertNumberButtonsEnabled();

    cy.get('[data-testid="8"]').click();
    cy.get('[role="dcn"]').invoke('text').should('eq', '8');
    cy.get('[data-testid="enterButton"]').type('{enter}');
    cy.assertAmountAndChange('Amount: $ 3', 'Change: $ 3');

    cy.wait(2000);
    cy.get('#filled-basic').should('have.value', '');
    //cy.get('[data-testid="enterButton"]').should('be.disabled');

    for (let i = 0; i <= 9; i++) {
      cy.get(`[data-testid="${i}"]`).should('be.disabled');
    }

    cy.get('[data-testid="resetButton"]').should('be.disabled');
    cy.get('[data-testid="enterButton"]').should('be.disabled');
    cy.get('[role="dcn"]').invoke('text').should('eq', '0');

    cy.get('[role="ah"]').should('have.text', '');
    cy.get('[role="ch"]').should('have.text', '');
  })
})