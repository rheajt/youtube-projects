//0. Create Auth Key in StackApps
//1. DEFINE AUTH TYPE !DONE

//2. GET CONFIG
var cc = DataStudioApp.createCommunityConnector();
var DEFAULT_USER = PropertiesService.getScriptProperties().getProperty('STACKOVERFLOW_USER_ID');

// https://developers.google.com/datastudio/connector/reference#getconfig
function getConfig() {
  var config = cc.getConfig();

  config
    .newInfo()
    .setId('instructions')
    .setText('Enter the User Id to pull StackOverflow data');

  config
    .newTextInput()
    .setId('userId')
    .setName('Enter a single user id')
    .setHelpText('e.g. "4541958"')
    .setPlaceholder(DEFAULT_USER)
    .setAllowOverride(true);

  //  config.setDateRangeRequired(true);

  return config.build();
}

//3. DEFINE THE FIELDS
function getFields() {
  var fields = cc.getFields();
  var types = cc.FieldType;
  var aggregations = cc.AggregationType;

  fields
    .newDimension()
    .setId('display_name')
    .setName('Display Name')
    .setType(types.TEXT);

  fields
    .newDimension()
    .setId('link')
    .setName('Link')
    .setType(types.URL);

  fields
    .newDimension()
    .setId('profile_image')
    .setName('Profile Image')
    .setType(types.URL);

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

  return fields;
}

function getSchema(request) {
  var schema = { schema: getFields().build() };
  console.log(schema);
  return schema;
}

//4. GET DATA FROM API
function getData(request) {
  request.configParams = validateConfig(request.configParams);

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

function validateConfig(configParams) {
  configParams = configParams || {};
  configParams.userId = configParams.userId || DEFAULT_USER;

  configParams.userId = configParams.userId
    .split(',')
    .map(function(x) {
      return x.trim();
    })
    .join(',');

  return configParams;
}

function fetchDataFromApi(request) {
  var url = [
    'https://api.stackexchange.com/2.2/users/' + request.configParams.userId,
    '?order=desc&sort=reputation&site=stackoverflow',
    '&key=' + PropertiesService.getScriptProperties().getProperty('STACKOVERFLOW_KEY'),
  ].join('');

  var response = UrlFetchApp.fetch(url);
  return JSON.parse(response.getContentText());
}

function formatData(response, requestedFields) {
  var item = response.items.shift();
  var row = requestedFields.asArray().map(function(field) {
    switch (field.getId()) {
      case 'display_name':
        return item.display_name;

      case 'link':
        return item.link;

      case 'profile_image':
        return item.profile_image;

      case 'gold_badges':
        return item.badge_counts.gold;

      case 'silver_badges':
        return item.badge_counts.silver;

      case 'bronze_badges':
        return item.badge_counts.bronze;

      case 'reputation':
        return item.reputation;

      default:
        return '';
    }
  });
  return [{ values: row }];
}

//5. UPDATE THE MANIFEST
//6. TEST DEPLOY

