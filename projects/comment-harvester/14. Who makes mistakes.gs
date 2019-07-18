function debugging(var1, var2) {
  var values = SpreadsheetApp.getActiveSheet().getDataRange().getValues();
  
  for(var i = 0; i < values.length; i++) {
    var value = values[i];
    
    var first = value[0];
  }
}