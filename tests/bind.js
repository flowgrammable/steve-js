(function() {

'use strict';

var expect = require('chai').expect;

var steve = require('..');
var type = steve.type;
var expr = steve.expr;
var bind = steve.bind;

describe('Bind testing', function() {

  it('Bind construction, no throw', function() {

    expect(function() {
      new bind.Bind();
    }).to.throw();
    
    expect(function() {
      new bind.Bind('');
    }).to.throw();
    
    expect(function() {
      new bind.Bind(0);
    }).to.throw();
    
    expect(function() {
      new bind.Bind([]);
    }).to.throw();
    
    expect(function() {
      new bind.Bind([0]);
    }).to.throw();
    
    expect(function() {
      new bind.Bind(['on', 2]);
    }).to.throw();
    
    expect(function() {
      new bind.Bind({});
    }).to.throw();

  });

  it('Bind toString', function() {
    var b1 = new bind.Bind({
      name: 'version',
      type: new type.UInt(8)
    });
    expect(b1.toString()).to.equal('version: UInt(8,MSBF)');
    
    var b2 = new bind.Bind({
      name: 'version',
      type: new type.UInt(8),
      value: new expr.Literal(4)
    });
    expect(b2.toString()).to.equal('version: UInt(8,MSBF) = 4');
  });

});

})();
