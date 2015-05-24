(function() {

'use strict';

var expect = require('chai').expect;

var steve = require('..');
var bind = steve.bind;
var type = steve.type;
var expr = steve.expr;

describe('Record testing', function() {

  it('Record construction, throw', function() {
    expect(function() {
      new type.Record(false);
    }).to.throw();
    
    expect(function() {
      new type.Record(true);
    }).to.throw();
    
    expect(function() {
      new type.Record(0);
    }).to.throw();

    expect(function() {
      new type.Record('');
    }).to.throw();
    
    expect(function() {
      new type.Record('asdf');
    }).to.throw();
    
    expect(function() {
      new type.Record({});
    }).to.throw();
  });

  it('Record toString', function() {

    var r1 = new type.Record([
      new bind.Bind({
        name: 'src',
        type: new type.UInt(48, 'MSBF')
      }),
      new bind.Bind({
        name: 'dst',
        type: new type.UInt(48, 'MSBF')
      }),
      new bind.Bind({
        name: 'type',
        type: new type.UInt(16, 'MSBF')
      })
    ]);

    var estr = "Record {\n" +
               "  src: UInt(48,MSBF)\n" +
               "  dst: UInt(48,MSBF)\n" +
               "  type: UInt(16,MSBF)\n" +
               "}";

    expect(r1.toString()).to.equal(estr);

  });

});

})();
