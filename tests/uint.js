(function() {

'use strict';

var _      = require('underscore');
var expect = require('chai').expect;
var steve  = require('..');

var type = steve.type;
var bind = steve.bind;

describe('UInt testing', function() {

  it('UInt construction, should throw', function() {

    expect(function() {
      new type.UInt();
    }).to.throw();
    
    expect(function() {
      new type.UInt('', 'MSBF');
    }).to.throw();
    
    expect(function() {
      new type.UInt('0', 'MSBF');
    }).to.throw();
    
    expect(function() {
      new type.UInt([], 'MSBF');
    }).to.throw();
    
    expect(function() {
      new type.UInt([0, 'MSBF']);
    }).to.throw();
    
    expect(function() {
      new type.UInt(-1, 'MSBF');
    }).to.throw();
    
    expect(function() {
      new type.UInt(1.1, 'MSBF');
    }).to.throw();
    
    expect(function() {
      new type.UInt(0, 'MSBF');
    }).to.throw();
    
    expect(function() {
      new type.UInt(1, '');
    }).to.throw();
    
    expect(function() {
      new type.UInt(1, 'RSBF');
    }).to.throw();

  });

  it('UInt toString()', function() {
    var v1 = new type.UInt(48, 'MSBF');
    expect(v1.toString()).to.equal('UInt(48,MSBF)');

    var v2 = new type.UInt(16, 'LSBF');
    expect(v2.toString()).to.equal('UInt(16,LSBF)');
  });

  it('UInt equality', function() {
    var v1 = new type.UInt(16, 'LSBF');
    var v2 = new type.UInt(17, 'LSBF');
    var v3 = new type.UInt(16, 'LSBF');

    expect(v1.equal(v1)).to.equal(true);
    expect(v2.equal(v2)).to.equal(true);
    expect(v3.equal(v3)).to.equal(true);
    expect(v1.equal(v2)).to.equal(false);
    expect(v2.equal(v3)).to.equal(false);
    expect(v1.equal(v3)).to.equal(true);

    expect(v1.equal(true)).to.equal(false);
    expect(v1.equal(false)).to.equal(false);
    expect(v1.equal({})).to.equal(false);
    expect(v1.equal([])).to.equal(false);
    expect(v1.equal(0)).to.equal(false);
    expect(v1.equal('')).to.equal(false);
    
  });

});

})();
