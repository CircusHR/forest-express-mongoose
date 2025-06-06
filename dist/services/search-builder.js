"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
var _ = require('lodash');
var Interface = require('forest-express');
var utils = require('../utils/schema');
function SearchBuilder(model, opts, params, searchFields) {
  var _this = this;
  var schema = Interface.Schemas.schemas[utils.getModelName(model)];
  var fieldsSearched = [];
  this.hasSmartFieldSearch = false;
  this.getFieldsSearched = function () {
    return fieldsSearched;
  };
  this.getConditions = /*#__PURE__*/(0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator().m(function _callee2() {
    var orQuery, pushCondition;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          pushCondition = function _pushCondition(condition, fieldName) {
            orQuery.$or.push(condition);
            fieldsSearched.push(fieldName);
          };
          _this.hasSmartFieldSearch = false;
          orQuery = {
            $or: []
          };
          _.each(model.schema.paths, function (value, key) {
            if (searchFields && !searchFields.includes(value.path) || value.path === model.schema.options.versionKey) {
              return;
            }
            var condition = {};
            var searchValue = params.search.replace(/[-[\]{}()*+!<=:?./\\^$|#\s,]/g, '\\$&');
            var searchRegexp = new RegExp(".*".concat(searchValue, ".*"), 'i');
            if (value.instance === 'ObjectID' || value.instance === 'ObjectId') {
              if (new RegExp('^[0-9a-fA-F]{24}$').test(params.search)) {
                condition[key] = new opts.Mongoose.Types.ObjectId(params.search);
                pushCondition(condition, key);
              }
            } else if (value.instance === 'Number') {
              var searchNumber = Number(params.search);
              if (!Number.isNaN(searchNumber)) {
                condition[key] = searchNumber;
                pushCondition(condition, key);
              }
            } else if (value.instance === 'String') {
              condition[key] = searchRegexp;
              pushCondition(condition, key);
            } else if (value.instance === 'Array') {
              var field = _.find(schema.fields, {
                field: key
              });
              if (_.isArray(field === null || field === void 0 ? void 0 : field.type) && !field.reference) {
                if (field.type[0] === 'String') {
                  condition[key] = searchRegexp;
                  pushCondition(condition, key);
                } else if (field.type[0] === 'Number') {
                  var _searchNumber = Number(params.search);
                  if (!Number.isNaN(_searchNumber)) {
                    condition[key] = _searchNumber;
                    pushCondition(condition, key);
                  }
                } else if (field.type[0].fields && Number.parseInt(params.searchExtended, 10)) {
                  var elemMatch = {
                    $elemMatch: {
                      $or: []
                    }
                  };
                  field.type[0].fields.forEach(function (subField) {
                    var query = {};
                    if (subField.type === 'String' && !value.schema.obj[subField.field].ref) {
                      query[subField.field] = searchRegexp;
                      elemMatch.$elemMatch.$or.push(query);
                    } else if (subField.type === 'Number') {
                      var _searchNumber2 = Number(params.search);
                      if (!Number.isNaN(_searchNumber2)) {
                        query[subField.field] = _searchNumber2;
                        elemMatch.$elemMatch.$or.push(query);
                      }
                    }
                  });
                  condition[key] = elemMatch;
                  pushCondition(condition, key);
                }
              }
            }
          });
          _context2.n = 1;
          return Promise.all(schema.fields.map(/*#__PURE__*/function () {
            var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator().m(function _callee(field) {
              var condition, _t;
              return _regenerator().w(function (_context) {
                while (1) switch (_context.n) {
                  case 0:
                    if (!field.search) {
                      _context.n = 4;
                      break;
                    }
                    _context.p = 1;
                    _context.n = 2;
                    return field.search(params.search);
                  case 2:
                    condition = _context.v;
                    if (condition) {
                      pushCondition(condition, field.field);
                    }
                    _this.hasSmartFieldSearch = true;
                    _context.n = 4;
                    break;
                  case 3:
                    _context.p = 3;
                    _t = _context.v;
                    Interface.logger.error("Cannot search properly on Smart Field ".concat(field.field), _t);
                  case 4:
                    return _context.a(2);
                }
              }, _callee, null, [[1, 3]]);
            }));
            return function (_x) {
              return _ref2.apply(this, arguments);
            };
          }()));
        case 1:
          return _context2.a(2, orQuery.$or.length ? orQuery : {});
      }
    }, _callee2);
  }));
  this.getWhere = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator().m(function _callee3(jsonQuery) {
      var _t2, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            _t2 = jsonQuery;
            _context3.n = 1;
            return _this.getConditions();
          case 1:
            _t3 = _context3.v;
            _t2.push.call(_t2, _t3);
          case 2:
            return _context3.a(2);
        }
      }, _callee3);
    }));
    return function (_x2) {
      return _ref3.apply(this, arguments);
    };
  }();
}
module.exports = SearchBuilder;