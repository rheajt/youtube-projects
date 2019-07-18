/**
 * Creates a custom menu in Google Sheets when the spreadsheet opens.
 */
function doGet() {
  var html = HtmlService.createTemplateFromFile('slides2drive');
  html.DEVELOPER_KEY = PropertiesService.getScriptProperties().getProperty('DEVELOPER_KEY');
  return html
    .evaluate()
    .setTitle('Slides 2 Drive');
}

/**
 * Displays an HTML-service dialog in Google Sheets that contains client-side
 * JavaScript code for the Google Picker API.
 */
function showPicker() {
  var html = HtmlService.createHtmlOutputFromFile('Picker.html')
    .setWidth(600)
    .setHeight(425)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi().showModalDialog(html, 'Select a file');
}

/**
 * Gets the user's OAuth 2.0 access token so that it can be passed to Picker.
 * This technique keeps Picker from needing to show its own authorization
 * dialog, but is only possible if the OAuth scope that Picker needs is
 * available in Apps Script. In this case, the function includes an unused call
 * to a DriveApp method to ensure that Apps Script requests access to all files
 * in the user's Drive.
 *
 * @return {string} The user's OAuth 2.0 access token.
 */
function getOAuthToken() {
  DriveApp.getRootFolder();
  return ScriptApp.getOAuthToken();
}

function getThumbnails(presentationId) {
  var presentation = Slides.Presentations.get(presentationId);
  
  var folder = DriveApp.createFolder(presentation.title);
  
  var slides = presentation.slides;
  
  for (i = 0; i < slides.length; i++) {
    var thumbnail = Slides.Presentations.Pages.getThumbnail(presentationId, slides[i].objectId);
    
    var blob = UrlFetchApp.fetch(thumbnail.contentUrl).getBlob();
    
    folder.createFile(blob).setName('Image ' + (i + 1) + '.png');
  }

  return {
    name: folder.getName(),
    url: folder.getUrl()
  };
}