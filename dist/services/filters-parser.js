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
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
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
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(filtersString) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", _forestExpress.BaseFiltersParser.perform(filtersString, _this.formatAggregation, _this.formatCondition, modelSchema));
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
  this.formatAggregation = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(aggregator, formatedConditions) {
      var aggregatorOperator;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            aggregatorOperator = _this.formatAggregatorOperator(aggregator);
            return _context2.abrupt("return", (0, _defineProperty2["default"])({}, aggregatorOperator, formatedConditions));
          case 2:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function (_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();
  this.formatCondition = /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(condition) {
      var isSmartField,
        formatedField,
        _args3 = arguments;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            isSmartField = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : false;
            if (!isSmartField) {
              _context3.next = 3;
              break;
            }
            return _context3.abrupt("return", _this.formatOperatorValue(condition.field, condition.operator, condition.value));
          case 3:
            formatedField = _this.formatField(condition.field);
            _context3.t0 = _defineProperty2["default"];
            _context3.t1 = {};
            _context3.t2 = _flattener["default"].unflattenFieldName(formatedField);
            _context3.next = 9;
            return _this.formatOperatorValue(condition.field, condition.operator, condition.value);
          case 9:
            _context3.t3 = _context3.sent;
            return _context3.abrupt("return", (0, _context3.t0)(_context3.t1, _context3.t2, _context3.t3));
          case 11:
          case "end":
            return _context3.stop();
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
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(key) {
      var _key$split, _key$split2, fieldName, subfieldName, field, fieldPath, fieldType, parse;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _key$split = key.split(':'), _key$split2 = (0, _slicedToArray2["default"])(_key$split, 2), fieldName = _key$split2[0], subfieldName = _key$split2[1];
            field = _forestExpress.SchemaUtils.getField(modelSchema, fieldName);
            if (field) {
              _context4.next = 4;
              break;
            }
            throw new _errors.InvalidFiltersFormatError("Field '".concat(fieldName, "' not found on collection '").concat(modelSchema.name, "'"));
          case 4:
            fieldPath = subfieldName ? "".concat(fieldName).concat(FLATTEN_SEPARATOR).concat(subfieldName) : fieldName; // NOTICE: either nested or virtual, not both
            fieldType = field.isVirtual ? field.type : _schema["default"].getNestedFieldType(model.schema, fieldPath);
            if (fieldType) {
              _context4.next = 8;
              break;
            }
            return _context4.abrupt("return", function (val) {
              return val;
            });
          case 8:
            parse = _this.getParserForType(fieldType);
            return _context4.abrupt("return", function (value) {
              if (value && Array.isArray(value)) {
                return value.map(parse);
              }
              return parse(value);
            });
          case 10:
          case "end":
            return _context4.stop();
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
    var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(field, operator, value) {
      var parseFct;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            if (!_this.operatorDateParser.isDateOperator(operator)) {
              _context5.next = 2;
              break;
            }
            return _context5.abrupt("return", _this.operatorDateParser.getDateFilter(operator, value));
          case 2:
            _context5.next = 4;
            return _this.getParserForField(field);
          case 4:
            parseFct = _context5.sent;
            _context5.t0 = operator;
            _context5.next = _context5.t0 === 'not' ? 8 : _context5.t0 === 'not_equal' ? 8 : _context5.t0 === 'greater_than' ? 9 : _context5.t0 === 'after' ? 9 : _context5.t0 === 'less_than' ? 10 : _context5.t0 === 'before' ? 10 : _context5.t0 === 'contains' ? 11 : _context5.t0 === 'starts_with' ? 12 : _context5.t0 === 'ends_with' ? 13 : _context5.t0 === 'not_contains' ? 14 : _context5.t0 === 'present' ? 15 : _context5.t0 === 'blank' ? 16 : _context5.t0 === 'equal' ? 17 : _context5.t0 === 'in' ? 18 : 19;
            break;
          case 8:
            return _context5.abrupt("return", {
              $ne: parseFct(value)
            });
          case 9:
            return _context5.abrupt("return", {
              $gt: parseFct(value)
            });
          case 10:
            return _context5.abrupt("return", {
              $lt: parseFct(value)
            });
          case 11:
            return _context5.abrupt("return", new RegExp(".*".concat(parseFct(value), ".*")));
          case 12:
            return _context5.abrupt("return", new RegExp("^".concat(parseFct(value), ".*")));
          case 13:
            return _context5.abrupt("return", new RegExp(".*".concat(parseFct(value), "$")));
          case 14:
            return _context5.abrupt("return", {
              $not: new RegExp(".*".concat(parseFct(value), ".*"))
            });
          case 15:
            return _context5.abrupt("return", {
              $exists: true,
              $ne: null
            });
          case 16:
            return _context5.abrupt("return", {
              $in: [null, '']
            });
          case 17:
            return _context5.abrupt("return", parseFct(value));
          case 18:
            return _context5.abrupt("return", Array.isArray(value) ? {
              $in: parseFct(value)
            } : {
              $in: value.split(',').map(function (elem) {
                return elem.trim();
              })
            });
          case 19:
            throw new _errors.NoMatchingOperatorError();
          case 20:
          case "end":
            return _context5.stop();
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
    var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(filtersString) {
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", _forestExpress.BaseFiltersParser.getAssociations(filtersString));
          case 1:
          case "end":
            return _context6.stop();
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
    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(condition) {
      var _this$formatField$spl, _this$formatField$spl2, fieldName, subFieldName, field, subModel, subModelFilterParser, newCondition, query, _field$reference$spli, _field$reference$spli2, referencedKey, subModelRecords, subModelIds, resultCondition;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            if (!_lodash["default"].isEmpty(condition)) {
              _context7.next = 2;
              break;
            }
            throw new _errors.InvalidFiltersFormatError('Empty condition in filter');
          case 2:
            if (_lodash["default"].isObject(condition)) {
              _context7.next = 4;
              break;
            }
            throw new _errors.InvalidFiltersFormatError('Condition cannot be a raw value');
          case 4:
            if (!Array.isArray(condition)) {
              _context7.next = 6;
              break;
            }
            throw new _errors.InvalidFiltersFormatError('Filters cannot be a raw array');
          case 6:
            if (!(!_lodash["default"].isString(condition.field) || !_lodash["default"].isString(condition.operator) || _lodash["default"].isUndefined(condition.value))) {
              _context7.next = 8;
              break;
            }
            throw new _errors.InvalidFiltersFormatError('Invalid condition format');
          case 8:
            _this$formatField$spl = _this.formatField(condition.field).split('.'), _this$formatField$spl2 = (0, _slicedToArray2["default"])(_this$formatField$spl, 2), fieldName = _this$formatField$spl2[0], subFieldName = _this$formatField$spl2[1];
            if (subFieldName) {
              _context7.next = 11;
              break;
            }
            return _context7.abrupt("return", condition);
          case 11:
            // Mongoose Aggregate don't parse the value automatically.
            field = _forestExpress.SchemaUtils.getField(modelSchema, fieldName);
            if (field) {
              _context7.next = 14;
              break;
            }
            throw new _errors.InvalidFiltersFormatError("Field '".concat(fieldName, "' not found on collection '").concat(modelSchema.name, "'"));
          case 14:
            if (field.reference) {
              _context7.next = 16;
              break;
            }
            return _context7.abrupt("return", condition);
          case 16:
            subModel = _schema["default"].getReferenceModel(options, field.reference);
            subModelFilterParser = new FiltersParser(subModel, timezone, options);
            newCondition = {
              operator: condition.operator,
              value: condition.value,
              field: _flattener["default"].unflattenFieldName(subFieldName)
            };
            _context7.next = 21;
            return subModelFilterParser.perform(JSON.stringify(newCondition));
          case 21:
            query = _context7.sent;
            _field$reference$spli = field.reference.split('.'), _field$reference$spli2 = (0, _slicedToArray2["default"])(_field$reference$spli, 2), referencedKey = _field$reference$spli2[1];
            _context7.next = 25;
            return subModel.find(query);
          case 25:
            subModelRecords = _context7.sent;
            subModelIds = subModelRecords.map(function (record) {
              return record[referencedKey];
            });
            resultCondition = {
              field: fieldName,
              operator: 'in',
              value: subModelIds
            };
            if (!(condition.operator === 'blank')) {
              _context7.next = 30;
              break;
            }
            return _context7.abrupt("return", {
              aggregator: 'or',
              conditions: [{
                field: _flattener["default"].unflattenFieldName(fieldName),
                operator: 'blank',
                value: null
              }, resultCondition]
            });
          case 30:
            return _context7.abrupt("return", resultCondition);
          case 31:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }));
    return function (_x10) {
      return _ref9.apply(this, arguments);
    };
  }();
  this.replaceAllReferences = /*#__PURE__*/function () {
    var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(filtersString) {
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt("return", _forestExpress.BaseFiltersParser.perform(filtersString, _this.formatAggregationForReferences, _this.formatConditionForReferences));
          case 1:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    }));
    return function (_x11) {
      return _ref10.apply(this, arguments);
    };
  }();
}
module.exports = FiltersParser;