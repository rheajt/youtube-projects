function onOpen() {
  SlidesApp.getUi()
    .createAddonMenu()
    .addItem('Open Sidebar', 'openSidebar')
    .addToUi();
}

function onInstall() {
  onOpen();
}

function openSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('sidebar').setTitle('Color Themes');
  
  SlidesApp.getUi().showSidebar(html);
}

function putTheme(theme) {
  var props = JSON.parse(PropertiesService.getScriptProperties().getProperty('THEMES')) || [];
  
  props.push(theme);
  
  PropertiesService.getScriptProperties().setProperty('THEMES', JSON.stringify(props));
  
  return props;
}

function getThemes() {
  var props = JSON.parse(PropertiesService.getScriptProperties().getProperty('THEMES')) || [];
  
  return props;
}