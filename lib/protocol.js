(function() {

'use strict';

var _ = require('underscore');

function Protocol(args) {
  this.name    = args.name;
  this.symbols = {};
  _(args.symbols).each(function(value, key) {
    this.symbols[key] = value;
  }, this);
}
exports.Protocol = Protocol;

function Library() {
  this.protocols = {};
  this.encaps = {};
}
exports.Library = Library;

Library.prototype.defineProtocol = function(args) {
  if(_(this.protocols).has(args.name)) {
    throw 'Protocol name exists';
  }
  this.protocols[args.name] = new Protocol(args);
};

Library.prototype.encap = function(from, to, condition) {
  this.encaps[from] = {
    from:      from,
    to:        to,
    condition: condition
  };
};

})();
