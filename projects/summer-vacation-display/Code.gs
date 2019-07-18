function doGet(e) {

  var scriptId = e.parameter.script_id || '1Dfp01ngInSXArtAxyPJibt0erlyBAgJJL_5y8eiKcGw';
  var formUrl = SpreadsheetApp.openById(scriptId).getFormUrl();
  setId(scriptId);
  
  var html = HtmlService.createTemplateFromFile('index');
  
  var url = UrlShortener.Url.insert({
    longUrl: formUrl
  });
  
  html.shortUrl = url.id;
  
  return html.evaluate().setTitle('What did you do this summer?');
}

function setId(id) {
  PropertiesService.getScriptProperties().setProperty('SHEET_ID', id);
}

function getId() {
  return PropertiesService.getScriptProperties().getProperty('SHEET_ID');
}

function getCities() {
  var id = getId();
  
  var ss = SpreadsheetApp.openById(id).getActiveSheet();
  
  var vals = ss.getDataRange().getValues();
  
  vals.shift();
  
  return vals.map(function(row) {
//    if(row[4]) {
//      var imageId = row[4].split('=')[1];
//      var image = DriveApp.getFileById(imageId).getBlob().getBytes();
//      
//      image = 'data:image/jpeg;base64,' + Utilities.base64Encode(image);
//    }
    return {
      name: row[2],
      city: row[3],
      latLng: {lat: row[5], lng: row[6]},
      pinned: false
    };
  });
}

function getLatLng(city) {
  var results = Maps.newGeocoder().geocode(city);
  
  return {lat: results.results[0].geometry.location.lat, lng: results.results[0].geometry.location.lng};
}

//https://developers.google.com/maps/documentation/javascript/styling
