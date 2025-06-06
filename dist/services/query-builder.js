"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _lodash = _interopRequireDefault(require("lodash"));
var _forestExpress = _interopRequireDefault(require("forest-express"));
var _schema = _interopRequireDefault(require("../utils/schema"));
var _orm = _interopRequireDefault(require("../utils/orm"));
var _searchBuilder = _interopRequireDefault(require("./search-builder"));
var _filtersParser = _interopRequireDefault(require("./filters-parser"));
var _projectionBuilder = _interopRequireDefault(require("./projection-builder"));
var _flattener = _interopRequireDefault(require("./flattener"));
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
var QueryBuilder = /*#__PURE__*/function () {
  function QueryBuilder(model, params, opts) {
    (0, _classCallCheck2["default"])(this, QueryBuilder);
    this._model = model;
    this._params = params;
    this._opts = opts;
    this._schema = _forestExpress["default"].Schemas.schemas[_schema["default"].getModelName(this._model)];
    this._searchBuilder = new _searchBuilder["default"](this._model, this._opts, this._params, this._schema.searchFields);
    this._filterParser = new _filtersParser["default"](this._model, this._params.timezone, this._opts);
    this._projectionBuilder = new _projectionBuilder["default"](this._schema);
  }
  return (0, _createClass2["default"])(QueryBuilder, [{
    key: "getFieldNamesRequested",
    value: function () {
      var _getFieldNamesRequested = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator().m(function _callee() {
        var associations, _this$_params$sort$sp, _this$_params$sort$sp2, associationFromSorting, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!(!this._params.fields || !this._params.fields[this._model.modelName])) {
                _context.n = 1;
                break;
              }
              return _context.a(2, null);
            case 1:
              if (!this._params.filters) {
                _context.n = 3;
                break;
              }
              _context.n = 2;
              return this._filterParser.getAssociations(this._params.filters);
            case 2:
              _t = _context.v;
              _context.n = 4;
              break;
            case 3:
              _t = [];
            case 4:
              associations = _t;
              if (this._params.sort && this._params.sort.includes('.')) {
                _this$_params$sort$sp = this._params.sort.split('.'), _this$_params$sort$sp2 = (0, _slicedToArray2["default"])(_this$_params$sort$sp, 1), associationFromSorting = _this$_params$sort$sp2[0];
                if (associationFromSorting[0] === '-') {
                  associationFromSorting = associationFromSorting.substring(1);
                }
                associations.push(associationFromSorting);
              }
              return _context.a(2, _lodash["default"].union(this._params.fields[this._model.modelName].split(','), associations));
          }
        }, _callee, this);
      }));
      function getFieldNamesRequested() {
        return _getFieldNamesRequested.apply(this, arguments);
      }
      return getFieldNamesRequested;
    }()
  }, {
    key: "addProjection",
    value: function () {
      var _addProjection = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator().m(function _callee2(jsonQuery) {
        var fieldNames, projection;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _context2.n = 1;
              return this.getFieldNamesRequested();
            case 1:
              fieldNames = _context2.v;
              _context2.n = 2;
              return this._projectionBuilder.getProjection(fieldNames);
            case 2:
              projection = _context2.v;
              return _context2.a(2, projection && jsonQuery.push(projection));
          }
        }, _callee2, this);
      }));
      function addProjection(_x) {
        return _addProjection.apply(this, arguments);
      }
      return addProjection;
    }()
  }, {
    key: "addJoinToQuery",
    value: function addJoinToQuery(field, joinQuery) {
      if (field.reference && !field.isVirtual && !field.integration) {
        if (QueryBuilder._joinAlreadyExists(field, joinQuery)) return this;
        var referencedKey = _schema["default"].getReferenceField(field.reference);
        var subModel = _schema["default"].getReferenceModel(this._opts, field.reference);
        var unflattenedFieldName = _flattener["default"].unflattenFieldName(field.field);
        joinQuery.push({
          $lookup: {
            from: subModel.collection.name,
            localField: unflattenedFieldName,
            foreignField: referencedKey,
            as: unflattenedFieldName
          }
        });
        var fieldPath = unflattenedFieldName && this._model.schema.path(unflattenedFieldName);
        if (fieldPath && fieldPath.instance !== 'Array') {
          joinQuery.push({
            $unwind: {
              path: "$".concat(unflattenedFieldName),
              preserveNullAndEmptyArrays: true
            }
          });
        }
      }
      return this;
    }
  }, {
    key: "joinAllReferences",
    value: function () {
      var _joinAllReferences = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator().m(function _callee3(jsonQuery, alreadyJoinedQuery) {
        var _this = this;
        var fieldNames, flattenReferenceNames;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _context3.n = 1;
              return this.getFieldNamesRequested();
            case 1:
              fieldNames = _context3.v;
              flattenReferenceNames = _flattener["default"].getFlattenedReferenceFieldsFromParams(this._model.modelName, this._params.fields);
              fieldNames = flattenReferenceNames.concat(fieldNames);
              this._schema.fields.forEach(function (field) {
                if (fieldNames && !fieldNames.includes(field.field) || QueryBuilder._joinAlreadyExists(field, alreadyJoinedQuery)) {
                  return;
                }
                _this.addJoinToQuery(field, jsonQuery);
              });
              return _context3.a(2, this);
          }
        }, _callee3, this);
      }));
      function joinAllReferences(_x2, _x3) {
        return _joinAllReferences.apply(this, arguments);
      }
      return joinAllReferences;
    }()
  }, {
    key: "_addFiltersToQuery",
    value: function () {
      var _addFiltersToQuery2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator().m(function _callee4(jsonQuery) {
        var newFilters, newFiltersString, _t2, _t3;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _context4.n = 1;
              return this._filterParser.replaceAllReferences(this._params.filters);
            case 1:
              newFilters = _context4.v;
              newFiltersString = JSON.stringify(newFilters);
              _t2 = jsonQuery;
              _context4.n = 2;
              return this._filterParser.perform(newFiltersString);
            case 2:
              _t3 = _context4.v;
              _t2.push.call(_t2, _t3);
            case 3:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function _addFiltersToQuery(_x4) {
        return _addFiltersToQuery2.apply(this, arguments);
      }
      return _addFiltersToQuery;
    }()
  }, {
    key: "addSortToQuery",
    value: function addSortToQuery(jsonQuery) {
      var order = this._params.sort.startsWith('-') ? -1 : 1;
      var sortParam = order > 0 ? this._params.sort : this._params.sort.substring(1);
      if (this._params.sort.split('.').length > 1) {
        var _this$_params$sort$sp3 = this._params.sort.split('.');
        var _this$_params$sort$sp4 = (0, _slicedToArray2["default"])(_this$_params$sort$sp3, 1);
        sortParam = _this$_params$sort$sp4[0];
        var _this$_params$sort$sp5 = this._params.sort.split('.'),
          _this$_params$sort$sp6 = (0, _slicedToArray2["default"])(_this$_params$sort$sp5, 1),
          association = _this$_params$sort$sp6[0];
        this.addJoinToQuery(association, jsonQuery);
      }
      if (_flattener["default"]._isFieldFlattened(sortParam)) sortParam = _flattener["default"].unflattenFieldName(sortParam);
      jsonQuery.push({
        $sort: (0, _defineProperty2["default"])({}, sortParam, order)
      });
      return this;
    }
  }, {
    key: "addSkipAndLimitToQuery",
    value: function addSkipAndLimitToQuery(jsonQuery) {
      jsonQuery.push({
        $skip: this._getSkip()
      });
      jsonQuery.push({
        $limit: this._getLimit()
      });
      return this;
    }
  }, {
    key: "addCountToQuery",
    value: function addCountToQuery(jsonQuery) {
      if (_orm["default"].hasRequiredVersion(this._opts.Mongoose, '3.4')) {
        jsonQuery.push({
          $count: 'count'
        });
      } else {
        jsonQuery.push({
          $group: {
            _id: null,
            count: {
              $sum: 1
            }
          }
        });
      }
      return this;
    }
  }, {
    key: "_hasPagination",
    value: function _hasPagination() {
      return this._params.page && this._params.page.number;
    }
  }, {
    key: "_getLimit",
    value: function _getLimit() {
      return this._hasPagination() && this._params.page.size ? Number.parseInt(this._params.page.size, 10) : 10;
    }
  }, {
    key: "_getSkip",
    value: function _getSkip() {
      return this._hasPagination() ? (Number.parseInt(this._params.page.number, 10) - 1) * this._getLimit() : 0;
    }
  }, {
    key: "hasSmartFieldSearch",
    value: function hasSmartFieldSearch() {
      return this._searchBuilder.hasSmartFieldSearch;
    }
  }, {
    key: "getFieldsSearched",
    value: function getFieldsSearched() {
      return this._searchBuilder.getFieldsSearched();
    }
  }, {
    key: "getQueryWithFiltersAndJoins",
    value: function () {
      var _getQueryWithFiltersAndJoins = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator().m(function _callee5(segment) {
        var jsonQuery;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              jsonQuery = [];
              _context5.n = 1;
              return this.addFiltersAndJoins(jsonQuery, segment);
            case 1:
              return _context5.a(2, jsonQuery);
          }
        }, _callee5, this);
      }));
      function getQueryWithFiltersAndJoins(_x5) {
        return _getQueryWithFiltersAndJoins.apply(this, arguments);
      }
      return getQueryWithFiltersAndJoins;
    }()
  }, {
    key: "addFiltersAndJoins",
    value: function () {
      var _addFiltersAndJoins = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator().m(function _callee6(jsonQuery, segment) {
        var conditions;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              conditions = [];
              if (!this._params.filters) {
                _context6.n = 1;
                break;
              }
              _context6.n = 1;
              return this._addFiltersToQuery(conditions);
            case 1:
              if (!this._params.search) {
                _context6.n = 2;
                break;
              }
              _context6.n = 2;
              return this._searchBuilder.getWhere(conditions);
            case 2:
              if (segment) {
                conditions.push(segment.where);
              }
              if (conditions.length) {
                jsonQuery.push({
                  $match: {
                    $and: conditions
                  }
                });
              }
              return _context6.a(2, this);
          }
        }, _callee6, this);
      }));
      function addFiltersAndJoins(_x6, _x7) {
        return _addFiltersAndJoins.apply(this, arguments);
      }
      return addFiltersAndJoins;
    }()
  }], [{
    key: "_joinAlreadyExists",
    value: function _joinAlreadyExists(field, joinQuery) {
      return !!_lodash["default"].find(joinQuery, function (join) {
        return join && join.$lookup && join.$lookup.as === field.field;
      });
    }
  }]);
}();
module.exports = QueryBuilder;