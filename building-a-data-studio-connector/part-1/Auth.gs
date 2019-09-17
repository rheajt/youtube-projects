function getAuthType() {
  var AuthTypes = cc.AuthType;
  return cc
    .newAuthTypeResponse()
    .setAuthType(AuthTypes.NONE)
    .build();
}

// https://developers.google.com/datastudio/connector/reference#isadminuser
function isAdminUser() {
  return false;
}