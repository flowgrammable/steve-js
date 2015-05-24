(function() {

'use strict';

function Sequence(type) {
  if(!_(type).isObject() || !type.isType()) {
    throw 'Bad Sequence type: ' + type;
  }
  this.type = type;
}
exports.Sequence = Sequence;

Sequence.prototype.equal = function(rhs) {
  return rhs instanceof Sequence;
};

Sequence.prototype.notEqual = function(rhs) {
  return !(this.equal(rhs));
};

Sequence.prototype.less = function(rhs) {
};

Sequence.prototype.toString = function() {
};

})();
