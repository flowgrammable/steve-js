(function() {

'use strict';

var _ = require('underscore');

var SimpleTypes = {
  REAL:     'REAL',
  NAT:      'NAT',
  INTEGER:  'INTEGER',
  STRING:   'STRING',
  BOOLEAN:  'BOOLEAN'
};
exports.SimpleTypes = SimpleTypes;

function SimpleType(type) {
  if(!_(type).isString() || !_(SimpleTypes).has(type)) {
    throw 'Bad SimpleType: ' + type;
  }
  this.type = type;
}
exports.SimpleType = SimpleType;

SimpleType.prototype.isType = function() {
  return true;
};

SimpleType.prototype.equal = function(rhs) {
  return this.type === rhs.type;
};

SimpleType.prototype.notEqual = function(rhs) {
  return !(this.equal(rhs));
};

SimpleType.prototype.less = function(rhs) {
  return this.type < rhs.type;
};

SimpleType.prototype.isReal = function() {
  return this.type === 'REAL';
};

SimpleType.prototype.isNat = function() {
  return this.type === 'NAT';
};

SimpleType.prototype.isInteger = function() {
  return this.type === 'INTEGER';
};

SimpleType.prototype.isString = function() {
  return this.type === 'STRING';
};

SimpleType.prototype.isBoolean = function() {
  return this.type === 'BOOLEAN';
};

SimpleType.prototype.isNumber = function() {
  return this.isReal() || this.isNat() || this.isInteger();
};

SimpleType.prototype.toString = function() {
  return this.type;
};

})();
