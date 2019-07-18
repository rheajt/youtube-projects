/**
* Embed a Star Wars Crawl into your Google Site!
*
* Modified from this INCREDIBLE codepen: https://codepen.io/TimPietrusky/pen/eHGfj
* 
* IMPORTANT STEP
* Change the value of the DOC_KEY variable to the key to your Google Doc.
*/
function doGet() {
  var DOC_KEY = '<<REPLACE WITH YOUR DOCUMENT KEY>>';  
  var html = HtmlService.createTemplateFromFile('crawl');  
  html.text = getBody(DOC_KEY);
  
  return html.evaluate();
}

function getBody(id) {  
  return DocumentApp.openById(id)
    .getBody()
    .getParagraphs()
    .map(function(paragraph) {return paragraph.getText();})
    .filter(function(paragraph) {return paragraph !== '';});
}
