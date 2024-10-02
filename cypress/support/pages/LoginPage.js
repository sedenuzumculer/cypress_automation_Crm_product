class LoginPage {
  visit() {
    cy.visit("https://ornektip.matebot.net/login"); //url
  }

  fillUsername(username) {
    cy.get(":nth-child(3) > .p-inputtext").type(username); //username
  }

  fillPassword(password) {
    cy.get(".p-password > .p-inputtext").type(password); // password
  }

  submit() {
    cy.get('button[type="submit"]').click(); // Giriş yap butonuna tıkla
  }

  verifyLogin() {
    cy.url().should("include", "/unsuitabilities");
  }
}

export default LoginPage;
