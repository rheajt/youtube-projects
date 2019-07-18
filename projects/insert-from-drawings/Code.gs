function onOpen() {
  SlidesApp.getUi()
    .createAddonMenu()
    .addItem('Insert from Google Drawings', 'openPicker')
    .addToUi();
}

function onInstall() {
  onInstall();
}

function openPicker() {
  var html = HtmlService.createTemplateFromFile('Picker').evaluate()
    .setWidth(600)
    .setHeight(425)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SlidesApp.getUi().showModalDialog(html, 'Select a file');
}

function getOAuthToken() {
  DriveApp.getRootFolder();
  return ScriptApp.getOAuthToken();
}

function getDrawing(drawingId) {
  var image = Drive.Files.get(drawingId);
  var imageBlob = getBlob(image.exportLinks['image/jpeg']);
  var presentation = SlidesApp.getActivePresentation();
  var currentPage = presentation.getSelection().getCurrentPage();
  currentPage.insertImage(imageBlob);
}

function getBlob(url) {
  var response = UrlFetchApp.fetch(url, {
    headers: {
      'Authorization': 'Bearer ' + ScriptApp.getOAuthToken()
    }
  });
  return response.getBlob();
}