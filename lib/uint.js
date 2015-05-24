(function() {

'use strict';

var _ = require('underscore');

var ByteOrder = {
  MSBF: 'MSBF',
  LSBF: 'LSBF'
};
exports.ByteOrder = ByteOrder;

function UInt(bits, order) {
  if((!_(bits).isFinite() || bits % 1 !== 0 || bits < 1 ) ||
     _(bits).isArray() || _(bits).isString()) {
    throw 'Bad UInt construction, bits: ' + bits;
  }
  this.bits  = bits;

  if(bits > 8 && (!_(order).isString() || !_(ByteOrder).has(order))) {
    throw 'Bad UInt construction, order: ' + order;
  }
  if(_(order).isString() && !_(ByteOrder).has(order)) {
    throw 'Bad UInt construction, order: ' + order;
  }
  this.order = order || ByteOrder.MSBF;
}
exports.UInt = UInt;

UInt.prototype.isType = function() {
  return true;
};

UInt.prototype.toString = function() {
  return 'UInt('+this.bits+','+this.order+')';
};

UInt.prototype.equal = function(rhs) {
  return rhs instanceof UInt && 
         this.bits === rhs.bits && 
         this.order === rhs.order;
};

UInt.prototype.notEqual = function(rhs) {
  return !(this.equal(rhs));
};

UInt.prototype.less = function(rhs) {
  return this.bits < rhs.bits || this.order < rhs.order;
};

})();
