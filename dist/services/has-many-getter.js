"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _forestExpress = _interopRequireDefault(require("forest-express"));
var _lodash = _interopRequireDefault(require("lodash"));
var _schema = _interopRequireDefault(require("../utils/schema"));
var _scopes = _interopRequireDefault(require("../utils/scopes"));
var _filtersParser = _interopRequireDefault(require("./filters-parser"));
var _searchBuilder = _interopRequireDefault(require("./search-builder"));
var _flattener = _interopRequireDefault(require("./flattener"));
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
var OBJECTID_REGEXP = /^[0-9a-fA-F]{24}$/;
var HasManyGetter = /*#__PURE__*/function () {
  function HasManyGetter(parentModel, model, opts, params, user) {
    (0, _classCallCheck2["default"])(this, HasManyGetter);
    this._parentModel = parentModel;
    this._model = model;
    this._params = params;
    this._opts = {
      Mongoose: model.base,
      connections: model.base.connections
    };
    this._user = user;
    this._searchBuilder = new _searchBuilder["default"](model, this._opts, params);
  }
  return (0, _createClass2["default"])(HasManyGetter, [{
    key: "_hasPagination",
    value: function _hasPagination() {
      return this._params.page && this._params.page.number;
    }
  }, {
    key: "_getLimit",
    value: function _getLimit() {
      if (this._hasPagination()) {
        return parseInt(this._params.page.number, 10) * this._params.page.size;
      }
      return 5;
    }
  }, {
    key: "_getSkip",
    value: function _getSkip() {
      if (this._hasPagination()) {
        return (parseInt(this._params.page.number, 10) - 1) * this._params.page.size;
      }
      return 0;
    }
  }, {
    key: "_getProjection",
    value: function _getProjection() {
      var projection = {};
      projection[_flattener["default"].unflattenFieldName(this._params.associationName)] = 1;
      projection._id = 0; // eslint-disable-line

      return projection;
    }
  }, {
    key: "_handlePopulate",
    value: function _handlePopulate(query) {
      var schema = _forestExpress["default"].Schemas.schemas[_schema["default"].getModelName(this._model)];
      _lodash["default"].each(schema.fields, function (field) {
        if (field.reference) {
          query.populate({
            path: field.field,
            strictPopulate: false
          });
        }
      });
    }
  }, {
    key: "_buildConditions",
    value: function () {
      var _buildConditions2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator().m(function _callee(recordIds) {
        var conditions, params, conditionsSearch, filtersParser, newFilters, newFiltersString, _t, _t2;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              conditions = {
                $and: [{
                  _id: {
                    $in: recordIds
                  }
                }]
              };
              _context.n = 1;
              return (0, _scopes["default"])(this._params, this._model, this._user);
            case 1:
              params = _context.v;
              if (!params.search) {
                _context.n = 3;
                break;
              }
              _context.n = 2;
              return this._searchBuilder.getConditions();
            case 2:
              conditionsSearch = _context.v;
              conditions.$and.push(conditionsSearch);
            case 3:
              if (!params.filters) {
                _context.n = 6;
                break;
              }
              filtersParser = new _filtersParser["default"](this._model, params.timezone, this._opts);
              _context.n = 4;
              return filtersParser.replaceAllReferences(params.filters);
            case 4:
              newFilters = _context.v;
              newFiltersString = JSON.stringify(newFilters);
              _t = conditions.$and;
              _context.n = 5;
              return filtersParser.perform(newFiltersString);
            case 5:
              _t2 = _context.v;
              _t.push.call(_t, _t2);
            case 6:
              return _context.a(2, conditions);
          }
        }, _callee, this);
      }));
      function _buildConditions(_x) {
        return _buildConditions2.apply(this, arguments);
      }
      return _buildConditions;
    }()
  }, {
    key: "_getRecordsAndRecordIds",
    value: function () {
      var _getRecordsAndRecordIds2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator().m(function _callee2() {
        var id, parentRecords, splitted, childRecordIds, conditions, query, childRecords;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              id = this._params.recordId;
              if (OBJECTID_REGEXP.test(this._params.recordId)) {
                id = new this._opts.Mongoose.Types.ObjectId(id);
              }
              _context2.n = 1;
              return this._parentModel.aggregate().match({
                _id: id
              }).unwind("$".concat(_flattener["default"].unflattenFieldName(this._params.associationName))).project(this._getProjection()).exec();
            case 1:
              parentRecords = _context2.v;
              splitted = this._params.associationName.split('@@@');
              childRecordIds = _lodash["default"].map(parentRecords, function (record) {
                return splitted.reduce(function (a, prop) {
                  return a ? a[prop] : null;
                }, record);
              });
              _context2.n = 2;
              return this._buildConditions(childRecordIds);
            case 2:
              conditions = _context2.v;
              query = this._model.find(conditions);
              this._handlePopulate(query);
              _context2.n = 3;
              return query;
            case 3:
              childRecords = _context2.v;
              return _context2.a(2, [childRecords, childRecordIds]);
          }
        }, _callee2, this);
      }));
      function _getRecordsAndRecordIds() {
        return _getRecordsAndRecordIds2.apply(this, arguments);
      }
      return _getRecordsAndRecordIds;
    }()
  }, {
    key: "perform",
    value: function () {
      var _perform = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator().m(function _callee3() {
        var _yield$this$_getRecor, _yield$this$_getRecor2, childRecords, childRecordIds, fieldSort, descending, recordsSorted, recordIdStrings, sortedChildRecords, fieldsSearched;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _context3.n = 1;
              return this._getRecordsAndRecordIds();
            case 1:
              _yield$this$_getRecor = _context3.v;
              _yield$this$_getRecor2 = (0, _slicedToArray2["default"])(_yield$this$_getRecor, 2);
              childRecords = _yield$this$_getRecor2[0];
              childRecordIds = _yield$this$_getRecor2[1];
              fieldSort = this._params.sort;
              descending = false;
              if (this._params.sort && this._params.sort[0] === '-') {
                fieldSort = this._params.sort.substring(1);
                descending = true;
              }
              if (fieldSort) {
                recordsSorted = _lodash["default"].sortBy(childRecords, function (record) {
                  return record[fieldSort];
                });
              } else {
                // NOTICE: Convert values to strings, so ObjectIds could be easily searched and compared.
                recordIdStrings = childRecordIds.map(function (recordId) {
                  return String(recordId);
                }); // NOTICE: indexOf could be improved by making a Map from record-ids to their index.
                recordsSorted = _lodash["default"].sortBy(childRecords, function (record) {
                  return recordIdStrings.indexOf(String(record._id));
                }); // eslint-disable-line
              }
              sortedChildRecords = descending ? recordsSorted.reverse() : recordsSorted;
              fieldsSearched = null;
              if (this._params.search) {
                fieldsSearched = this._searchBuilder.getFieldsSearched();
              }
              sortedChildRecords = _lodash["default"].slice(sortedChildRecords, this._getSkip(), this._getSkip() + this._getLimit());
              return _context3.a(2, [sortedChildRecords, fieldsSearched]);
          }
        }, _callee3, this);
      }));
      function perform() {
        return _perform.apply(this, arguments);
      }
      return perform;
    }()
  }, {
    key: "count",
    value: function () {
      var _count = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator().m(function _callee4() {
        var recordsAndRecordIds;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _context4.n = 1;
              return this._getRecordsAndRecordIds();
            case 1:
              recordsAndRecordIds = _context4.v;
              return _context4.a(2, recordsAndRecordIds[0].length);
          }
        }, _callee4, this);
      }));
      function count() {
        return _count.apply(this, arguments);
      }
      return count;
    }()
  }]);
}();
module.exports = HasManyGetter;