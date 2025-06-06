"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _forestExpress = _interopRequireDefault(require("forest-express"));
var _lodash = _interopRequireDefault(require("lodash"));
var _momentTimezone = _interopRequireDefault(require("moment-timezone"));
var _schema = _interopRequireDefault(require("../utils/schema"));
var _scopes = _interopRequireDefault(require("../utils/scopes"));
var _queryBuilder = _interopRequireDefault(require("./query-builder"));
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
var LineStatGetter = /*#__PURE__*/function () {
  function LineStatGetter(model, params, opts, user) {
    (0, _classCallCheck2["default"])(this, LineStatGetter);
    this._model = model;
    this._params = params;
    this._opts = {
      Mongoose: this._model.base,
      connections: this._model.base.connections
    };
    this._user = user;
  }
  return (0, _createClass2["default"])(LineStatGetter, [{
    key: "_getReference",
    value: function _getReference(fieldName) {
      if (!fieldName) {
        return null;
      }
      var schema = _forestExpress["default"].Schemas.schemas[_schema["default"].getModelName(this._model)];
      var fieldNameWithoutSubField = fieldName.includes(':') ? fieldName.split(':')[0] : fieldName;
      var field = _lodash["default"].find(schema.fields, {
        field: fieldNameWithoutSubField
      });
      return field.reference ? field : null;
    }
  }, {
    key: "perform",
    value: function () {
      var _perform = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator().m(function _callee() {
        var params, timezone, timezoneOffset, queryBuilder, jsonQuery, groupBy, sort, sum, query, records, momentRange, firstDate, lastDate, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.n = 1;
              return (0, _scopes["default"])(this._params, this._model, this._user);
            case 1:
              params = _context.v;
              timezone = -parseInt((0, _momentTimezone["default"])().tz(params.timezone).format('Z'), 10);
              timezoneOffset = timezone * 60 * 60 * 1000;
              queryBuilder = new _queryBuilder["default"](this._model, params, this._opts);
              _context.n = 2;
              return queryBuilder.getQueryWithFiltersAndJoins(null);
            case 2:
              jsonQuery = _context.v;
              groupBy = {};
              sort = {};
              if (!params.groupByFieldName) {
                _context.n = 8;
                break;
              }
              _t = params.timeRange;
              _context.n = _t === 'Day' ? 3 : _t === 'Week' ? 4 : _t === 'Year' ? 5 : 6;
              break;
            case 3:
              groupBy.year = {
                $year: [{
                  $subtract: ["$".concat(params.groupByFieldName), timezoneOffset]
                }]
              };
              groupBy.month = {
                $month: [{
                  $subtract: ["$".concat(params.groupByFieldName), timezoneOffset]
                }]
              };
              groupBy.day = {
                $dayOfMonth: [{
                  $subtract: ["$".concat(params.groupByFieldName), timezoneOffset]
                }]
              };
              return _context.a(3, 7);
            case 4:
              groupBy.week = {
                $week: [{
                  $subtract: ["$".concat(params.groupByFieldName), timezoneOffset]
                }]
              };
              groupBy.year = {
                $year: [{
                  $subtract: ["$".concat(params.groupByFieldName), timezoneOffset]
                }]
              };
              return _context.a(3, 7);
            case 5:
              groupBy.year = {
                $year: [{
                  $subtract: ["$".concat(params.groupByFieldName), timezoneOffset]
                }]
              };
              return _context.a(3, 7);
            case 6:
              // Month
              groupBy.month = {
                $month: [{
                  $subtract: ["$".concat(params.groupByFieldName), timezoneOffset]
                }]
              };
              groupBy.year = {
                $year: [{
                  $subtract: ["$".concat(params.groupByFieldName), timezoneOffset]
                }]
              };
            case 7:
              sort[params.groupByFieldName] = 1;
            case 8:
              sum = 1;
              if (params.aggregateFieldName) {
                sum = "$".concat(params.aggregateFieldName);
              }
              if (params.groupByFieldName) {
                jsonQuery.push({
                  $match: (0, _defineProperty2["default"])({}, params.groupByFieldName, {
                    $ne: null
                  })
                });
              }
              if (groupBy) {
                jsonQuery.push({
                  $group: (0, _defineProperty2["default"])((0, _defineProperty2["default"])({
                    _id: groupBy
                  }, params.groupByFieldName, {
                    $first: "$".concat(params.groupByFieldName)
                  }), "count", {
                    $sum: sum
                  })
                });
              }
              query = this._model.aggregate(jsonQuery);
              _context.n = 9;
              return query.sort(sort).project({
                values: {
                  key: '$_id',
                  value: '$count'
                }
              }).exec();
            case 9:
              records = _context.v;
              if (records.length) {
                _context.n = 10;
                break;
              }
              return _context.a(2, {
                value: []
              });
            case 10:
              momentRange = params.timeRange.toLowerCase();
              firstDate = LineStatGetter._setDate(records[0], momentRange);
              lastDate = LineStatGetter._setDate(records[records.length - 1], momentRange);
              records = records.map(function (record) {
                return {
                  label: LineStatGetter._formatLabel(record, momentRange),
                  values: record.values
                };
              });
              return _context.a(2, {
                value: LineStatGetter._fillEmptyIntervals(records, momentRange, firstDate, lastDate)
              });
          }
        }, _callee, this);
      }));
      function perform() {
        return _perform.apply(this, arguments);
      }
      return perform;
    }()
  }], [{
    key: "_getFormat",
    value: function _getFormat(momentRange) {
      switch (momentRange) {
        case 'day':
          return 'DD/MM/YYYY';
        case 'week':
          return '[W]w-YYYY';
        case 'month':
          return 'MMM YY';
        case 'year':
          return 'YYYY';
        default:
          return null;
      }
    }
  }, {
    key: "_formatLabel",
    value: function _formatLabel(record, momentRange) {
      switch (momentRange) {
        case 'day':
          return (0, _momentTimezone["default"])().year(record._id.year).month(record._id.month - 1).startOf('month').add(record._id.day - 1, 'days').startOf(momentRange).format(LineStatGetter._getFormat(momentRange));
        case 'week':
          return (0, _momentTimezone["default"])().year(record._id.year).week(record._id.week).startOf(momentRange).format(LineStatGetter._getFormat(momentRange));
        case 'month':
          return (0, _momentTimezone["default"])().year(record._id.year).month(record._id.month - 1).startOf(momentRange).format(LineStatGetter._getFormat(momentRange));
        case 'year':
          return record._id.year.toString();
        default:
          return null;
      }
    }
  }, {
    key: "_setDate",
    value: function _setDate(record, momentRange) {
      switch (momentRange) {
        case 'day':
          return (0, _momentTimezone["default"])().year(record._id.year).month(record._id.month - 1).startOf('month').add(record._id.day - 1, 'days').startOf(momentRange);
        case 'week':
          return (0, _momentTimezone["default"])().year(record._id.year).week(record._id.week).startOf(momentRange);
        case 'month':
          return (0, _momentTimezone["default"])().year(record._id.year).month(record._id.month - 1).startOf(momentRange);
        case 'year':
          return (0, _momentTimezone["default"])().year(record._id.year).startOf(momentRange);
        default:
          return null;
      }
    }
  }, {
    key: "_fillEmptyIntervals",
    value: function _fillEmptyIntervals(records, momentRange, firstDate, lastDate) {
      var newRecords = [];
      var currentDate = firstDate;
      while (currentDate <= lastDate) {
        var currentLabel = currentDate.format(LineStatGetter._getFormat(momentRange));
        var currentRecord = _lodash["default"].find(records, {
          label: currentLabel
        });
        var value = currentRecord ? currentRecord.values.value : 0;
        newRecords.push({
          label: currentLabel,
          values: {
            value: value
          }
        });
        currentDate = currentDate.add(1, momentRange);
      }
      return newRecords;
    }
  }]);
}();
module.exports = LineStatGetter;