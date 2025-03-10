"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
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
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
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
  (0, _createClass2["default"])(LineStatGetter, [{
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
      var _perform = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var params, timezone, timezoneOffset, queryBuilder, jsonQuery, groupBy, sort, sum, _$group, query, records, momentRange, firstDate, lastDate;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _scopes["default"])(this._params, this._model, this._user);
            case 2:
              params = _context.sent;
              timezone = -parseInt((0, _momentTimezone["default"])().tz(params.timezone).format('Z'), 10);
              timezoneOffset = timezone * 60 * 60 * 1000;
              queryBuilder = new _queryBuilder["default"](this._model, params, this._opts);
              _context.next = 8;
              return queryBuilder.getQueryWithFiltersAndJoins(null);
            case 8:
              jsonQuery = _context.sent;
              groupBy = {};
              sort = {};
              if (!params.groupByFieldName) {
                _context.next = 27;
                break;
              }
              _context.t0 = params.timeRange;
              _context.next = _context.t0 === 'Day' ? 15 : _context.t0 === 'Week' ? 19 : _context.t0 === 'Year' ? 22 : 24;
              break;
            case 15:
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
              return _context.abrupt("break", 26);
            case 19:
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
              return _context.abrupt("break", 26);
            case 22:
              groupBy.year = {
                $year: [{
                  $subtract: ["$".concat(params.groupByFieldName), timezoneOffset]
                }]
              };
              return _context.abrupt("break", 26);
            case 24:
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
            case 26:
              sort[params.groupByFieldName] = 1;
            case 27:
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
                  $group: (_$group = {
                    _id: groupBy
                  }, (0, _defineProperty2["default"])(_$group, params.groupByFieldName, {
                    $first: "$".concat(params.groupByFieldName)
                  }), (0, _defineProperty2["default"])(_$group, "count", {
                    $sum: sum
                  }), _$group)
                });
              }
              query = this._model.aggregate(jsonQuery);
              _context.next = 34;
              return query.sort(sort).project({
                values: {
                  key: '$_id',
                  value: '$count'
                }
              }).exec();
            case 34:
              records = _context.sent;
              if (records.length) {
                _context.next = 37;
                break;
              }
              return _context.abrupt("return", {
                value: []
              });
            case 37:
              momentRange = params.timeRange.toLowerCase();
              firstDate = LineStatGetter._setDate(records[0], momentRange);
              lastDate = LineStatGetter._setDate(records[records.length - 1], momentRange);
              records = records.map(function (record) {
                return {
                  label: LineStatGetter._formatLabel(record, momentRange),
                  values: record.values
                };
              });
              return _context.abrupt("return", {
                value: LineStatGetter._fillEmptyIntervals(records, momentRange, firstDate, lastDate)
              });
            case 42:
            case "end":
              return _context.stop();
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
  return LineStatGetter;
}();
module.exports = LineStatGetter;