describe('Sapper template app', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('has the correct <a>', () => {
    cy.contains('a', 'Get Started')
  })

  it('navigates to /company/about', () => {
    cy.get('a')
      .contains('About')
      .click()
    cy.url().should('include', '/company/about')
  })

  it('navigates to /blog', () => {
    cy.get('a')
      .contains('Blog')
      .click()
    cy.url().should('include', '/blog')
  })
})
