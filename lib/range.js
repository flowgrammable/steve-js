(function() {

'use strict';

var _ = require('underscore');

function Range() {
  this.range = [];
}

Range.prototype.union = function(rhs) {
};

Range.prototype.intersection = function(rhs) {
};

Range.prototype.subtract = function(rhs) {
};

Range.prototype.contains = function(val) {
  var result = _(this.range).find(function(pair) {
    return pair[0] <= val && val <= pair[1];
  });
  if(result === undefined) {
    return false;
  } else {
    return true;
  }
};

})();
