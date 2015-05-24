(function() {

'use strict';

var _ = require('underscore');

function Bind(args) {
  if(_(args).isUndefined() || _(args).isNull()) {
    throw 'Bad bind, no args';
  }
  // the type is mandatory
  if(!_(args.type).isObject() || !args.type.isType()) {
    throw 'Bad bind, no valid type: ' + args.type;
  }
  this.type = args.type;
  // the name is optional
  if(args.name) {
    if(!_(args.name).isString()) {
      throw 'Bad bind name: ' + args.name;
    }
    this.name = args.name;
  } else {
    this.name = '';
  }
  // the initializer is optional
  if(args.value) {
    if(!_(args.value).isObject() || !args.value.isExpr()) {
      throw 'Bad bind initializer: ' + args.value;
    }
    this.value = args.value;
  } else {
    this.value = null;
  }
  // the constraint is optional
  if(args.constraint) {
    // maybe isPredicate && types match
    if(!_(args.constraint).isObject()) {
      throw 'Bad bind constraint: ' + args.constraint;
    }
    this.constraint = args.constraint;
  } else {
    this.constraint = null;
  }

}
exports.Bind = Bind;

Bind.prototype.equal = function(rhs) {
  return rhs instanceof Bind;
};

Bind.prototype.notEqual = function(rhs) {
  return !(this.equal(rhs));
};

Bind.prototype.less = function(rhs) {

};

Bind.prototype.toString = function() {
  var constraint = this.constraint ? ' | ' + this.constraint.toString() : '';
  var value      = this.value      ? ' = ' + this.value.toString() : '';
  return [
    this.name,
    ': ',
    this.type.toString(),
    constraint,
    value
  ].join('');
};

})();
