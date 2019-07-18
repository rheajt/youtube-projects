function doGet(e) {
  var TEMPLATES = [
    'chalkboard',
    'corkboard',
    'colorful'
  ];
  
  var template = e.parameter.template;
  
  if(TEMPLATES.indexOf(template) > -1) {
    var html = HtmlService.createTemplateFromFile(template);
    
    html.sheetVars = JSON.stringify({
      template: template,
      id: e.parameter.sheet_id || '',
      name: e.parameter.sheet_name || 'Form Responses 1',
      nameCol: e.parameter.name_col || '1',
      inqCol: e.parameter.inq_col || '3',
      imgCol: e.parameter.img_col || '4'
    });
    
    return html.evaluate().setTitle('Wonder Wall Display');
  } else {
    return HtmlService.createHtmlOutputFromFile('default').setTitle('Install the Add-on');
  }
}

function getData(sheetVals) {
  var sheet = SpreadsheetApp.openById(sheetVals.id).getSheetByName(sheetVals.name);
  
  var values = sheet.getDataRange().getValues();
  var headers = values.shift();
  
  return values.map(function(each) {
    return {
      name: each[sheetVals.nameCol],
      inq: each[sheetVals.inqCol],
      img: each[sheetVals.imgCol]
    };
  });
}