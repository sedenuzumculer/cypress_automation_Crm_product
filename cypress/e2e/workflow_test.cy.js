import LoginPage from "../support/pages/LoginPage";
import NotificationsPage from "../support/pages/NotificationsPage";
import TasksPage from "../support/pages/TasksPage";
import ReportsPage from "../support/pages/ReportsPage";
import ArchivedPage from "../support/pages/ArchivedPage";


describe("User-Workflow-test", () => {
  const loginPage = new LoginPage();
  const notificationsPage = new NotificationsPage();
  const reportsPage = new ReportsPage();
  const taskpage = new TasksPage();
  const archivedPage = new ArchivedPage();
  beforeEach("user-must-login-and-verify", function () {
    loginPage.visit();
    loginPage.fillUsername("black");
    loginPage.fillPassword("secretpassword");
    loginPage.submit();
    loginPage.verifyLogin();
  });

  it("NotificationTestPage", function () {
    reportsPage.saveReportValuesBefore();
    notificationsPage.Filterbutton(); // Filtreleme menüsünü aç ve "Yeniden eskiye" seç
    notificationsPage.kisiFiltrele(); // Kişiyi filtrele ve metinleri karşılaştır
    notificationsPage.clearAndSendNotification();
    reportsPage.compareReportValuesAfter();
    taskpage.compareTextsAfterArchive();
    archivedPage.clearArchivedPage();
  });
});
