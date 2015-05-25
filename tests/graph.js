(function() {

'use strict';

var expect = require('chai').expect;

var graph = require('../lib/graph');

function buildProtocolGraph() {
    var g = new graph.Graph();
    g.vertex('Ethernet');
    g.vertex('VLAN');
    g.vertex('ARP');
    g.vertex('MPLS');
    g.vertex('IPv4');
    g.vertex('IPv6');
    g.vertex('ICMPv4');
    g.vertex('ICMPv6');
    g.vertex('TCP');
    g.vertex('UDP');
    g.vertex('SCTP');

    g.edge('Ethernet', 'VLAN');
    g.edge('Ethernet', 'MPLS');
    g.edge('Ethernet', 'ARP');
    g.edge('Ethernet', 'IPv4');
    g.edge('Ethernet', 'IPv6');
    g.edge('VLAN', 'VLAN');
    g.edge('VLAN', 'ARP');
    g.edge('VLAN', 'IPv4');
    g.edge('VLAN', 'IPv6');
    g.edge('MPLS', 'IPv4');
    g.edge('MPLS', 'IPv6');
    g.edge('IPv4', 'TCP');
    g.edge('IPv4', 'UDP');
    g.edge('IPv4', 'SCTP');
    g.edge('IPv4', 'ICMPv4');
    g.edge('IPv6', 'TCP');
    g.edge('IPv6', 'UDP');
    g.edge('IPv6', 'SCTP');
    g.edge('IPv6', 'ICMPv6');

    return g;
}

describe('Graph tests', function() {

  it('Connected tests', function() {

    var g = new graph.Graph();
    g.vertex(0);
    g.vertex(1);
    g.vertex(2);
    g.vertex(3);

    expect(g.isConnected()).to.equal(false);
    g.edge(0, 1);
    expect(g.isConnected()).to.equal(false);
    g.edge(0, 2);
    expect(g.isConnected()).to.equal(false);
    g.edge(1, 2);
    expect(g.isConnected()).to.equal(false);
    g.edge(0, 3);
    expect(g.isConnected()).to.equal(true);

    var p = buildProtocolGraph();
    expect(g.isConnected()).to.equal(true);
  });

  it('Subgraph tests', function() {
    var g1 = buildProtocolGraph();
    var g2 = buildProtocolGraph();
    var g3 = new graph.Graph();
    var g4 = new graph.Graph();
    var g5 = new graph.Graph();

    g3.vertex(0);
    g4.vertex('Ethernet');
    g5.vertex('Ethernet');
    g5.vertex('VLAN');
    g5.edge('VLAN', 'Ethernet');

    expect(g1.isSubgraph(g1)).to.equal(true);
    expect(g2.isSubgraph(g2)).to.equal(true);
    expect(g1.isSubgraph(g2)).to.equal(true);
    expect(g2.isSubgraph(g1)).to.equal(true);

    expect(g3.isSubgraph(g1)).to.equal(false);
    expect(g3.isSubgraph(g3)).to.equal(true);

    expect(g4.isSubgraph(g1)).to.equal(true);
    expect(g4.isSubgraph(g4)).to.equal(true);

    expect(g5.isSubgraph(g1)).to.equal(false);
    expect(g5.isSubgraph(g5)).to.equal(true);
  });

  it('Path tests', function() {
    var g1 = buildProtocolGraph();

    var p1 = ['Ethernet', 'VLAN'];
    var p11 = ['VLAN', 'Ethernet'];

    var p2 = ['Ethernet', 'ARP'];
    var p3 = ['Ethernet', 'VLAN', 'ARP'];
    var p4 = ['Ethernet', 'VLAN', 'VLAN', 'ARP'];

    var p5 = ['Ethernet', 'IPv4'];
    var p6 = ['Ethernet', 'VLAN', 'VLAN', 'IPv4', 'TCP'];
    var p66 = ['Ethernet', 'TCP'];
    var p666 = ['VLAN', 'TCP'];

    expect(g1.hasPath(p1)).to.equal(true);
    expect(g1.hasPath(p11)).to.equal(false);

    expect(g1.hasPath(p2)).to.equal(true);
    expect(g1.hasPath(p3)).to.equal(true);
    expect(g1.hasPath(p4)).to.equal(true);

    expect(g1.hasPath(p5)).to.equal(true);
    expect(g1.hasPath(p6)).to.equal(true);

    expect(g1.hasPath(p66)).to.equal(false);
    expect(g1.hasPath(p666)).to.equal(false);
  });

});

})();
