function onOpen() {
  SpreadsheetApp.getUi()
    .createAddonMenu()
    .addItem('Open Sidebar', 'openSidebar')
    .addToUi();
}

function onInstall() {
  onOpen();
}

function openSidebar() {
  var html = HtmlService.createTemplateFromFile('Sidebar')
    .evaluate();
  
  SpreadsheetApp.getUi().showSidebar(html);
}

function setProperties() {
  var props = PropertiesService.getScriptProperties();
  
  props.setProperties({
    'TWITTER_CONSUMER_KEY': '',
    'TWITTER_CONSUMER_SECRET':	'',
    'TWITTER_ACCESS_TOKEN': '',
    'TWITTER_ACCESS_SECRET': ''
  }, true);
}

function twitterService() {
  var props = PropertiesService.getScriptProperties();
  
  var service = new Twitterlib.OAuth(props);
  
  if(service.hasAccess()) {
    Logger.log('you have access');
  } else {
    Logger.log('you messed up somewhere');
  }
}

function getTweets() {
  var values = SpreadsheetApp.getActiveSheet().getDataRange().getValues();
  
  values.shift();
  
  var tweets = values.map(function(row) {
    return [row[1] + ' says ' + row[2], row[3]];
  });
  
  return tweets;
}

function sendTweet(tweet, image) {
  var props = PropertiesService.getScriptProperties();
  
  var service = new Twitterlib.OAuth(props);
  
  if(service.hasAccess()) {
    
    if(image) {
      var imageId = image.split('?id=')[1];
      
      var imageBlob = DriveApp.getFileById(imageId).getBlob().setContentTypeFromExtension();
      
      var media = service.uploadMedia(imageBlob);
      
      service.sendTweet(tweet, {media_ids: media.media_id_string});
    } else {
      service.sendTweet(tweet);
    }
  }
  
  return;
}















