(function() {

'use strict';

var _ = require('underscore');

var type = require('./type');

function and(lhs, rhs) {
  return lhs && rhs;
}

function andType(lhs, rhs) {
  return lhs === rhs && type.isBoolean(lhs);
}

function or(lhs, rhs) {
  return lhs || rhs;
}

var orType = andType;

function equal(lhs, rhs) {
  return lhs === rhs;
}

function equalType(lhs, rhs) {
  return lhs === rhs && type.isSimpleType(lhs);
}

function notEqual(lhs, rhs) {
  return !equal(lhs, rhs);
}

function notEqualType(lhs, rhs) {
  return lhs === rhs && type.isSimpleType(lhs);
}

function less(lhs, rhs) {
  return lhs < rhs;
}

function lessType(lhs, rhs) {
  return lhs === rhs && type.isNumber(lhs);
}

function lessEqual(lhs, rhs) {
  return less(lhs, rhs) || equal(lhs, rhs);
}

function lessEqualType(lhs, rhs) {
  return lhs === rhs && type.isNumber(lhs);
}

function greater(lhs, rhs) {
  return less(rhs, lhs);
}

function greaterType(lhs, rhs) {
  return lhs === rhs && type.isNumber(lhs);
}

function greaterEqual(lhs, rhs) {
  return greater(lhs, rhs) || equal(lhs, rhs);
}

function greaterEqualType(lhs, rhs) {
  return lhs === rhs && type.isNumber(lhs);
}

function plus(lhs, rhs) {
  return lhs + rhs;
}

function plusType(lhs, rhs) {
  return lhs === rhs && type.isNumber(lhs);
}

function minus(lhs, rhs) {
  return lhs - rhs;
}

function minusType(lhs, rhs) {
  return lhs === rhs && type.isNumber(lhs);
}

function mult(lhs, rhs) {
  return lhs * rhs;
}

function multType(lhs, rhs) {
  return lhs === rhs && type.isNumber(lhs);
}

function div(lhs, rhs) {
  return lhs / rhs;
}

function divType(lhs, rhs) {
  return lhs === rhs && type.isNumber(lhs);
}

function mod(lhs, rhs) {
  return lhs % rhs;
}

function modType(lhs, rhs) {
  return lhs === rhs && type.isNumber(lhs);
}

function rangeType(lhs, rhs) {
  return lhs === rhs && (type.isInteger(lhs) || type.isNat(lhs));
}

function range(lhs, rhs) {
  var result = [];
  for(var i = lhs; i < rhs; ++i) {
    result.push(i);
  }
  return result;
}

function operation(type, evl) {
  return {
    type: type,
    evl: evl
  };
}

var BinOps = {
  'and': operation(andType, and),
  'or': operation(orType, or),
  '=':  operation(equalType, equal),
  '!=': operation(notEqualType, notEqual),
  '<':  operation(lessType, less),
  '<=': operation(lessEqualType, lessEqual),
  '>':  operation(greaterType, greater),
  '>=': operation(greaterEqualType, greaterEqual),
  '+':  operation(plusType, plus),
  '-':  operation(minusType, minus),
  '*':  operation(multType, mult),
  '/':  operation(divType, div),
  '%':  operation(modType, mod),
  '..': operation(rangeType, range)
};
exports.BinOps = BinOps;

})();

