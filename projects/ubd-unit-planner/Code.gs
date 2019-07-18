/**
 * get and set functions for the Properties service
 */
function getUnits() {
  return JSON.parse(PropertiesService.getDocumentProperties().getProperties()) || [];
};

function setUnits(newSet) {
  return PropertiesService.getDocumentProperties().setProperties(newSet);
};
  
/**
 * create the menu in the addon toolbar
 * to be run when opened and installed
 */
function onOpen() {
  DocumentApp
    .getUi()
    .createAddonMenu()
    .addItem('STEP 1: Yearly Plan', 'setupPlan')
    .addToUi();
}

function onInstall() {
  onOpen();
}

function setupPlan() {
  var html = HtmlService
    .createHtmlOutputFromFile('setupPlan')
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setWidth(700)
    .setHeight(600);
    
  DocumentApp
    .getUi()
    .showModalDialog(html, 'STEP 1: Setup Yearly Plan')
}

function yearlyPlan() {

}