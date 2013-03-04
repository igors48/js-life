var Neighbors = Neighbors || {};

Neighbors.NEIGHBORS_OFFSETS = [ new Offset(-1, -1),
                             new Offset(-1, 0),
                             new Offset(-1, +1),
                             new Offset(0, +1),
                             new Offset(+1, +1),
                             new Offset(+1, 0),
                             new Offset(+1, -1),
                             new Offset(0, -1) ];
                             
Neighbors.getNeighbors = function (coordinates) {
    "use strict";
    
    Assert.isCoordinates(coordinates);

    var neighbors = [];
    
    _.each(Neighbors.NEIGHBORS_OFFSETS,
        function (offset) {
            var neighborX = coordinates.x() + offset.x();
            var neighborY = coordinates.y() + offset.y();
            var validNeighbor = Neighbors.isValidNeighbor(neighborX, neighborY);
            
            if (validNeighbor) {
                var neigborCoordinates = new Coordinates(neighborX, neighborY);
                neighbors.push(neigborCoordinates);
            }
        }
    );

    return neighbors;
};

Neighbors.isValidNeighbor = function (x, y) {
    "use strict";
    
    Assert.isInteger(x);
    Assert.isInteger(y);
    
    var xValid = (x >= 0);
    var yValid = (y >= 0);
    var neighborValid = (xValid && yValid);
    
    return neighborValid;
};    
