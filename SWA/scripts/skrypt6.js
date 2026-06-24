
(function(definition) {
  /* global module, define */
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = definition();
  } else if (typeof define === 'function' && define.amd) {
    define([], definition);
  } else {
    var exports = definition();
    window.astar = exports.astar;
    window.Graph = exports.Graph;
  }
})(function() {

function pathTo(node) {
  var curr = node;
  var path = [];
  while (curr.parent) {
    path.unshift(curr);
    curr = curr.parent;
  }
  return path;
}

function getHeap() {
  return new BinaryHeap(function(node) {
    return node.f;
  });
}

var astar = {
  /**
  * Perform an A* Search on a graph given a start and end node.
  * @param {Graph} graph
  * @param {GridNode} start
  * @param {GridNode} end
  * @param {Object} [options]
  * @param {bool} [options.closest] Specifies whether to return the
             path to the closest node if the target is unreachable.
  * @param {Function} [options.heuristic] Heuristic function (see
  *          astar.heuristics).
  */
  search: function(graph, start, end, options) {
    graph.cleanDirty();
    options = options || {};
    var heuristic = options.heuristic || astar.heuristics.manhattan;
    var closest = options.closest || false;

    var openHeap = getHeap();
    var closestNode = start; // set the start node to be the closest if required

    start.h = heuristic(start, end);
    graph.markDirty(start);

    openHeap.push(start);

    while (openHeap.size() > 0) {

      // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
      var currentNode = openHeap.pop();

      // End case -- result has been found, return the traced path.
      if (currentNode === end) {
        return pathTo(currentNode);
      }

      // Normal case -- move currentNode from open to closed, process each of its neighbors.
      currentNode.closed = true;

      // Find all neighbors for the current node.
      var neighbors = graph.neighbors(currentNode);

      for (var i = 0, il = neighbors.length; i < il; ++i) {
        var neighbor = neighbors[i];

        if (neighbor.closed || neighbor.isWall()) {
          // Not a valid node to process, skip to next neighbor.
          continue;
        }

        // The g score is the shortest distance from start to current node.
        // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
        var gScore = currentNode.g + neighbor.getCost(currentNode);
        var beenVisited = neighbor.visited;

        if (!beenVisited || gScore < neighbor.g) {

          // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
          neighbor.visited = true;
          neighbor.parent = currentNode;
          neighbor.h = neighbor.h || heuristic(neighbor, end);
          neighbor.g = gScore;
          neighbor.f = neighbor.g + neighbor.h;
          graph.markDirty(neighbor);
          if (closest) {
            // If the neighbour is closer than the current closestNode or if it's equally close but has
            // a cheaper path than the current closest node then it becomes the closest node
            if (neighbor.h < closestNode.h || (neighbor.h === closestNode.h && neighbor.g < closestNode.g)) {
              closestNode = neighbor;
            }
          }

          if (!beenVisited) {
            // Pushing to heap will put it in proper place based on the 'f' value.
            openHeap.push(neighbor);
          } else {
            // Already seen the node, but since it has been rescored we need to reorder it in the heap
            openHeap.rescoreElement(neighbor);
          }
        }
      }
    }

    if (closest) {
      return pathTo(closestNode);
    }

    // No result was found - empty array signifies failure to find path.
    return [];
  },
  // See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
  heuristics: {
    manhattan: function(pos0, pos1) {
      var d1 = Math.abs(pos1.x - pos0.x);
      var d2 = Math.abs(pos1.y - pos0.y);
      return d1 + d2;
    },
    diagonal: function(pos0, pos1) {
      var D = 1;
      var D2 = Math.sqrt(2);
      var d1 = Math.abs(pos1.x - pos0.x);
      var d2 = Math.abs(pos1.y - pos0.y);
      return (D * (d1 + d2)) + ((D2 - (2 * D)) * Math.min(d1, d2));
    }
  },
  cleanNode: function(node) {
    node.f = 0;
    node.g = 0;
    node.h = 0;
    node.visited = false;
    node.closed = false;
    node.parent = null;
  }
};

/**
 * A graph memory structure
 * @param {Array} gridIn 2D array of input weights
 * @param {Object} [options]
 * @param {bool} [options.diagonal] Specifies whether diagonal moves are allowed
 */
function Graph(gridIn, options) {
  options = options || {};
  this.nodes = [];
  this.diagonal = !!options.diagonal;
  this.grid = [];
  for (var x = 0; x < gridIn.length; x++) {
    this.grid[x] = [];

    for (var y = 0, row = gridIn[x]; y < row.length; y++) {
      var node = new GridNode(x, y, row[y]);
      this.grid[x][y] = node;
      this.nodes.push(node);
    }
  }
  this.init();
}

Graph.prototype.init = function() {
  this.dirtyNodes = [];
  for (var i = 0; i < this.nodes.length; i++) {
    astar.cleanNode(this.nodes[i]);
  }
};

Graph.prototype.cleanDirty = function() {
  for (var i = 0; i < this.dirtyNodes.length; i++) {
    astar.cleanNode(this.dirtyNodes[i]);
  }
  this.dirtyNodes = [];
};

Graph.prototype.markDirty = function(node) {
  this.dirtyNodes.push(node);
};

Graph.prototype.neighbors = function(node) {
  var ret = [];
  var x = node.x;
  var y = node.y;
  var grid = this.grid;

  // West
  if (grid[x - 1] && grid[x - 1][y]) {
    ret.push(grid[x - 1][y]);
  }

  // East
  if (grid[x + 1] && grid[x + 1][y]) {
    ret.push(grid[x + 1][y]);
  }

  // South
  if (grid[x] && grid[x][y - 1]) {
    ret.push(grid[x][y - 1]);
  }

  // North
  if (grid[x] && grid[x][y + 1]) {
    ret.push(grid[x][y + 1]);
  }

  if (this.diagonal) {
    // Southwest
    if (grid[x - 1] && grid[x - 1][y - 1]) {
      ret.push(grid[x - 1][y - 1]);
    }

    // Southeast
    if (grid[x + 1] && grid[x + 1][y - 1]) {
      ret.push(grid[x + 1][y - 1]);
    }

    // Northwest
    if (grid[x - 1] && grid[x - 1][y + 1]) {
      ret.push(grid[x - 1][y + 1]);
    }

    // Northeast
    if (grid[x + 1] && grid[x + 1][y + 1]) {
      ret.push(grid[x + 1][y + 1]);
    }
  }

  return ret;
};

Graph.prototype.toString = function() {
  var graphString = [];
  var nodes = this.grid;
  for (var x = 0; x < nodes.length; x++) {
    var rowDebug = [];
    var row = nodes[x];
    for (var y = 0; y < row.length; y++) {
      rowDebug.push(row[y].weight);
    }
    graphString.push(rowDebug.join(" "));
  }
  return graphString.join("\n");
};

function GridNode(x, y, weight) {
  this.x = x;
  this.y = y;
  this.weight = weight;
}

GridNode.prototype.toString = function() {
  return "[" + this.x + " " + this.y + "]";
};

GridNode.prototype.getCost = function(fromNeighbor) {
  // Take diagonal weight into consideration.
  if (fromNeighbor && fromNeighbor.x != this.x && fromNeighbor.y != this.y) {
    return this.weight * 1.41421;
  }
  return this.weight;
};

GridNode.prototype.isWall = function() {
  return this.weight === 0;
};

function BinaryHeap(scoreFunction) {
  this.content = [];
  this.scoreFunction = scoreFunction;
}

BinaryHeap.prototype = {
  push: function(element) {
    // Add the new element to the end of the array.
    this.content.push(element);

    // Allow it to sink down.
    this.sinkDown(this.content.length - 1);
  },
  pop: function() {
    // Store the first element so we can return it later.
    var result = this.content[0];
    // Get the element at the end of the array.
    var end = this.content.pop();
    // If there are any elements left, put the end element at the
    // start, and let it bubble up.
    if (this.content.length > 0) {
      this.content[0] = end;
      this.bubbleUp(0);
    }
    return result;
  },
  remove: function(node) {
    var i = this.content.indexOf(node);

    // When it is found, the process seen in 'pop' is repeated
    // to fill up the hole.
    var end = this.content.pop();

    if (i !== this.content.length - 1) {
      this.content[i] = end;

      if (this.scoreFunction(end) < this.scoreFunction(node)) {
        this.sinkDown(i);
      } else {
        this.bubbleUp(i);
      }
    }
  },
  size: function() {
    return this.content.length;
  },
  rescoreElement: function(node) {
    this.sinkDown(this.content.indexOf(node));
  },
  sinkDown: function(n) {
    // Fetch the element that has to be sunk.
    var element = this.content[n];

    // When at 0, an element can not sink any further.
    while (n > 0) {

      // Compute the parent element's index, and fetch it.
      var parentN = ((n + 1) >> 1) - 1;
      var parent = this.content[parentN];
      // Swap the elements if the parent is greater.
      if (this.scoreFunction(element) < this.scoreFunction(parent)) {
        this.content[parentN] = element;
        this.content[n] = parent;
        // Update 'n' to continue at the new position.
        n = parentN;
      }
      // Found a parent that is less, no need to sink any further.
      else {
        break;
      }
    }
  },
  bubbleUp: function(n) {
    // Look up the target element and its score.
    var length = this.content.length;
    var element = this.content[n];
    var elemScore = this.scoreFunction(element);

    while (true) {
      // Compute the indices of the child elements.
      var child2N = (n + 1) << 1;
      var child1N = child2N - 1;
      // This is used to store the new position of the element, if any.
      var swap = null;
      var child1Score;
      // If the first child exists (is inside the array)...
      if (child1N < length) {
        // Look it up and compute its score.
        var child1 = this.content[child1N];
        child1Score = this.scoreFunction(child1);

        // If the score is less than our element's, we need to swap.
        if (child1Score < elemScore) {
          swap = child1N;
        }
      }

      // Do the same checks for the other child.
      if (child2N < length) {
        var child2 = this.content[child2N];
        var child2Score = this.scoreFunction(child2);
        if (child2Score < (swap === null ? elemScore : child1Score)) {
          swap = child2N;
        }
      }

      // If the element needs to be moved, swap it, and continue.
      if (swap !== null) {
        this.content[n] = this.content[swap];
        this.content[swap] = element;
        n = swap;
      }
      // Otherwise, we are done.
      else {
        break;
      }
    }
  }
};

return {
  astar: astar,
  Graph: Graph
};

});

