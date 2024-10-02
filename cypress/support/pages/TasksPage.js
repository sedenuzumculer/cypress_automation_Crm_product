class TasksPage {
  constructor() {
    // Seçicileri tanımlayın
    this.firstTextSelector =
      ".item-1 > app-dashboard-chart > .parent > .header > .alt-title";
    this.secondTextSelector =
      ".item-6 > .w-100 > :nth-child(1) > .board > .board-interior > :nth-child(2) > .number";
    this.goTasksSelector = ":nth-child(2) > .sidebar-item-icon > img";
    this.firstTaskSelector =
      ":nth-child(1) > .row-parent > app-task-list-item > .scroll-container > .ui-list-group > .full-t-wrapper > .full-t > .more-container > .cursor-wraper > .pi";
    this.addArchivedSelector = ":nth-child(2) > .p-menuitem-link";
    this.confirmButtonSelector = ".action-buttons > :nth-child(2)";
    this.reportsPageSelector = ":nth-child(4) > .sidebar-item-icon > img";

  }

  // Metinleri alan ve döndüren metot
  getTextValues() {
    return cy
      .get(this.firstTextSelector)
      .invoke("text")
      .then((metin1) => {
        return cy
          .get(this.secondTextSelector)
          .invoke("text")
          .then((metin2) => {
            // Metinleri bir dizi olarak döndürüyoruz
            return [metin1, metin2];
          });
      });
  }

  addTaskToArchive() {
    cy.get(this.goTasksSelector).click();
    cy.get(this.firstTaskSelector).should("be.visible").click();
    cy.get(this.addArchivedSelector).should("be.visible").click();
    cy.get(this.confirmButtonSelector).should("be.visible").click();
  }


  roadToReportsPage() {
    cy.get(this.reportsPageSelector).click();
  }

  // Metinleri alıp karşılaştırma yapan metot
  compareTextsAfterArchive() {
    let metinDizisiOnceki;
    let metinDizisiSonraki;

    // İlk metinleri alıyoruz ve saklıyoruz
    return this.getTextValues().then((dizi1) => {
      metinDizisiOnceki = dizi1;

      // Görevi arşive ekliyoruz
      this.addTaskToArchive();
      this.roadToReportsPage();

      // Yeni metinleri alıyoruz
      cy.intercept(
        "GET",
        " /api/tasks/not-archived-count-by-priority/daily"
      ).as("showlist");
      cy.wait("@showlist");
      cy.wait(1000);
      return this.getTextValues().then((dizi2) => {
        metinDizisiSonraki = dizi2;

        console.log("metinDizisiOnceki[0]");
        console.log(metinDizisiOnceki[0]);
        console.log("------------------");
        console.log("metinDizisiOnceki[1]");
        console.log(metinDizisiOnceki[1]);

        const valueNew0 = parseInt(metinDizisiSonraki[0]) + 1;
        const valueNew1 = parseInt(metinDizisiSonraki[1]) + 1;

        // Metinleri karşılaştırıyoruz
        expect(metinDizisiOnceki[0]).to.not.equal(metinDizisiSonraki[0]);
        expect(metinDizisiOnceki[1]).to.not.equal(metinDizisiSonraki[1]);

        expect(metinDizisiOnceki[0]).equal(valueNew0.toString());
        expect(metinDizisiOnceki[1]).equal(valueNew1.toString());

        // Sonuçları konsola yazdırıyoruz
        cy.log("İlk metin (önce): " + metinDizisiOnceki[0]);
        cy.log("İlk metin (sonra): " + metinDizisiSonraki[0]);
        cy.log("İkinci metin (önce): " + metinDizisiOnceki[1]);
        cy.log("İkinci metin (sonra): " + metinDizisiSonraki[1]);
      });
    });
  }
}

export default TasksPage;
