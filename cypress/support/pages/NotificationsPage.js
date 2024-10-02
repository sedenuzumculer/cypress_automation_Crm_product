class NotificationPage {
  constructor() {
    this.notificationPageButton = ":nth-child(1) > .sidebar-item-icon > img";
    this.listbutton = ".sorting";
    this.newestToOldestOption =
      ":nth-child(2) > .p-element > .p-radiobutton > .p-radiobutton-box";
    this.personFilter = ".date-rank > .gap-3";
    this.selectFirstPerson =
      ":nth-child(1) > .p-element > .p-checkbox > .p-checkbox-box";
    this.firstPersonLabel = "div:nth-of-type(1) > .w-100 .text-hide.title-10";
    this.firstPersonName = "div:nth-of-type(1) > .w-100 .text-hide.title-10";
    this.clearAllButton = ".clear";
    this.firstNotification = "div:nth-of-type(1) > .w-100 .dty-15";
    this.notificationInput = ".p-inputtextarea";
    this.sendButton = ".p-button-rounded";
    this.inputTask = "button[label='Görev'] > .p-button-label";
  }
  Filterbutton() {
    cy.get(this.notificationPageButton).click();
    // Filtreleme menüsünü aç
    cy.get(this.listbutton).click(); //.sorting

    // 'Yeniden eskiye' seçeneğini seç
    cy.get(this.newestToOldestOption).click();
  }

  // Kişi filtreleme fonksiyonu
  kisiFiltrele(kisiAdi) {
    // Kişi filtreleme menüsünü aç
    cy.get(this.personFilter).click();

    // Kişi arama alanına isim gir
    cy.get(this.selectFirstPerson).click();

    cy.get(this.firstPersonLabel)
      .invoke("text")
      .then((firstText) => {
        cy.get(this.firstPersonName)
          .invoke("text")
          .then((secondText) => {
            // İki metni karşılaştır
            expect(firstText.trim()).to.eq(secondText.trim());
          });
      });
  }
  clearAndSendNotification() {
    cy.get(this.clearAllButton).click();
    cy.wait(1000);
    cy.get(this.firstNotification).click();
    cy.get(this.notificationInput).type("denmeme");
    cy.get(this.sendButton).click();
    cy.get(this.inputTask).click();

    function selectDropdownOption(dropdownIndex, optionIndex) {
      // Dropdown'ı aç
      cy.get(
        `:nth-child(${dropdownIndex}) > .p-inputwrapper > .p-dropdown > .p-dropdown-trigger`
      ).click();

      // Dropdown içeriğinin yüklenmesini ve görünür olmasını bekle
      cy.get(`:nth-child(${dropdownIndex}) .p-dropdown-items`).should(
        "be.visible"
      );

      // Seçeneği seç
      cy.get(`p-dropdownitem:nth-of-type(${optionIndex}) > li[role='option']`)
        .should("be.visible")
        .click();
    }

    // Fonksiyonu kullanma
    selectDropdownOption(1, 3); // İlk dropdown'dan üçüncü öğeyi seçer
    selectDropdownOption(2, 3); // İkinci dropdown'dan üçüncü öğeyi seçer
    cy.intercept(
      "POST",
      "/api/tasks/add-task-to-unsuitability/66deeeeda0ca7ea950b78b66"
    ).as("postTaskAdd");
    cy.get(".p-calendar > .p-element > .p-button-icon")
      .should("be.visible")
      .click();
    cy.get(".p-datepicker-today").click();
    cy.get(".task-description > .p-inputtextarea").type(
      "bugün yapilmasi iyi olur"
    );
    cy.get('[type="submit"]').click();
    cy.get(".p-toast-message-content > .p-ripple").click();
  }
}

export default NotificationPage;
