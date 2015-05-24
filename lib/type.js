(function() {

'use strict';

var _ = require('underscore');

var stype = require('./simpletype');
var uint  = require('./uint');
var record = require('./record');

var Types = {};

// Add an entry for each simple type
_(stype.SimpleTypes).each(function(key) {
  Types[key] = new stype.SimpleType(key);
});

// Add a symbol for composite types
Types.UInt     = uint.UInt;
Types.Record   = record.Record;
//Types.Variant  = Variant;
//Types.Sequence = Sequence;

// Publish the types
module.exports = Types;

})();
