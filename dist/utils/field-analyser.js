"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _ = require('lodash');
var Interface = require('forest-express');
var utils = require('../utils/schema');
var FieldAnalyser = /*#__PURE__*/function () {
  function FieldAnalyser(model, lianaOptions) {
    (0, _classCallCheck2["default"])(this, FieldAnalyser);
    this.model = model;
    this.lianaOptions = lianaOptions;
  }
  (0, _createClass2["default"])(FieldAnalyser, [{
    key: "_formatRef",
    value: function _formatRef(ref) {
      var referenceModel = utils.getReferenceModel(this.lianaOptions, ref);
      if (referenceModel) {
        return utils.getModelName(referenceModel);
      }
      Interface.logger.warn("Cannot find the reference \"".concat(ref, "\" on the model \"").concat(this.model.modelName, "\"."));
      return null;
    }
  }, {
    key: "_detectReference",
    value: function _detectReference(fieldInfo) {
      if (fieldInfo.options) {
        if (fieldInfo.options.ref && fieldInfo.options.type) {
          var ref = this._formatRef(fieldInfo.options.ref);
          return ref ? "".concat(ref, "._id") : null;
        }
        if (_.isArray(fieldInfo.options.type) && fieldInfo.options.type.length && fieldInfo.options.type[0].ref && fieldInfo.options.type[0].type) {
          var _ref = this._formatRef(fieldInfo.options.type[0].ref);
          return _ref ? "".concat(_ref, "._id") : null;
        }
      }
      return null;
    }
  }, {
    key: "_objectType",
    value: function _objectType(fieldsInfo, getType) {
      var _this = this;
      var type = {
        fields: []
      };
      Object.keys(fieldsInfo).forEach(function (fieldName) {
        var fieldInfo = fieldsInfo[fieldName];
        var field = {
          field: fieldName,
          type: getType(fieldName)
        };
        if (fieldName === '_id') {
          field.isPrimaryKey = true;
        }
        if (!field.type) {
          return;
        }
        var ref = _this._detectReference(fieldInfo);
        if (ref) {
          field.reference = ref;
        }
        if (fieldInfo.enumValues && fieldInfo.enumValues.length) {
          field.enums = fieldInfo.enumValues;
        }
        if (fieldInfo["enum"] && Array.isArray(fieldInfo["enum"]) && fieldInfo["enum"].length) {
          field.enums = fieldInfo["enum"];
        }
        type.fields.push(field);
      });
      return type;
    }
  }, {
    key: "_getTypeFromNative",
    value: function _getTypeFromNative(type) {
      var _this2 = this;
      if (type instanceof Array) {
        if (_.isEmpty(type)) {
          return [null];
        }
        return [this._getTypeFromNative(type[0].type || type[0])];
      }
      if (_.isPlainObject(type)) {
        if (_.isEmpty(type)) {
          return 'Json';
        }
        if (type.type) {
          if (type["enum"]) {
            // NOTICE: Detect enum values for Enums in subdocument arrays.
            return 'Enum';
          }
          return this._getTypeFromNative(type.type);
        }
        return this._objectType(type, function (key) {
          return _this2._getTypeFromNative(type[key]);
        });
      }
      if (_.isFunction(type) && type.schemaName === 'ObjectId') {
        return 'String';
      }
      if (type instanceof this.lianaOptions.Mongoose.Schema) {
        return this._schemaType(type);
      }
      switch (type) {
        case String:
          return 'String';
        case Boolean:
          return 'Boolean';
        case Number:
          return 'Number';
        case Date:
          return 'Date';
        default:
          return null;
      }
    }
  }, {
    key: "_getTypeFromMongoose",
    value: function _getTypeFromMongoose(fieldInfo) {
      var _this3 = this;
      if (_.isPlainObject(fieldInfo) && !fieldInfo.path) {
        // Deal with Object
        return this._objectType(fieldInfo, function (fieldName) {
          return _this3._getTypeFromMongoose(fieldInfo[fieldName]);
        });
      }
      if (fieldInfo.instance === 'Array') {
        if (_.isEmpty(fieldInfo.options.type) && !_.isUndefined(fieldInfo.options.type)) {
          return 'Json';
        }

        // Deal with Array
        if (fieldInfo.caster.instance && (fieldInfo.caster.options.ref || _.keys(fieldInfo.caster.options).length === 0)) {
          return [this._getTypeFromMongoose(fieldInfo.caster)];
        }
        if (fieldInfo.options.type[0] instanceof this.lianaOptions.Mongoose.Schema) {
          // Schema
          return [this._schemaType(fieldInfo.options.type[0])];
        }

        // NOTICE: Object with `type` reserved keyword.
        //         See: https://mongoosejs.com/docs/schematypes.html#type-key
        if (fieldInfo.options.type[0] instanceof Object && fieldInfo.options.type[0].type
        // NOTICE: Bypass for schemas like `[{ type: {type: String}, ... }]` where "type" is used
        //         as property, and thus we are in the case of an array of embedded documents.
        //         See: https://mongoosejs.com/docs/faq.html#type-key
        && !fieldInfo.options.type[0].type.type) {
          return [this._getTypeFromNative(fieldInfo.options.type[0])];
        }

        // Object
        return [this._objectType(fieldInfo.options.type[0], function (key) {
          return _this3._getTypeFromNative(fieldInfo.options.type[0][key]);
        })];
      }
      if (fieldInfo.enumValues && fieldInfo.enumValues.length) {
        return 'Enum';
      }
      if (fieldInfo.instance === 'ObjectID' || fieldInfo.instance === 'ObjectId') {
        // Deal with ObjectID
        return 'String';
      }
      if (fieldInfo.instance === 'Embedded') {
        return this._objectType(fieldInfo.schema.obj, function (fieldName) {
          return _this3._getTypeFromNative(fieldInfo.schema.obj[fieldName]);
        });
      }
      if (fieldInfo.instance === 'Mixed') {
        // Deal with Mixed object

        // NOTICE: Object and {} are detected as Json type as they don't have schema.
        if (_.isEmpty(fieldInfo.options.type) && !_.isUndefined(fieldInfo.options.type)) {
          return 'Json';
        }
        if (_.isEmpty(fieldInfo.options) && !_.isUndefined(fieldInfo.options)) {
          return 'Json';
        }
        return null;
      }
      // Deal with primitive type
      return fieldInfo.instance || fieldInfo.options && this._getTypeFromNative(fieldInfo.options.type) || null;
    }
  }, {
    key: "_schemaType",
    value: function _schemaType(type) {
      var _this4 = this;
      return {
        fields: _.map(type.paths, function (fieldType, fieldName) {
          var field = {
            field: fieldName,
            type: _this4._getTypeFromMongoose(fieldType)
          };
          if (fieldName === '_id') {
            field.isPrimaryKey = true;
          }
          if (fieldType.enumValues && fieldType.enumValues.length) {
            field.enums = fieldType.enumValues;
          }
          return field;
        })
      };
    }
  }, {
    key: "_getRequired",
    value: function _getRequired(fieldInfo) {
      return fieldInfo.isRequired === true || fieldInfo.path === '_id' && !fieldInfo.options.auto && fieldInfo.options.type !== this.lianaOptions.Mongoose.ObjectId;
    }
  }, {
    key: "getFieldSchema",
    value: function getFieldSchema(path, fieldInfo) {
      var schema = {
        field: path,
        type: this._getTypeFromMongoose(fieldInfo)
      };
      var ref = this._detectReference(fieldInfo);
      if (ref) {
        schema.reference = ref;
      }
      if (fieldInfo.enumValues && fieldInfo.enumValues.length) {
        schema.enums = fieldInfo.enumValues;
      }

      // NOTICE: Create enums from caster (for ['Enum'] type).
      if (fieldInfo.caster && fieldInfo.caster.enumValues && fieldInfo.caster.enumValues.length) {
        schema.enums = fieldInfo.caster.enumValues;
      }
      var isRequired = this._getRequired(fieldInfo);
      if (isRequired) {
        schema.isRequired = isRequired;
      }
      if (schema.field === '_id') {
        schema.isPrimaryKey = true;
      }
      if (fieldInfo.options && !_.isNull(fieldInfo.options["default"]) && !_.isUndefined(fieldInfo.options["default"]) && !_.isFunction(fieldInfo.options["default"])) {
        schema.defaultValue = fieldInfo.options["default"];
      }
      schema.validations = FieldAnalyser._getValidations(fieldInfo);
      if (schema.validations.length === 0) {
        delete schema.validations;
      }
      return schema;
    }
  }], [{
    key: "_getValidations",
    value: function _getValidations(fieldInfo) {
      var validations = [];
      if (fieldInfo.validators && fieldInfo.validators.length > 0) {
        _.each(fieldInfo.validators, function (validator) {
          if (validator.type === 'required') {
            validations.push({
              type: 'is present'
            });
          }
          if (validator.type === 'minlength') {
            validations.push({
              type: 'is longer than',
              value: validator.minlength
            });
          }
          if (validator.type === 'maxlength') {
            validations.push({
              type: 'is shorter than',
              value: validator.maxlength
            });
          }
          if (validator.type === 'min') {
            validations.push({
              type: 'is greater than',
              value: validator.min
            });
          }
          if (validator.type === 'max') {
            validations.push({
              type: 'is less than',
              value: validator.max
            });
          }
        });
      }
      return validations;
    }
  }]);
  return FieldAnalyser;
}();
module.exports = FieldAnalyser;