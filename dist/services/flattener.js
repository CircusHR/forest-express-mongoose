"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _lodash = _interopRequireDefault(require("lodash"));
var _forestExpress = _interopRequireDefault(require("forest-express"));
var _fieldAnalyser = _interopRequireDefault(require("../utils/field-analyser"));
var _schema = require("../utils/schema");
var _class;
var FLATTEN_SEPARATOR = '@@@';
module.exports = (_class = /*#__PURE__*/function () {
  function Flattener(schema, flatten, model, lianaOptions) {
    (0, _classCallCheck2["default"])(this, Flattener);
    this.schema = schema;
    this.flatten = flatten;
    this.model = model;
    this.lianaOptions = lianaOptions;
  }
  (0, _createClass2["default"])(Flattener, [{
    key: "_removeWrongFlattenConfiguration",
    value: function _removeWrongFlattenConfiguration(index) {
      this.flatten.splice(index, 1);
    }
  }, {
    key: "_doesFieldExist",
    value: function _doesFieldExist(fieldName, index) {
      var fieldToFlatten = this.schema.fields.find(function (field) {
        return field.field === fieldName;
      });
      if (!fieldToFlatten) {
        _forestExpress["default"].logger.warn("Could not flatten field ".concat(fieldName, " because it does not exist"));
        this._removeWrongFlattenConfiguration(index);
        return false;
      }
      return true;
    }
  }, {
    key: "_validateFlattenObjectConfiguration",
    value: function _validateFlattenObjectConfiguration(flattenConfiguration, configurationIndex) {
      if (!flattenConfiguration.field) {
        _forestExpress["default"].logger.warn("Could not flatten field with the following configuration ".concat(JSON.stringify(flattenConfiguration), " because no field has been specified"));
        this._removeWrongFlattenConfiguration(configurationIndex);
      } else if (this._doesFieldExist(flattenConfiguration.field, configurationIndex)) {
        Flattener._validateLevelProperty(flattenConfiguration);
      }
    }
  }, {
    key: "validateOptions",
    value: function validateOptions() {
      var _this = this;
      if (!this.flatten) {
        this.flatten = [];
        return;
      }
      if (!Array.isArray(this.flatten)) {
        this.flatten = [];
        _forestExpress["default"].logger.error("Could not flatten fields from collection ".concat(this.schema.name, ", flatten property should be an array."));
        return;
      }
      this.flatten.forEach(function (flattenConfiguration, index) {
        switch ((0, _typeof2["default"])(flattenConfiguration)) {
          case 'string':
            _this.flatten[index] = {
              field: flattenConfiguration
            };
            _this._doesFieldExist(flattenConfiguration, index);
            break;
          case 'object':
            _this._validateFlattenObjectConfiguration(flattenConfiguration, index);
            break;
          default:
            {
              _forestExpress["default"].logger.warn("Could not identify the field to flatten with ".concat(JSON.stringify(flattenConfiguration)));
            }
        }
      });
    }
  }, {
    key: "_flattenField",
    value: function _flattenField(schema, parentFieldName) {
      var _schema$type,
        _this2 = this;
      var newFields = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var level = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      if ((_schema$type = schema.type) !== null && _schema$type !== void 0 && _schema$type.fields && (level === undefined || level > -1)) {
        schema.type.fields.forEach(function (subField) {
          var newFieldName = parentFieldName ? "".concat(parentFieldName).concat(FLATTEN_SEPARATOR).concat(subField.field) : schema.field;
          _this2._flattenField(subField, newFieldName, newFields, level === undefined ? level : level - 1);
        });
      } else {
        schema.field = parentFieldName;
        var fieldInfo = (0, _schema.getMongooseSchemaFromFieldPath)(schema.field.split(FLATTEN_SEPARATOR).join('.'), this.model);
        if (typeof schema.type === 'string' && fieldInfo) {
          var introspectedSchema = new _fieldAnalyser["default"](this.model, this.lianaOptions).getFieldSchema(schema.field, fieldInfo);
          newFields.push(introspectedSchema);
        } else {
          newFields.push(schema);
        }
      }
    }
  }, {
    key: "flattenFields",
    value: function flattenFields() {
      var _this3 = this;
      this.validateOptions();
      var newFields = [];
      this.flatten.forEach(function (flattenConfiguration) {
        var fieldSchemaIndex = _this3.schema.fields.findIndex(function (field) {
          return field.field === flattenConfiguration.field;
        });
        var fieldSchema = _this3.schema.fields[fieldSchemaIndex];
        _this3._flattenField(fieldSchema, fieldSchema.field, newFields, flattenConfiguration.level);
        _this3.schema.fields.splice(fieldSchemaIndex, 1);
      });
      this.schema.fields = [].concat((0, _toConsumableArray2["default"])(this.schema.fields), newFields);
    }
  }], [{
    key: "_validateLevelProperty",
    value: function _validateLevelProperty(flattenConfiguration) {
      if (flattenConfiguration.level !== undefined) {
        flattenConfiguration.level = parseInt(flattenConfiguration.level, 10);
        if (Number.isNaN(flattenConfiguration.level)) {
          _forestExpress["default"].logger.warn("Could not parse flatten level for field ".concat(flattenConfiguration.field, ", defaulting to infinite"));
          delete flattenConfiguration.level;
        }
      }
    }
  }, {
    key: "_isFieldFlattened",
    value: function _isFieldFlattened(name) {
      return name === null || name === void 0 ? void 0 : name.includes(FLATTEN_SEPARATOR);
    }
  }, {
    key: "_getParentFieldName",
    value: function _getParentFieldName(fieldName) {
      return fieldName === null || fieldName === void 0 ? void 0 : fieldName.split(FLATTEN_SEPARATOR)[0];
    }
  }, {
    key: "_unflattenCollectionFields",
    value: function _unflattenCollectionFields(requestedFields) {
      var fieldNames = new Set();
      requestedFields.split(',').forEach(function (requestedField) {
        return fieldNames.add(Flattener._getParentFieldName(requestedField));
      });
      return (0, _toConsumableArray2["default"])(fieldNames).join(',');
    }
  }, {
    key: "_unflattenFields",
    value: function _unflattenFields(request) {
      Object.entries(request.query.fields).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
          collection = _ref2[0],
          requestedFields = _ref2[1];
        if (Flattener._isFieldFlattened(requestedFields)) {
          request.query.fields[collection] = Flattener._unflattenCollectionFields(requestedFields);
        }
      });
    }
  }, {
    key: "_unflattenAttribute",
    value: function _unflattenAttribute(attributeName, value, attributes) {
      var accessPathArray = attributeName.split(FLATTEN_SEPARATOR);
      var parentObjectName = accessPathArray.shift();
      accessPathArray = accessPathArray.reverse();
      var parentObject = attributes[parentObjectName] || {};
      var unflattenedProperty = accessPathArray.reduce(function (a, prop) {
        return (0, _defineProperty2["default"])({}, prop, a);
      }, value);
      var unflattenedObject = _lodash["default"].merge(parentObject, unflattenedProperty);
      return {
        parentObjectName: parentObjectName,
        unflattenedObject: unflattenedObject
      };
    }
  }, {
    key: "_unwrapFlattenedReferences",
    value: function _unwrapFlattenedReferences(request) {
      if (!request.body.data.attributes) request.body.data.attributes = {};
      var _request$body$data = request.body.data,
        attributes = _request$body$data.attributes,
        relationships = _request$body$data.relationships;
      Object.entries(relationships).filter(function (_ref4) {
        var _ref5 = (0, _slicedToArray2["default"])(_ref4, 1),
          attributeName = _ref5[0];
        return Flattener._isFieldFlattened(attributeName);
      }).forEach(function (_ref6) {
        var _value$data;
        var _ref7 = (0, _slicedToArray2["default"])(_ref6, 2),
          attributeName = _ref7[0],
          value = _ref7[1];
        var _Flattener$_unflatten = Flattener._unflattenAttribute(attributeName, (_value$data = value.data) === null || _value$data === void 0 ? void 0 : _value$data.id, attributes),
          parentObjectName = _Flattener$_unflatten.parentObjectName,
          unflattenedObject = _Flattener$_unflatten.unflattenedObject;
        attributes[parentObjectName] = _lodash["default"].merge(attributes[parentObjectName], unflattenedObject);
        delete relationships[attributeName];
      });
    }
  }, {
    key: "_unflattenAttributes",
    value: function _unflattenAttributes(request) {
      Object.entries(request.body.data.attributes).forEach(function (_ref8) {
        var _ref9 = (0, _slicedToArray2["default"])(_ref8, 2),
          attributeName = _ref9[0],
          value = _ref9[1];
        if (Flattener._isFieldFlattened(attributeName)) {
          var _Flattener$_unflatten2 = Flattener._unflattenAttribute(attributeName, value, request.body.data.attributes),
            parentObjectName = _Flattener$_unflatten2.parentObjectName,
            unflattenedObject = _Flattener$_unflatten2.unflattenedObject;
          delete request.body.data.attributes[attributeName];
          request.body.data.attributes[parentObjectName] = unflattenedObject;
        }
      });
    }
  }, {
    key: "_unflattenSubsetQuery",
    value: function _unflattenSubsetQuery(request) {
      Object.entries(request.body.data.attributes.all_records_subset_query).forEach(function (_ref10) {
        var _ref11 = (0, _slicedToArray2["default"])(_ref10, 2),
          key = _ref11[0],
          value = _ref11[1];
        if (key.includes('fields') && Flattener._isFieldFlattened(value)) {
          request.body.data.attributes.all_records_subset_query[key] = Flattener._unflattenCollectionFields(value);
        }
      });
    }
  }, {
    key: "requestUnflattener",
    value: function requestUnflattener(request, response, next) {
      if (request.originalUrl.includes('.csv?')) {
        return next();
      }
      try {
        var _request$body, _request$body$data2, _request$body2, _request$body2$data, _request$query, _request$query2;
        if (!_lodash["default"].isEmpty((_request$body = request.body) === null || _request$body === void 0 ? void 0 : (_request$body$data2 = _request$body.data) === null || _request$body$data2 === void 0 ? void 0 : _request$body$data2.attributes)) {
          Flattener._unflattenAttributes(request);
          if (!_lodash["default"].isEmpty(request.body.data.attributes.all_records_subset_query)) {
            Flattener._unflattenSubsetQuery(request);
          }
        }
        if (!_lodash["default"].isEmpty((_request$body2 = request.body) === null || _request$body2 === void 0 ? void 0 : (_request$body2$data = _request$body2.data) === null || _request$body2$data === void 0 ? void 0 : _request$body2$data.relationships)) {
          Flattener._unwrapFlattenedReferences(request);
        }
        if (!_lodash["default"].isEmpty((_request$query = request.query) === null || _request$query === void 0 ? void 0 : _request$query.fields)) {
          Flattener._unflattenFields(request);
        }
        if (!_lodash["default"].isEmpty((_request$query2 = request.query) === null || _request$query2 === void 0 ? void 0 : _request$query2.context)) {
          request.query.context.field = Flattener.unflattenFieldName(request.query.context.field);
        }
        // Note: filter and sorts are not unflattened here because
        // they are checked against forest schema later on
        return next();
      } catch (error) {
        return next(error);
      }
    }
  }, {
    key: "unflattenParams",
    value: function unflattenParams(params) {
      var unflattenedParams = JSON.parse(JSON.stringify(params));
      if (unflattenedParams.fields) {
        Object.entries(unflattenedParams.fields).forEach(function (_ref12) {
          var _ref13 = (0, _slicedToArray2["default"])(_ref12, 2),
            collection = _ref13[0],
            requestedFields = _ref13[1];
          if (Flattener._isFieldFlattened(requestedFields)) {
            unflattenedParams.fields[collection] = Flattener._unflattenCollectionFields(requestedFields);
          }
        });
      }
      return unflattenedParams;
    }
  }, {
    key: "unflattenFieldName",
    value: function unflattenFieldName(fieldName) {
      if (!fieldName) return null;
      return fieldName.replace(new RegExp(FLATTEN_SEPARATOR, 'g'), '.');
    }
  }, {
    key: "splitOnSeparator",
    value: function splitOnSeparator(fieldName) {
      return fieldName.split(FLATTEN_SEPARATOR);
    }
  }, {
    key: "unflattenFieldNamesInObject",
    value: function unflattenFieldNamesInObject(object) {
      Object.keys(object).forEach(function (fieldName) {
        if (Flattener._isFieldFlattened(fieldName)) {
          object[Flattener.unflattenFieldName(fieldName)] = object[fieldName];
          delete object[fieldName];
        }
      });
    }
  }, {
    key: "flattenRecordDataForUpdates",
    value: function flattenRecordDataForUpdates(record, flattenComposedKey, flattenedFields) {
      if (flattenedFields.length === 0) return record;
      var flattenedRecord = {};
      Object.keys(record).forEach(function (attribute) {
        if (record[attribute] !== null && (0, _typeof2["default"])(record[attribute]) === 'object') {
          var flattenedPath = flattenComposedKey ? "".concat(flattenComposedKey).concat(FLATTEN_SEPARATOR).concat(attribute) : attribute;
          if (flattenedFields.find(function (flattenedField) {
            return flattenedField === flattenedPath;
          })) {
            flattenedRecord[attribute] = record[attribute];
          } else {
            var flattenedNested = Flattener.flattenRecordDataForUpdates(record[attribute], flattenedPath, flattenedFields);
            Object.keys(flattenedNested).forEach(function (nestedAttribute) {
              flattenedRecord["".concat(attribute, ".").concat(nestedAttribute)] = flattenedNested[nestedAttribute];
            });
          }
        } else {
          flattenedRecord[attribute] = record[attribute];
        }
      });
      return flattenedRecord;
    }
  }, {
    key: "getFlattenedFieldsName",
    value: function getFlattenedFieldsName(fields) {
      return fields.filter(function (field) {
        return Flattener._isFieldFlattened(field.field);
      }).map(function (field) {
        return field.field;
      });
    }
  }, {
    key: "getFlattenedReferenceFieldsFromParams",
    value: function getFlattenedReferenceFieldsFromParams(collectionName, fields) {
      var _Interface$Schemas$sc;
      if (!collectionName || !fields) {
        return [];
      }
      var flattenedReferences = Object.keys(fields).filter(function (field) {
        return Flattener._isFieldFlattened(field);
      });
      var collectionReferenceFields = (((_Interface$Schemas$sc = _forestExpress["default"].Schemas.schemas[collectionName]) === null || _Interface$Schemas$sc === void 0 ? void 0 : _Interface$Schemas$sc.fields) || []).filter(function (_ref14) {
        var reference = _ref14.reference;
        return reference;
      });
      return flattenedReferences.filter(function (flattenedReference) {
        return collectionReferenceFields.some(function (_ref15) {
          var field = _ref15.field;
          return field === flattenedReference;
        });
      });
    }
  }, {
    key: "generateNestedPathsFromModelName",
    value: function generateNestedPathsFromModelName(modelName) {
      var _Interface$Schemas$sc2,
        _this4 = this;
      if (!modelName) return [];
      var modelFields = ((_Interface$Schemas$sc2 = _forestExpress["default"].Schemas.schemas[modelName]) === null || _Interface$Schemas$sc2 === void 0 ? void 0 : _Interface$Schemas$sc2.fields) || [];
      var flattenedFields = modelFields.filter(function (field) {
        return _this4._isFieldFlattened(field.field);
      });
      return flattenedFields.map(function (field) {
        return _this4.splitOnSeparator(field.field);
      });
    }
  }, {
    key: "flattenRecordsForExport",
    value: function flattenRecordsForExport(modelName, records) {
      var nestedPaths = this.generateNestedPathsFromModelName(modelName);
      if (!nestedPaths || nestedPaths.length === 0) return records;
      records.forEach(function (record) {
        var flattenedFields = new Set();
        nestedPaths.forEach(function (nestedPath) {
          var flattenFieldName = nestedPath.join(FLATTEN_SEPARATOR);
          record[flattenFieldName] = nestedPath.reduce(function (embedded, attribute) {
            return embedded ? embedded[attribute] : null;
          }, record);
          flattenedFields.add(nestedPath[0]);
        });
        flattenedFields.forEach(function (flattenedField) {
          return delete record[flattenedField];
        });
      });
      return records;
    }
  }]);
  return Flattener;
}(), (0, _defineProperty2["default"])(_class, "FLATTEN_SEPARATOR", FLATTEN_SEPARATOR), _class);