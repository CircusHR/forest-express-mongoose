"use strict";

var semver = require('semver');
var REGEX_VERSION = /(\d+\.)?(\d+\.)?(\*|\d+)/;
var getVersion = function getVersion(mongoose) {
  try {
    var version = mongoose.version.match(REGEX_VERSION);
    if (version && version[0]) {
      return version[0];
    }
    return null;
  } catch (error) {
    return null;
  }
};
var hasRequiredVersion = function hasRequiredVersion(mongoose, version) {
  try {
    return semver.gte(getVersion(mongoose), version);
  } catch (error) {
    return false;
  }
};
exports.getVersion = getVersion;
exports.hasRequiredVersion = hasRequiredVersion;