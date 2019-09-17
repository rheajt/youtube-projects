function fetchYoutubeData() {
  var statistics = YouTube.Channels.list('statistics', {
    forUsername: 'madrappin'
  }).items[0].statistics;

  return statistics;
}

function fetchStackOverflowData(request) {
  var url = [
    'https://api.stackexchange.com/2.2/users/' + request.configParams.userId,
    '?order=desc&sort=reputation&site=stackoverflow',
    '&key=' + PropertiesService.getScriptProperties().getProperty('STACKOVERFLOW_KEY'),
  ].join('');

  var response = UrlFetchApp.fetch(url);
  return JSON.parse(response.getContentText()).items.shift();
}

function fetchGithubData() {
  var response = UrlFetchApp.fetch('https://api.github.com/users/rheajt');
  return JSON.parse(response.getContentText());
}