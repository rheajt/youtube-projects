//0. Create Auth Key in StackApps
//1. DEFINE AUTH TYPE !DONE

//2. GET CONFIG
var cc = DataStudioApp.createCommunityConnector();
var DEFAULT_USER = PropertiesService.getScriptProperties().getProperty('STACKOVERFLOW_USER_ID');

// https://developers.google.com/datastudio/connector/reference#getconfig
function getConfig() {
  var config = cc.getConfig();

  config
    .newTextInput()
    .setId('userId')
    .setName('Enter a single user id')
    .setHelpText('e.g. "4541958"')
    .setPlaceholder(DEFAULT_USER)
    .setAllowOverride(true);

  return config.build();
}

//3. DEFINE THE FIELDS
function getFields() {
  var fields = cc.getFields();
  var types = cc.FieldType;
  var aggregations = cc.AggregationType;

  fields
    .newDimension()
    .setId('gold_badges')
    .setName('Gold Badges')
    .setType(types.NUMBER);

  fields
    .newDimension()
    .setId('silver_badges')
    .setName('Silver Badges')
    .setType(types.NUMBER);

  fields
    .newDimension()
    .setId('bronze_badges')
    .setName('Bronze Badges')
    .setType(types.NUMBER);

  fields
    .newMetric()
    .setId('reputation')
    .setName('Reputation')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);

  fields
    .newDimension()
    .setId('videoCount')
    .setName('Video Count')
    .setType(types.NUMBER);

  fields
    .newDimension()
    .setId('subscriberCount')
    .setName('Subscriber Count')
    .setType(types.NUMBER);


  fields
    .newDimension()
    .setId('viewCount')
    .setName('View Count')
    .setType(types.NUMBER);

  fields
    .newDimension()
    .setId('github_followers')
    .setName('Github Followers')
    .setType(types.NUMBER);

    fields
    .newDimension()
    .setId('github_public_repos')
    .setName('Github Public Repos')
    .setType(types.NUMBER);

  return fields;
}

function getSchema(request) {
  var schema = { schema: getFields().build() };
  console.log(schema);
  return schema;
}

//4. GET DATA FROM API
function getData(request) {
  var requestedFields = getFields().forIds(
    request.fields.map(function(field) {
      return field.name;
    })
  );

  try {
    console.log('start request');
    var apiResponse = fetchDataFromApi(request);
    var data = formatData(apiResponse, requestedFields);
  } catch (e) {
    cc.newUserError()
      .setDebugText('Error fetching data from API. Exception details: ' + e)
      .setText(
        'The connector has encountered an unrecoverable error. Please try again later, or file an issue if this error persists.'
      )
      .throwException();
  }

  return {
    schema: requestedFields.build(),
    rows: data,
  };
}

function fetchDataFromApi(request) {
  var youtube = fetchYoutubeData();
  var stack = fetchStackOverflowData();
  var github = fetchGithubData();

  return {
    youtube: youtube,
    stack: stack,
    github: github
  }
}

function formatData(response, requestedFields) {
  var row = requestedFields.asArray().map(function(field) {
    switch (field.getId()) {
      case 'gold_badges':
        return response.stack.badge_counts.gold;

      case 'silver_badges':
        return response.stack.badge_counts.silver;

      case 'bronze_badges':
        return response.stack.badge_counts.bronze;

      case 'reputation':
        return response.stack.reputation;

      case 'videoCount':
        return response.youtube.videoCount;

      case 'subscriberCount':
        return response.youtube.subscriberCount;

      case 'viewCount':
        return response.youtube.viewCount;

      case 'github_followers':
        return response.github.followers;

      case 'github_public_repose':
        return response.github.public_repos;
      default:
        return '';
    }
  });
  return [{ values: row }];
}
