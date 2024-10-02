class ArchivedPage {
    constructor() {
      // Define selectors for the elements
      this.selectors = {
        archivedPageIcon: ':nth-child(3) > .sidebar-item-icon > img',
        tabPanelLabel: '#p-tabpanel-7-label > .mr-1',
        firstTaskMoreButton:
          ':nth-child(1) > .task-row-parent > app-task-list-item > .scroll-container > .ui-list-group > .full-t-wrapper > .full-t > .more-container > .cursor-wraper',
        deleteMenuItem: '.delete-menu-item > .p-menuitem-link > .p-menuitem-text',
        confirmDeleteButton: '.action-buttons > :nth-child(2)',
        logoutIcon: '.logout-icon > img',
      };
    }
  
    /**
     * Navigates to the archived page.
     */
    navigateToArchivedPage() {
      cy.get(this.selectors.archivedPageIcon).click();
    }
  
    /**
     * Selects the specific tab panel within the archived page.
     */
    selectTabPanel() {
      cy.get(this.selectors.tabPanelLabel).click();
    }
  
    /**
     * Opens the options menu for the first task in the list.
     */
    openFirstTaskOptions() {
      cy.get(this.selectors.firstTaskMoreButton).click();
    }
  
    /**
     * Selects the delete option from the options menu.
     */
    selectDeleteOption() {
      cy.get(this.selectors.deleteMenuItem).click();
    }
  
    /**
     * Confirms the deletion of the task.
     */
    confirmDeletion() {
      cy.get(this.selectors.confirmDeleteButton).click();
    }
  
    /**
     * Logs out of the application.
     */
    logout() {
      cy.get(this.selectors.logoutIcon).click();
    }
  
    /**
     * Performs all steps to clear the archived page.
     */
    clearArchivedPage() {
      this.navigateToArchivedPage();
      this.selectTabPanel();
      this.openFirstTaskOptions();
      this.selectDeleteOption();
      this.confirmDeletion();
      this.logout();
      
    }
  }
  
  export default ArchivedPage;
  