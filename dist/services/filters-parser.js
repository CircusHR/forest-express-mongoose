"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _lodash = _interopRequireDefault(require("lodash"));
var _forestExpress = _interopRequireWildcard(require("forest-express"));
var _errors = require("./errors");
var _schema = _interopRequireDefault(require("../utils/schema"));
var _flattener = _interopRequireDefault(require("./flattener"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t6 in e) "default" !== _t6 && {}.hasOwnProperty.call(e, _t6) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t6)) && (i.get || i.set) ? o(f, _t6, i) : f[_t6] = e[_t6]); return f; })(e, t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
var AGGREGATOR_OPERATORS = ['and', 'or'];
var FLATTEN_SEPARATOR = _flattener["default"].FLATTEN_SEPARATOR;
function FiltersParser(model, timezone, options) {
  var _this = this;
  var modelSchema = _forestExpress["default"].Schemas.schemas[_schema["default"].getModelName(model)];
  var parseInteger = function parseInteger(value) {
    return Number.parseInt(value, 10);
  };
  var parseDate = function parseDate(value) {
    return new Date(value);
  };
  var parseBoolean = function parseBoolean(value) {
    if (['true', 'yes', '1'].includes(value)) {
      return true;
    }
    if (['false', 'no', '0'].includes(value)) {
      return false;
    }
    return typeof value === 'boolean' ? value : null;
  };
  var parseObjectId = function parseObjectId(value) {
    // This fix issue where using aggregation pipeline, mongoose does not
    // automatically cast 'looking like' string value to ObjectId
    // CF Github Issue https://github.com/Automattic/mongoose/issues/1399
    var ObjectId = options.Mongoose.Types.ObjectId;
    if (ObjectId.isValid(value) && new ObjectId(value).toString() === value) {
      return new ObjectId(value);
    }
    return value;
  };
  var parseOther = function parseOther(value) {
    return value;
  };
  this.operatorDateParser = new _forestExpress.BaseOperatorDateParser({
    operators: {
      GTE: '$gte',
      LTE: '$lte'
    },
    timezone: timezone
  });
  this.perform = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator().m(function _callee(filtersString) {
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            return _context.a(2, _forestExpress.BaseFiltersParser.perform(filtersString, _this.formatAggregation, _this.formatCondition, modelSchema));
        }
      }, _callee);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
  this.formatAggregation = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator().m(function _callee2(aggregator, formatedConditions) {
      var aggregatorOperator;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            aggregatorOperator = _this.formatAggregatorOperator(aggregator);
            return _context2.a(2, (0, _defineProperty2["default"])({}, aggregatorOperator, formatedConditions));
        }
      }, _callee2);
    }));
    return function (_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();
  this.formatCondition = /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator().m(function _callee3(condition) {
      var isSmartField,
        formatedField,
        _args3 = arguments,
        _t,
        _t2,
        _t3,
        _t4;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            isSmartField = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : false;
            if (!isSmartField) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2, _this.formatOperatorValue(condition.field, condition.operator, condition.value));
          case 1:
            formatedField = _this.formatField(condition.field);
            _t = _defineProperty2["default"];
            _t2 = {};
            _t3 = _flattener["default"].unflattenFieldName(formatedField);
            _context3.n = 2;
            return _this.formatOperatorValue(condition.field, condition.operator, condition.value);
          case 2:
            _t4 = _context3.v;
            return _context3.a(2, _t(_t2, _t3, _t4));
        }
      }, _callee3);
    }));
    return function (_x4) {
      return _ref4.apply(this, arguments);
    };
  }();
  this.getParserForType = function (type) {
    var mongooseTypes = options.Mongoose.Schema.Types;
    switch (type) {
      case 'Number':
      case Number:
      case mongooseTypes.Number:
        return parseInteger;
      case 'Date':
      case Date:
      case mongooseTypes.Date:
        return parseDate;
      case 'Boolean':
      case Boolean:
      case mongooseTypes.Boolean:
        return parseBoolean;
      case 'ObjectId':
      case mongooseTypes.ObjectId:
        return parseObjectId;
      default:
        return parseOther;
    }
  };
  this.getParserForField = /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator().m(function _callee4(key) {
      var _key$split, _key$split2, fieldName, subfieldName, field, fieldPath, fieldType, parse;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            _key$split = key.split(':'), _key$split2 = (0, _slicedToArray2["default"])(_key$split, 2), fieldName = _key$split2[0], subfieldName = _key$split2[1];
            field = _forestExpress.SchemaUtils.getField(modelSchema, fieldName);
            if (field) {
              _context4.n = 1;
              break;
            }
            throw new _errors.InvalidFiltersFormatError("Field '".concat(fieldName, "' not found on collection '").concat(modelSchema.name, "'"));
          case 1:
            fieldPath = subfieldName ? "".concat(fieldName).concat(FLATTEN_SEPARATOR).concat(subfieldName) : fieldName; // NOTICE: either nested or virtual, not both
            fieldType = field.isVirtual ? field.type : _schema["default"].getNestedFieldType(model.schema, fieldPath);
            if (fieldType) {
              _context4.n = 2;
              break;
            }
            return _context4.a(2, function (val) {
              return val;
            });
          case 2:
            parse = _this.getParserForType(fieldType);
            return _context4.a(2, function (value) {
              if (value && Array.isArray(value)) {
                return value.map(parse);
              }
              return parse(value);
            });
        }
      }, _callee4);
    }));
    return function (_x5) {
      return _ref6.apply(this, arguments);
    };
  }();
  this.formatAggregatorOperator = function (aggregatorOperator) {
    if (AGGREGATOR_OPERATORS.includes(aggregatorOperator)) return "$".concat(aggregatorOperator);
    throw new _errors.NoMatchingOperatorError();
  };
  this.formatOperatorValue = /*#__PURE__*/function () {
    var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator().m(function _callee5(field, operator, value) {
      var parseFct, _t5;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            if (!_this.operatorDateParser.isDateOperator(operator)) {
              _context5.n = 1;
              break;
            }
            return _context5.a(2, _this.operatorDateParser.getDateFilter(operator, value));
          case 1:
            _context5.n = 2;
            return _this.getParserForField(field);
          case 2:
            parseFct = _context5.v;
            _t5 = operator;
            _context5.n = _t5 === 'not' ? 3 : _t5 === 'not_equal' ? 3 : _t5 === 'greater_than' ? 4 : _t5 === 'after' ? 4 : _t5 === 'less_than' ? 5 : _t5 === 'before' ? 5 : _t5 === 'contains' ? 6 : _t5 === 'starts_with' ? 7 : _t5 === 'ends_with' ? 8 : _t5 === 'not_contains' ? 9 : _t5 === 'present' ? 10 : _t5 === 'blank' ? 11 : _t5 === 'equal' ? 12 : _t5 === 'in' ? 13 : 14;
            break;
          case 3:
            return _context5.a(2, {
              $ne: parseFct(value)
            });
          case 4:
            return _context5.a(2, {
              $gt: parseFct(value)
            });
          case 5:
            return _context5.a(2, {
              $lt: parseFct(value)
            });
          case 6:
            return _context5.a(2, new RegExp(".*".concat(parseFct(value), ".*")));
          case 7:
            return _context5.a(2, new RegExp("^".concat(parseFct(value), ".*")));
          case 8:
            return _context5.a(2, new RegExp(".*".concat(parseFct(value), "$")));
          case 9:
            return _context5.a(2, {
              $not: new RegExp(".*".concat(parseFct(value), ".*"))
            });
          case 10:
            return _context5.a(2, {
              $exists: true,
              $ne: null
            });
          case 11:
            return _context5.a(2, {
              $in: [null, '']
            });
          case 12:
            return _context5.a(2, parseFct(value));
          case 13:
            return _context5.a(2, Array.isArray(value) ? {
              $in: parseFct(value)
            } : {
              $in: value.split(',').map(function (elem) {
                return elem.trim();
              })
            });
          case 14:
            throw new _errors.NoMatchingOperatorError();
          case 15:
            return _context5.a(2);
        }
      }, _callee5);
    }));
    return function (_x6, _x7, _x8) {
      return _ref7.apply(this, arguments);
    };
  }();
  this.formatField = function (field) {
    return field.replace(':', '.');
  };
  this.getAssociations = /*#__PURE__*/function () {
    var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator().m(function _callee6(filtersString) {
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            return _context6.a(2, _forestExpress.BaseFiltersParser.getAssociations(filtersString));
        }
      }, _callee6);
    }));
    return function (_x9) {
      return _ref8.apply(this, arguments);
    };
  }();
  this.formatAggregationForReferences = function (aggregator, conditions) {
    return {
      aggregator: aggregator,
      conditions: conditions
    };
  };
  this.formatConditionForReferences = /*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator().m(function _callee7(condition) {
      var _this$formatField$spl, _this$formatField$spl2, fieldName, subFieldName, field, subModel, subModelFilterParser, newCondition, query, _field$reference$spli, _field$reference$spli2, referencedKey, subModelRecords, subModelIds, resultCondition;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.n) {
          case 0:
            if (!_lodash["default"].isEmpty(condition)) {
              _context7.n = 1;
              break;
            }
            throw new _errors.InvalidFiltersFormatError('Empty condition in filter');
          case 1:
            if (_lodash["default"].isObject(condition)) {
              _context7.n = 2;
              break;
            }
            throw new _errors.InvalidFiltersFormatError('Condition cannot be a raw value');
          case 2:
            if (!Array.isArray(condition)) {
              _context7.n = 3;
              break;
            }
            throw new _errors.InvalidFiltersFormatError('Filters cannot be a raw array');
          case 3:
            if (!(!_lodash["default"].isString(condition.field) || !_lodash["default"].isString(condition.operator) || _lodash["default"].isUndefined(condition.value))) {
              _context7.n = 4;
              break;
            }
            throw new _errors.InvalidFiltersFormatError('Invalid condition format');
          case 4:
            _this$formatField$spl = _this.formatField(condition.field).split('.'), _this$formatField$spl2 = (0, _slicedToArray2["default"])(_this$formatField$spl, 2), fieldName = _this$formatField$spl2[0], subFieldName = _this$formatField$spl2[1];
            if (subFieldName) {
              _context7.n = 5;
              break;
            }
            return _context7.a(2, condition);
          case 5:
            // Mongoose Aggregate don't parse the value automatically.
            field = _forestExpress.SchemaUtils.getField(modelSchema, fieldName);
            if (field) {
              _context7.n = 6;
              break;
            }
            throw new _errors.InvalidFiltersFormatError("Field '".concat(fieldName, "' not found on collection '").concat(modelSchema.name, "'"));
          case 6:
            if (field.reference) {
              _context7.n = 7;
              break;
            }
            return _context7.a(2, condition);
          case 7:
            subModel = _schema["default"].getReferenceModel(options, field.reference);
            subModelFilterParser = new FiltersParser(subModel, timezone, options);
            newCondition = {
              operator: condition.operator,
              value: condition.value,
              field: _flattener["default"].unflattenFieldName(subFieldName)
            };
            _context7.n = 8;
            return subModelFilterParser.perform(JSON.stringify(newCondition));
          case 8:
            query = _context7.v;
            _field$reference$spli = field.reference.split('.'), _field$reference$spli2 = (0, _slicedToArray2["default"])(_field$reference$spli, 2), referencedKey = _field$reference$spli2[1];
            _context7.n = 9;
            return subModel.find(query);
          case 9:
            subModelRecords = _context7.v;
            subModelIds = subModelRecords.map(function (record) {
              return record[referencedKey];
            });
            resultCondition = {
              field: fieldName,
              operator: 'in',
              value: subModelIds
            };
            if (!(condition.operator === 'blank')) {
              _context7.n = 10;
              break;
            }
            return _context7.a(2, {
              aggregator: 'or',
              conditions: [{
                field: _flattener["default"].unflattenFieldName(fieldName),
                operator: 'blank',
                value: null
              }, resultCondition]
            });
          case 10:
            return _context7.a(2, resultCondition);
        }
      }, _callee7);
    }));
    return function (_x0) {
      return _ref9.apply(this, arguments);
    };
  }();
  this.replaceAllReferences = /*#__PURE__*/function () {
    var _ref0 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator().m(function _callee8(filtersString) {
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.n) {
          case 0:
            return _context8.a(2, _forestExpress.BaseFiltersParser.perform(filtersString, _this.formatAggregationForReferences, _this.formatConditionForReferences));
        }
      }, _callee8);
    }));
    return function (_x1) {
      return _ref0.apply(this, arguments);
    };
  }();
}
module.exports = FiltersParser;