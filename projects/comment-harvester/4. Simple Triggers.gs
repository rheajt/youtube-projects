function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('COMMENT HARVESTER')
    .addItem('Input Grade', 'inputGrade')
    .addItem('Open Sidebar', 'openSidebar')
    .addToUi();
}

function onInstall() {
  onOpen();
}

function onEdit(event) {
  var row = event.range.getRow();
  var column = event.range.getColumn();
  
  if(row >= 6 && column >= 5 && event.value !== undefined) {
    toast('You have changed a grade to ' + event.value);
  }
}

function toast(msg) {
  SpreadsheetApp.getActiveSpreadsheet().toast(msg);
}