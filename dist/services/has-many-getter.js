"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
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
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
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
  (0, _createClass2["default"])(HasManyGetter, [{
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
      var _buildConditions2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(recordIds) {
        var conditions, params, conditionsSearch, filtersParser, newFilters, newFiltersString;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              conditions = {
                $and: [{
                  _id: {
                    $in: recordIds
                  }
                }]
              };
              _context.next = 3;
              return (0, _scopes["default"])(this._params, this._model, this._user);
            case 3:
              params = _context.sent;
              if (!params.search) {
                _context.next = 9;
                break;
              }
              _context.next = 7;
              return this._searchBuilder.getConditions();
            case 7:
              conditionsSearch = _context.sent;
              conditions.$and.push(conditionsSearch);
            case 9:
              if (!params.filters) {
                _context.next = 20;
                break;
              }
              filtersParser = new _filtersParser["default"](this._model, params.timezone, this._opts);
              _context.next = 13;
              return filtersParser.replaceAllReferences(params.filters);
            case 13:
              newFilters = _context.sent;
              newFiltersString = JSON.stringify(newFilters);
              _context.t0 = conditions.$and;
              _context.next = 18;
              return filtersParser.perform(newFiltersString);
            case 18:
              _context.t1 = _context.sent;
              _context.t0.push.call(_context.t0, _context.t1);
            case 20:
              return _context.abrupt("return", conditions);
            case 21:
            case "end":
              return _context.stop();
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
      var _getRecordsAndRecordIds2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var id, parentRecords, splitted, childRecordIds, conditions, query, childRecords;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              id = this._params.recordId;
              if (OBJECTID_REGEXP.test(this._params.recordId)) {
                id = new this._opts.Mongoose.Types.ObjectId(id);
              }
              _context2.next = 4;
              return this._parentModel.aggregate().match({
                _id: id
              }).unwind("$".concat(_flattener["default"].unflattenFieldName(this._params.associationName))).project(this._getProjection()).exec();
            case 4:
              parentRecords = _context2.sent;
              splitted = this._params.associationName.split('@@@');
              childRecordIds = _lodash["default"].map(parentRecords, function (record) {
                return splitted.reduce(function (a, prop) {
                  return a ? a[prop] : null;
                }, record);
              });
              _context2.next = 9;
              return this._buildConditions(childRecordIds);
            case 9:
              conditions = _context2.sent;
              query = this._model.find(conditions);
              this._handlePopulate(query);
              _context2.next = 14;
              return query;
            case 14:
              childRecords = _context2.sent;
              return _context2.abrupt("return", [childRecords, childRecordIds]);
            case 16:
            case "end":
              return _context2.stop();
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
      var _perform = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var _yield$this$_getRecor, _yield$this$_getRecor2, childRecords, childRecordIds, fieldSort, descending, recordsSorted, recordIdStrings, sortedChildRecords, fieldsSearched;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this._getRecordsAndRecordIds();
            case 2:
              _yield$this$_getRecor = _context3.sent;
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
              return _context3.abrupt("return", [sortedChildRecords, fieldsSearched]);
            case 15:
            case "end":
              return _context3.stop();
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
      var _count = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var recordsAndRecordIds;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this._getRecordsAndRecordIds();
            case 2:
              recordsAndRecordIds = _context4.sent;
              return _context4.abrupt("return", recordsAndRecordIds[0].length);
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function count() {
        return _count.apply(this, arguments);
      }
      return count;
    }()
  }]);
  return HasManyGetter;
}();
module.exports = HasManyGetter;