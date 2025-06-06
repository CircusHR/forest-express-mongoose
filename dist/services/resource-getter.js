"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
var _ = require('lodash');
var Interface = require('forest-express');
var createError = require('http-errors');
var utils = require('../utils/schema');
var ResourcesGetter = require('./resources-getter');
var ResourceGetter = /*#__PURE__*/function () {
  function ResourceGetter(model, params, user) {
    (0, _classCallCheck2["default"])(this, ResourceGetter);
    this._model = model;
    this._params = params;
    this._user = user;
  }
  return (0, _createClass2["default"])(ResourceGetter, [{
    key: "_handlePopulate",
    value: function _handlePopulate(query) {
      var schema = Interface.Schemas.schemas[utils.getModelName(this._model)];
      _.each(schema.fields, function (field) {
        if (field.reference) {
          query.populate({
            path: field.field,
            strictPopulate: false
          });
        }
      });
    }
  }, {
    key: "perform",
    value: function () {
      var _perform = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator().m(function _callee() {
        var record, query;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              record = null;
              _context.n = 1;
              return this._isAllowed();
            case 1:
              if (!_context.v) {
                _context.n = 3;
                break;
              }
              query = this._model.findById(this._params.recordId);
              this._handlePopulate(query);
              _context.n = 2;
              return query.lean().exec();
            case 2:
              record = _context.v;
            case 3:
              if (record) {
                _context.n = 4;
                break;
              }
              throw createError(404, "The ".concat(this._model.name, " #").concat(this._params.recordId, " does not exist."));
            case 4:
              return _context.a(2, record);
          }
        }, _callee, this);
      }));
      function perform() {
        return _perform.apply(this, arguments);
      }
      return perform;
    }()
    /**
     * Check if the record is in scope for the given user.
     * We can't do that in a single request to mongo, as checking scopes requires using
     * an aggregation pipeline to perform $lookups
     */
  }, {
    key: "_isAllowed",
    value: (function () {
      var _isAllowed2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator().m(function _callee2() {
        var params, _t;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              params = {
                timezone: this._params.timezone,
                filters: JSON.stringify({
                  field: '_id',
                  operator: 'equal',
                  value: this._params.recordId
                })
              };
              _context2.n = 1;
              return new ResourcesGetter(this._model, null, params, this._user).count();
            case 1:
              _t = _context2.v;
              return _context2.a(2, _t === 1);
          }
        }, _callee2, this);
      }));
      function _isAllowed() {
        return _isAllowed2.apply(this, arguments);
      }
      return _isAllowed;
    }())
  }]);
}();
module.exports = ResourceGetter;