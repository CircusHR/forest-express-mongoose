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
var ResourcesGetter = require('./resources-getter');
var utils = require('../utils/schema');
var Flattener = require('./flattener');
var ResourceUpdater = /*#__PURE__*/function () {
  function ResourceUpdater(model, params, record, user) {
    (0, _classCallCheck2["default"])(this, ResourceUpdater);
    this._model = model;
    this._params = params;
    this._record = record;
    this._user = user;
  }
  return (0, _createClass2["default"])(ResourceUpdater, [{
    key: "perform",
    value: function () {
      var _perform = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator().m(function _callee() {
        var modelName, schema, recordId, flattenedFields, query, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              modelName = utils.getModelName(this._model);
              schema = Interface.Schemas.schemas[utils.getModelName(this._model)];
              recordId = this._record._id;
              _context.n = 1;
              return this._isAllowed(recordId);
            case 1:
              if (_context.v) {
                _context.n = 2;
                break;
              }
              throw createError(404, "The ".concat(this._model.name, " #").concat(recordId, " does not exist."));
            case 2:
              // NOTICE: Old versions of MongoDB (2.X) seem to refuse the presence of
              //         the _id in the $set. So we remove it. It is useless anyway.
              delete this._record._id;
              flattenedFields = Flattener.getFlattenedFieldsName(schema.fields);
              query = this._model.findByIdAndUpdate(recordId, {
                $set: Flattener.flattenRecordDataForUpdates(this._record, null, flattenedFields)
              }, {
                "new": true,
                runValidators: true
              });
              _.each(schema.fields, function (field) {
                if (field.reference) {
                  query.populate({
                    path: field.field,
                    strictPopulate: false
                  });
                }
              });
              _context.p = 3;
              return _context.a(2, query.lean().exec());
            case 4:
              _context.p = 4;
              _t = _context.v;
              if (_t.message.indexOf('Cast to') > -1 && _t.message.indexOf('failed for value') > -1) {
                Interface.logger.warn("Cannot update the ".concat(modelName, " #").concat(recordId, " because of a \"type\" key usage (which is a reserved keyword in Mongoose)."));
              } else {
                Interface.logger.error("Cannot update the ".concat(modelName, " #").concat(recordId, " because of an unexpected issue: ").concat(_t));
              }
              throw _t;
            case 5:
              return _context.a(2);
          }
        }, _callee, this, [[3, 4]]);
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
      var _isAllowed2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator().m(function _callee2(recordId) {
        var params, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              params = {
                timezone: this._params.timezone,
                filters: JSON.stringify({
                  field: '_id',
                  operator: 'equal',
                  value: recordId
                })
              };
              _context2.n = 1;
              return new ResourcesGetter(this._model, null, params, this._user).count();
            case 1:
              _t2 = _context2.v;
              return _context2.a(2, _t2 === 1);
          }
        }, _callee2, this);
      }));
      function _isAllowed(_x) {
        return _isAllowed2.apply(this, arguments);
      }
      return _isAllowed;
    }())
  }]);
}();
module.exports = ResourceUpdater;