var Neighbors = Neighbors || {};

Neighbors.getNeighbors = function (coordinates) {
    "use strict";
    
    Assert.isCoordinates(coordinates);

    var NEIGHBORS_OFFSETS = [ new Offset(-1, -1),
                             new Offset(-1, 0),
                             new Offset(-1, +1),
                             new Offset(0, +1),
                             new Offset(+1, +1),
                             new Offset(+1, 0),
                             new Offset(+1, -1),
                             new Offset(0, -1) ];
    var NEIGHBORS_COUNT = NEIGHBORS_OFFSETS.length;
    
    var neighbors = [];
  
    var i;

    for (i = 0; i < NEIGHBORS_COUNT; ++i) {
  
        if (i in NEIGHBORS_OFFSETS) {
            var offset = NEIGHBORS_OFFSETS[i];
            var neighborX = coordinates.x() + offset.x();
            var neighborY = coordinates.y() + offset.y();
            var validNeighbor = Neighbors.isValidNeighbor(neighborX, neighborY);
            
            if (validNeighbor) {
                var neigborCoordinates = new Coordinates(neighborX, neighborY);
                neighbors.push(neigborCoordinates);
            }
        }
    }
    
    return neighbors;
};

Neighbors.isValidNeighbor = function (x, y) {
    "use strict";
    
    var xValid = (x >= 0);
    var yValid = (y >= 0);
    var neighborValid = (xValid && yValid);
    
    return neighborValid;
};    
