function openSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('sidebar');
  
  SpreadsheetApp.getUi().showSidebar(html);
}