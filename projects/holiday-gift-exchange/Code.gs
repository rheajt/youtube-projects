/**
 * Just a variable used late in the email template to tell the people in the gift exchange when the exchange will take place
 */
var EXCHANGE = '<<CHANGE ME TO THE DATE OF THE GIFT EXCHANGE>>';

/**
 * Make the list AND CHECK IT TWICE
 * Serves as the main entry point into the code
 */
function makeList() {
  //1. Close the responses
  var formUrl = SpreadsheetApp.getActiveSheet().getFormUrl();
  FormApp.openByUrl(formUrl)
    .setAcceptingResponses(false)
    .setCustomClosedFormMessage('Sorry but the pairs have been made and entry is closed!');
  
  //2. Pair the people together
  var pairs = getPairs();
  
  //3. Create an answer sheet
  writeSheet(pairs);
  
  //4. Send emails to everyone!
  sendEmails(pairs);
  
  //Done, signal the sheet
  Browser.msgBox('Done creating the pairs and emailing the members');
}

function getPairs() {
  var arraysEqual = true;
  var values = SpreadsheetApp.getActiveSheet().getDataRange().getValues().splice(1);
  var copy = values.slice();
  
  while(arraysEqual) {
    copy = shuffle(copy);
    arraysEqual = isEqual(values, copy);
  }
  
  return values.map(function(person, ind) {
    return {
      email: person[1],
      name: person[2],
      pair: {
        name: copy[ind][2],
        hobby: copy[ind][3],
        book: copy[ind][4],
        movie: copy[ind][5],
        sport: copy[ind][6],
        other: copy[ind][7]
      }
    };
  });
}

/**
 * test if two arrays are equal
 */
function isEqual(vals, copy) {
  for(var i = 0; i < vals.length; i++) {  
    if(vals[i][1] === copy[i][1]) {
      return true;
    }
  }
  return false;
}

/**
 * Shuffle arrays algorithm from stack overflow
 */
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/**
 * Write a sheet with the pairs on it
 */
function writeSheet(pairs) {
  var activeSheet = SpreadsheetApp.getActiveSheet();
  var pairsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Pairs') || null;
  
  if(!pairsSheet) {
    pairsSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Pairs').setTabColor('green');
  }
    
  var range = pairsSheet.getRange(1, 1, pairs.length, 2);
  
  var values = pairs.map(function(each) {
    return [each.name, each.pair.name]
  });
 
  range.setValues(values);
  
  //return the orginal form responses as the active sheet
  activeSheet.activate();
}

/**
 * Send emails to all of the people with their person to get a gift for
 */
function sendEmails(pairs) {
  var html = HtmlService.createTemplateFromFile('email');
  
  html.exchange = EXCHANGE;
  
  for(var i = 0; i < pairs.length; i++) {
    html.data = pairs[i];
    
    GmailApp.sendEmail(pairs[i].email, 'Gift Exchange Pairs!', '', {
      htmlBody: html.evaluate().getContent()
    });
  }
}