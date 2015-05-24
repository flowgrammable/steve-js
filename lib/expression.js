(function() {

'use strict';

var _ = require('underscore');

var operations = require('./operations');
var type = require('./type');

function Literal(value) {
  if(_(value).isObject() || _(value).isArray() || _(value).isNull() || 
     _(value).isUndefined()) {
    throw 'Bad literal construction: ' + value;
  }
  if(_(value).isFinite()) {
    if(value % 1 === 0) {
      if(value < 0) {
        this._type = type.INTEGER;
      } else {
        this._type = type.NAT;
      }
    } else {
      this._type = type.REAL;
    }
  } else if(_(value).isString()) {
    this._type = type.STRING;
  } else if(_(value).isBoolean()) {
    this._type = type.BOOLEAN;
  }
  this.value = value;
}
exports.Literal = Literal;

Literal.prototype.isExpr = function() {
  return true; 
};

Literal.prototype.elab = function() {
  return this._type;
};

Literal.prototype.evl = function() {
  return this.value;
};

Literal.prototype.toString = function() {
  return this.value;
};

function Variable(name) {
  if(!_(name).isString()) {
    throw 'Bad variable: ' + name;
  }
  this.name = name;
}
exports.Varaible = Variable;

Variable.prototype.isExpr = function() {
  return true; 
};

Variable.prototype.type = function(gamma) {
  return gamma[this.name];
};

Variable.prototype.evl = function(store) {
  return store[this.name];
};

function Assign(name, expr) {
  if(!_(name).isString()) {
    throw 'Bad assignment to name: ' + name;
  }
  if(_(expr).isUndefined() || _(expr).isNull()) {
    throw 'Bad assignment from: ' + expr;
  }
  this.name = name;
  this.expr = expr;
}
exports.Assign = Assign;

Assign.prototype.isExpr = function() {
  return true; 
};

Assign.prototype.type = function(gamma) {
  var type = this.expr.type(gamma);
  gamma[this.name] = type;
  return type;
};

Assign.prototype.evl = function(store) {
  store[this.name] = this.expr.evl(store);
};

function Binary(op, lhs, rhs) {
  if(!_(operations.BinOps).has(op)) {
    throw 'Bad binary operator: ' + op;
  }
  this.op = operations.BinOps[op];

  if(!_(lhs).isObject() || !_(rhs).isObject()) {
    throw 'Bad binary operation on lhs/rhs: ' + lhs + ', ' + rhs;
  }
  this.lhs = lhs;
  this.rhs = rhs;
}
exports.Binary = Binary;

Binary.prototype.isExpr = function() {
  return true; 
};

Binary.prototype.type = function(gamma) {
  var ltype = this.lhs.type(gamma);
  var rtype = this.rhs.type(gamma);
  return this.op.type(ltype, rtype);
};

Binary.prototype.evl = function(store) {
  var lhs = this.lhs.evl(store);
  var rhs = this.rhs.evl(store);
  return this.op.evl(lhs, rhs);
};

})();

