"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _lodash = _interopRequireDefault(require("lodash"));
var _forestExpress = _interopRequireDefault(require("forest-express"));
var _queryBuilder = _interopRequireDefault(require("./query-builder"));
var _schema = _interopRequireDefault(require("../utils/schema"));
var _scopes = _interopRequireDefault(require("../utils/scopes"));
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
var ResourcesGetter = /*#__PURE__*/function () {
  function ResourcesGetter(model, opts, params, user) {
    (0, _classCallCheck2["default"])(this, ResourcesGetter);
    this._model = model;
    this._opts = {
      Mongoose: this._model.base,
      connections: this._model.base.connections
    };
    this._params = params;
    this._user = user;
  }
  return (0, _createClass2["default"])(ResourcesGetter, [{
    key: "_getSegment",
    value: function _getSegment() {
      var _this = this;
      var schema = _forestExpress["default"].Schemas.schemas[_schema["default"].getModelName(this._model)];
      if (schema.segments && this._params.segment) {
        return _lodash["default"].find(schema.segments, function (currentSegment) {
          return currentSegment.name === _this._params.segment;
        });
      }
      return null;
    }
  }, {
    key: "_getSegmentCondition",
    value: function () {
      var _getSegmentCondition2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator().m(function _callee() {
        var segment, where;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              segment = this._getSegment();
              if (!(segment && segment.where && typeof segment.where === 'function')) {
                _context.n = 2;
                break;
              }
              _context.n = 1;
              return segment.where();
            case 1:
              where = _context.v;
              return _context.a(2, {
                where: where
              });
            case 2:
              return _context.a(2, segment);
          }
        }, _callee, this);
      }));
      function _getSegmentCondition() {
        return _getSegmentCondition2.apply(this, arguments);
      }
      return _getSegmentCondition;
    }()
  }, {
    key: "perform",
    value: function () {
      var _perform = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator().m(function _callee2() {
        var params, fieldsSearched, segment, jsonQuery, queryBuilder, records;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _context2.n = 1;
              return (0, _scopes["default"])(this._params, this._model, this._user);
            case 1:
              params = _context2.v;
              fieldsSearched = null;
              _context2.n = 2;
              return this._getSegmentCondition();
            case 2:
              segment = _context2.v;
              jsonQuery = [];
              queryBuilder = new _queryBuilder["default"](this._model, params, this._opts);
              _context2.n = 3;
              return queryBuilder.addFiltersAndJoins(jsonQuery, segment);
            case 3:
              if (!params.search) {
                _context2.n = 4;
                break;
              }
              fieldsSearched = queryBuilder.getFieldsSearched();
              if (!(fieldsSearched.length === 0 && !queryBuilder.hasSmartFieldSearch())) {
                _context2.n = 4;
                break;
              }
              return _context2.a(2, [[], []]);
            case 4:
              if (params.sort) {
                queryBuilder.addSortToQuery(jsonQuery);
              }
              _context2.n = 5;
              return queryBuilder.addProjection(jsonQuery);
            case 5:
              queryBuilder.addSkipAndLimitToQuery(jsonQuery);
              _context2.n = 6;
              return queryBuilder.joinAllReferences(jsonQuery);
            case 6:
              _context2.n = 7;
              return this._model.aggregate(jsonQuery);
            case 7:
              records = _context2.v;
              return _context2.a(2, [records, fieldsSearched]);
          }
        }, _callee2, this);
      }));
      function perform() {
        return _perform.apply(this, arguments);
      }
      return perform;
    }()
  }, {
    key: "count",
    value: function () {
      var _count = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator().m(function _callee3() {
        var params, segment, queryBuilder, jsonQuery, result;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _context3.n = 1;
              return (0, _scopes["default"])(this._params, this._model, this._user);
            case 1:
              params = _context3.v;
              _context3.n = 2;
              return this._getSegmentCondition();
            case 2:
              segment = _context3.v;
              queryBuilder = new _queryBuilder["default"](this._model, params, this._opts);
              _context3.n = 3;
              return queryBuilder.getQueryWithFiltersAndJoins(segment);
            case 3:
              jsonQuery = _context3.v;
              queryBuilder.addCountToQuery(jsonQuery);
              _context3.n = 4;
              return this._model.aggregate(jsonQuery);
            case 4:
              result = _context3.v;
              return _context3.a(2, result[0] ? result[0].count : 0);
          }
        }, _callee3, this);
      }));
      function count() {
        return _count.apply(this, arguments);
      }
      return count;
    }()
  }]);
}();
module.exports = ResourcesGetter;