function check_X(){
	return GAME.map_players[GAME.char_data.id].x;
}
function check_y(){
	return GAME.map_players[GAME.char_data.id].y;
}

var missionsCount = [];
var count = 0;
var z = 0;
var grid = [];
var x = 0;
var y = 0;
var graph;
var start;
var end;
var result;
var moveCounter = 0;
var wait = 500;
var waitMove = 100;
var whatNow = 0;
var missionTime = 0;
var waiting = false;

function start(){
	if(!GAME.is_loading && !waiting){
		action();
		window.setTimeout(start,wait);
	}else {
		window.setTimeout(start,wait);
	}
}

function action(){
	switch (whatNow) {
		case 0:
			whatNow++;
			clickMissionPage();
			break;
		case 1:
			whatNow++;
			getMissionCount();
			break;
		break;
			case 2:
			getMissionStartId();
			break;
		break;
			case 3:
			whatNow++;
			initialiseMission();
			break;
		break;
			case 4:
			whatNow++;
			tpToLocation();
			break;
		case 5:
			whatNow++;
			getPathToMissionLocation();
			break;
		case 6:
			moveToMissionLocation();
		break;
			case 7:
			whatNow++;
			acceptMission();
			break;
		case 8:
			waitForMissionEnd();
			break;
		default:

	}
}

