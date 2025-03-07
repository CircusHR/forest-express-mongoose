"use strict";

var _ = require('lodash');
function decorateForSearch(records, fields, searchValue) {
  var matchFields = {};
  records.forEach(function (record, index) {
    fields.forEach(function (fieldName) {
      var value = record[fieldName];
      if (value) {
        var searchEscaped = searchValue.replace(/[-[\]{}()*+!<=:?./\\^$|#\s,]/g, '\\$&');
        var searchHighlight = new RegExp(searchEscaped, 'i');
        var match = value.toString().match(searchHighlight);
        if (match) {
          if (!matchFields[index]) {
            matchFields[index] = {
              id: record._id,
              search: []
            };
          }
          matchFields[index].search.push(fieldName);
        }
      }
    });
  });
  return _.isEmpty(matchFields) ? null : matchFields;
}
exports.decorateForSearch = decorateForSearch;