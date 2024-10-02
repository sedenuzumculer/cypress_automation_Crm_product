class ReportsPage {
  constructor() {
    this.reportPageSelector = ":nth-child(4) > .sidebar-item-icon > img";
    this.boardSelector = "app-dashboard-chart-grid > .board";
    this.initialValues = {};
  }

  // Method to save report values before changes
  saveReportValuesBefore() {
    cy.intercept("GET", "/api/tasks/not-archived-count-by-status").as("getTaskCounts");
    cy.intercept("GET", "/api/tasks/count-with-due-date-one-week").as("getWait");

    cy.get(this.reportPageSelector).should("be.visible").click();
    cy.wait("@getTaskCounts");
    cy.wait("@getWait");

    cy.get(this.boardSelector)
      .should("be.visible")
      .then(($elements) => {
        const initialValues = {};
        $elements.each((index, el) => {
          const $el = Cypress.$(el);
          const title = $el.find(".title-selector").first().text().trim();
          const number = $el.find(".number").text().trim();
          initialValues[title] = number;
          cy.log(`${title}: ${number}`);
        });
        // Store initial values for later comparison
        cy.wrap(initialValues).as("initialValues");
      });
  }

  // Method to compare report values after changes
  compareReportValuesAfter() {
    cy.intercept("GET", "/api/tasks/not-archived-count-by-status").as("getTaskCounts");
    cy.intercept("GET", "/api/tasks/not-archived-count-by-priority/daily").as("getTaskDaily");
    cy.intercept("GET", "/api/tasks/not-archived-count/monthly").as("getTaskMonthly");

    cy.get(this.reportPageSelector).should("be.visible").click();
    cy.wait("@getTaskCounts");

    // Retrieve initial values from alias
    cy.get("@initialValues").then((initialValues) => {
      cy.get(this.boardSelector)
        .should("be.visible")
        .then(($elements) => {
          $elements.each((index, el) => {
            const $el = Cypress.$(el);
            const title = $el.find(".title-selector").first().text().trim();
            const number = $el.find(".number").text().trim();
            cy.log(`${title}: ${number}`);

            // Compare current number with initial value
            const initialNumber = initialValues[title];
            cy.log(
              `Comparison - ${title}: Before = ${initialNumber}, After = ${number}`
            );

            // Add assertion to validate the change
            expect(number).to.not.equal(initialNumber);
          });
        });
    });
    cy.intercept("GET", "/api/tasks/not-archived-count/monthly").as(
      "getTaskMonthly"
    );
    cy.wait("@getTaskCounts");
    cy.wait("@getTaskDaily");
    cy.wait("@getTaskMonthly");
  }
}
export default ReportsPage;