function clickMissionPage() {
	$('[data-page="game_camp"]').click();
}

function getMissionCount() {
	var parent = jQuery('#camp_tab > tbody').children();
	
	for(let i = 1; i < parent.length; i++) {
		let element = jQuery(parent[i]).children()[1];
		missionsCount[i - 1] = parseInt(jQuery(element).html());
		count += parseInt(jQuery(element).html());
	}
};

function getMissionStartId() {
	if(missionsCount[z] == 0) {
		z++;;
	} else {
		whatNow++;
	}
	
	if(z == missionsCount.length) {
		waiting = true;
	}
}

function initialiseMission() {
	if(jQuery('#sel_miss_loc').html().includes("Podziemne")) {
		GAME.emitOrder({
			a: 207,
			type: 2
		});
		whatNow = 2;
		jQuery('#sel_miss_loc').html("<i class=\"upgrade_icon tpp\"></i>aaa");
	} else {
		GAME.emitOrder({
			a: 207,
			type: 1,
			rank: z + 1
		});
	}
}

function tpToLocation() {
	$('#sel_miss_loc').click();
}

function getPathToMissionLocation() {
	x = GAME.current_loc.x_max;
	y = GAME.current_loc.y_max;

	for(let i = 0; i < x; i++) {
		grid[i] = [];
	}

	for(var i = 1; i < x; i++) {
		for(var j = 1; j < y; j++) {
			grid[i][j] = GAME.mapcell[i + '_' + j].m;
		}
	}

	graph = new Graph(grid, { diagonal: true });

	startFrom = graph.grid[check_X()][check_y()];
	end = graph.grid[GAME.current_mission.x][GAME.current_mission.y];
	result = astar.search(graph, startFrom, end);
	
	var tmp = jQuery('#sel_miss_time').html();
	var a = tmp.split(':'); // split it at the colons

	missionTime = ((+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2])) * 1000; 
	
	//if(missionTime === 0) {
		missionTime = 60000;
	//}
}

