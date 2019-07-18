function addonMenu() {
  SpreadsheetApp.getUi()
    .createMenu('COMMENT HARVESTER')
    .addItem('Input Grade', 'inputGrade')
    .addItem('Open Sidebar', 'openSidebar')
    .addToUi();
}

function inputGrade() {
  var ui = SpreadsheetApp.getUi();
  var currentCell = SpreadsheetApp.getCurrentCell();
  var response = ui.prompt('Enter your grade:', ui.ButtonSet.OK_CANCEL);
  
  if(response.getSelectedButton() === ui.Button.OK) {
    currentCell.setValue(response.getResponseText());
  }
}
