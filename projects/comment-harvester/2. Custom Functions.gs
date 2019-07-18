/**
 * Averages a row of grades
 * @param {array} values The row
 * @return The averaged grades
 * @customfunction
 */
function AVGGRADES(values) {
  var row = values[0];
  var total = 0;
  var count = 0;
  for(var i = 0; i < row.length; i++) {
    if(row[i] && typeof row[i] === 'number') {
      total = total + row[i];
      count++;
    }
  } 
  
  return (total / count) / 100 || "";
}
