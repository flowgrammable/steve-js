(function() {

'use strict';

var _ = require('underscore');

function Graph() {
  this.vertices = {};
  this.edges    = {};
}
exports.Graph = Graph;

Graph.prototype.dispStr = function() {
  console.log('Vertices');
  _(this.vertices).each(function(value, key) {
    console.log(key + ': ' + value.color);
  });
  console.log('Edges:');
  _(this.edges).each(function(edges, key) {
    _(edges).each(function(edge) {
      console.log(key + ' -> ' + edge.end.id);
    });
  });
};

Graph.prototype.vertex = function(node) {
  this.vertices[node.toString()] = {
    id:   node.toString(),
    node: node
  };
};

Graph.prototype.edge = function(beg, end, prop) {
  var _beg = beg.toString();
  var _end = end.toString();
  if(!_(this.vertices).has(_beg)) {
    throw 'Begining vertex not present: ' + beg;
  }
  if(!_(this.vertices).has(_end)) {
    throw 'Ending vertex not present: ' + end;
  }
  if(!_(this.edges).has(_beg)) {
    this.edges[_beg] = [];
  }
  this.edges[_beg].push({
    beg: this.vertices[_beg],
    end: this.vertices[_end],
    prop: prop || null
  });
};

Graph.prototype.bfs = function(root, pred) {
  var start = root.toString();
  if(!_(this.vertices).has(start)) {
    throw 'Bad root node: ' + root;
  }
  if(!_(pred).isUndefined() && !_(pred).isNull() && !_(pred).isFunction()) {
    throw 'Bad search predicate: ' + pred;
  }
  // Initialize all vertices but root
  _(this.vertices).each(function(vertex) {
    if(vertex.id !== start) {
      vertex.color    = 'WHITE';
      vertex.distance = Infinity;
      vertex.pi       = null;
    }
  });
  // Initialize the root vertex
  var node = this.vertices[start];
  node.color    = 'GRAY';
  node.distance = 0;
  node.pi       = null;
  // Initialize the queue
  var Q = [node];
  // while the queue is not empty
  while(Q.length > 0) {
    var u = Q.splice(0, 1)[0];
    // return the node if the predicate matches
    if(pred && pred(u.node)) {
      return u;
    }
    /* jshint ignore:start */
    _(this.edges[u.id]).each(function(edge) {
      if(edge.end.color === 'WHITE') {
        // Explore the new vertex and enque it
        edge.end.color    = 'GRAY';
        edge.end.distance = u.distance + 1;
        edge.end.pi       = u;
        Q.push(edge.end);
      }
    });
    /* jshint ignore:end */
    u.color = 'BLACK';
  }
};

Graph.prototype.dfs = function() {
};

Graph.prototype.isSubgraph = function(g) {
  return _(this.vertices).every(function(vertex, key) {
    return _(g.vertices).has(key);
  }) && _(this.edges).every(function(edges, key) {
    return _(edges).every(function(edge) {
      return _(g.edges).has(key) && _(g.edges[key]).find(function(redge) {
        return edge.end.id === redge.end.id;
      }) !== undefined;
    });
  });
};

Graph.prototype.isConnected = function() {
  var vertices = _(this.vertices).values();
  if(vertices.length < 2) {
    return true;
  }
  this.bfs(vertices[0].node);
  return _(this.vertices).every(function(vertex) {
    return vertex.color === 'BLACK';
  });
};

Graph.prototype.hasPath = function(path) {
  var Q = path.slice();
  if(Q.length > 0 && !_(this.vertices).has(Q[0].toString())) {
    return false;
  }
  while(Q.length > 0) {
    var u = Q.splice(0, 1)[0];
    if(Q.length > 0) {
      if(!_(this.vertices).has(Q[0].toString())) {
        return false;
      }
      /* jshint ignore:start */
      if(_(this.edges[u.toString()]).every(function(edge) {
        return edge.end.id !== Q[0].toString();
      })) {
        return false;
      }
      /* jshint ignore:end */
    }
  }
  return true;
};

Graph.prototype.reverse = function() {
  var temp = {};
  _(this.edges).each(function(edge) {
    if(!_(temp).has(edge.end.id)) {
      temp[edge.end.id] = [];
    }
    temp[edge.end.id].push({
      beg:  edge.end,
      end:  edge.beg,
      prop: edge.prop
    });
  });
  this.edges = temp;
};


})();
