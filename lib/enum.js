(function() {

'use strict';

function Enum(type, exprs) {
  this.type    = type;
  this.exprs   = exprs;
  this.symbols = {};
}
exports.Enum = Enum;

Enum.prototype.isType = function() {
  return true;
};

Enum.prototype.equal = function(rhs) {
};

Enum.prototype.notEqual = function(rhs) {
};

Enum.prototype.less = function(rhs) {
};

Enum.prototype.toString = function() {
};

})();