function moveToMissionLocation() {
	if (moveCounter != result.length) {
		if(result[moveCounter].x == check_X() && result[moveCounter].y > check_y()) {
			//dol
			GAME.map_move(1);
		} else if(result[moveCounter].x == check_X() && result[moveCounter].y < check_y()) {
			//gora
			GAME.map_move(2);
		} else if(result[moveCounter].x > check_X() && result[moveCounter].y == check_y()) {
			//prawo
			GAME.map_move(7);
		} else if(result[moveCounter].x < check_X() && result[moveCounter].y == check_y()) {
			//lewo
			GAME.map_move(8);
		} else if(result[moveCounter].x < check_X() && result[moveCounter].y < check_y()) {
			//lewo-gord
			GAME.map_move(6);
		} else if(result[moveCounter].x > check_X() && result[moveCounter].y < check_y()) {
			//prawo-gora
			GAME.map_move(5);
		} else if(result[moveCounter].x < check_X() && result[moveCounter].y > check_y()) {
			//lewo-dol
			GAME.map_move(4);
		} else if(result[moveCounter].x > check_X() && result[moveCounter].y > check_y()) {
			//prawo-dol
			GAME.map_move(3);
		}
		moveCounter++;
	} else {
		whatNow++;
		moveCounter = 0;
	}
}

function acceptMission() {
	GAME.emitOrder({
		a: 207,
		type: 3
	});
}

function waitForMissionEnd() {
	waiting = true;
	window.setTimeout(function(){
		whatNow = 2;
		waiting = false;
	},missionTime + 5000);
}




start();