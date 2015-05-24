(function() {

'use strict';

var _ = require('underscore');

function Record(bindings) {
  if(!_(bindings).isNull() && 
     !_(bindings).isUndefined() && 
     !_(bindings).isArray()) {
    throw 'Bad Recording construction, bindings: ' + bindings;
  }
  this.bindings = bindings ? bindings : [];
}
exports.Record = Record;

Record.prototype.isType = function() {
  return true;
};

Record.prototype.equal = function(rhs) {
  return rhs instanceof Record &&
         this.bindings.length === rhs.bindings.length &&
         _(_.zip(this.bindings, rhs.bindings)).every(function(cell) {
           return cell[0].equal(cell[1]);
         });
};

Record.prototype.notEqual = function(rhs) {
  return !(this.equal(rhs));
};

Record.prototype.less = function(rhs) {
  if(rhs instanceof Record) {
    for(var i = 0; i < this.bindings.length; ++i) {
      if(i < rhs.bindings.length) {
        if(this.bindings[i].less(rhs.bindings[i])) {
          return true;
        } else if(rhs.bindings[i].less(this.bindings[i])) {
          return false;
        }
      } else {
        return true;
      }
    }
    return false;
  } else {
    return this < rhs;
  }
};

Record.prototype.toString = function() {
  var bindings;
  if(this.bindings) {
    bindings = _(this.bindings).map(function(binding) { 
      return '  ' + binding.toString(); 
    }).join('\n');
  } else {
    bindings = '';
  }
  return ['Record {',
    bindings,
    '}'
  ].join('\n');
};

})();
