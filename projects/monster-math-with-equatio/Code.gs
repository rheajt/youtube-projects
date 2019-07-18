/**
 * @OnlyCurrentDoc
 */
function onOpen() {
  DocumentApp.getUi()
    .createAddonMenu()
    .addItem('Open Monster Math!', 'openMonsterMath')
    .addToUi();
}

function onInstall() {
  onOpen();
}

function openMonsterMath() {
  var html = HtmlService.createTemplateFromFile('monstermath').evaluate()
    .setHeight(600)
    .setWidth(800);
  
  DocumentApp.getUi().showModalDialog(html, 'Setup');
}

function getImages() {
  var body = DocumentApp.getActiveDocument().getBody();
  
  var inlineImages = body.getImages();
  
  var images = [];
  for(var i = 0; i < inlineImages.length; i++) {
    images.push(Utilities.base64Encode(inlineImages[i].getBlob().getBytes()));
  }
  return images;
}

function appendImage(img) {
  var image = JSON.parse(img);
  
  var decoded = Utilities.base64Decode(image.replace(/^data:image\/(png|jpg);base64,/, ''));
  var blob = Utilities.newBlob(decoded);
  
  var body = DocumentApp.getActiveDocument().getBody();
  
  body.appendImage(blob).setWidth(body.getPageWidth());
  
  return 'done';
}