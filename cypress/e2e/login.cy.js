const TEST_IDS = {
  usernameField: 'input[data-test="username"]',
  passwordField: 'input[data-test="password"]',
  loginButton: 'input[data-test="login-button"]',
  loginErrorMessage: 'h3[data-test="error"]',
}

const MESSAGES = {
  requiredUsernameError: "Epic sadface: Username is required",
  unmatchedUsernameError:
    "Epic sadface: Username and password do not match any user in this service",
}

describe("Login", () => {
  beforeEach("Visit", () => {
    cy.visit("/")
  })
  it("Success login", () => {
    cy.get(TEST_IDS.usernameField).type(Cypress.env("STANDARD_USER"))
    cy.get(TEST_IDS.passwordField).type(Cypress.env("PASSWORD"))
    cy.get(TEST_IDS.loginButton).click()
    cy.url().should("include", "/inventory.html")
  })
  it("Login with empty email - should show an error", () => {
    cy.get(TEST_IDS.passwordField).type(Cypress.env("PASSWORD"))
    cy.get(TEST_IDS.loginButton).click()
    cy.get(TEST_IDS.loginErrorMessage).should(
      "have.text",
      MESSAGES.requiredUsernameError,
    )
  })
  it("Login with wrong email - should show an error", () => {
    cy.get(TEST_IDS.usernameField).type("example")
    cy.get(TEST_IDS.passwordField).type(Cypress.env("PASSWORD"))
    cy.get(TEST_IDS.loginButton).click()
    cy.get(TEST_IDS.loginErrorMessage).should(
      "have.text",
      MESSAGES.unmatchedUsernameError,
    )
  })
})
