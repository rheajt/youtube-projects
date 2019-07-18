function doGet(e) {
  if(e.parameter.sheet_id) {
    PropertiesService.getScriptProperties().setProperty('SHEET_ID', e.parameter.sheet_id);
    
    return HtmlService.createTemplateFromFile('Index')
      .evaluate()
      .setTitle('Stranger Things Alphabet Wall')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
      
  } else {
    return HtmlService.createTemplateFromFile('Welcome')
      .evaluate()
      .setTitle('Stranger Things Review Game')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
}

function getQuestions() {
  var sheetId = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  
  var questionSheet = SpreadsheetApp.openById(sheetId).getSheetByName('Review Questions');
  
  var values = questionSheet.getDataRange().getValues();
  
  var questions = [];
  
  for(var i = 1; i < values.length; i++) {
    questions.push({
      question: values[i][0],
      answer: values[i][1]
    });
  }
  
  return questions;
}

function checkAnswers(question, answer, row) {
  var sheetId = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  
  var responseSheet = SpreadsheetApp.openById(sheetId).getSheetByName('Form Responses 1');
  
  var values = responseSheet.getDataRange().getValues();
  
  var regExp = new RegExp(answer, 'gi');
  
  for(var i = row; i < values.length; i++) {
    if(regExp.test(values[i][3].toLowerCase())) {
      return {
        success: true,
        message: 'The last message from the upside down was "' + question + '" answered by ' + values[i][2] + ' with the answer "' + values[i][3] + '".'
      }
    }
  }
  
  //if there is no answer found in the loop
  return { success: false, lastRow: values.length };
}