//TODO getDyingCells, getBornigArea, getBorningCells
//TODO try iterateCells;
var Field = function () {
    "use strict";
    this._cells = [];
};

Field.prototype = {

    putLiveCell: function (x, y) {
        "use strict";
        Assert.cellCoordinateValid(x);
        Assert.cellCoordinateValid(y);
        
        //TODO provide constants for Cell state
        var newLiveCell = new Cell(x, y, 1);
        
        this._cells.push(newLiveCell);
    },
    
    cellCount: function () {
        "use strict";
        return this._cells.length;
    },

    cellState: function (x, y) {
        "use strict";
        Assert.cellCoordinateValid(x);
        Assert.cellCoordinateValid(y);
        
        var cell = this._findCell(x, y);
        
        return cell === null ? null : cell.state();
    },
    
    habitat: function () {
        "use strict";
        var length = this._cells.length;
        var i;
        
        var xMin = Number.MAX_VALUE;    
        var yMin = Number.MAX_VALUE;    
        var xMax = 0;    
        var yMax = 0;
        
        for (i = 0; i < length; ++i) {
  
            if (i in this._cells) {
                var candidate = this._cells[i];
                var coordinates = candidate.coordinates();
                
                var x = coordinates.x();
                var y = coordinates.y();
                
                xMin = Math.min(x, xMin);
                xMax = Math.max(x, xMax);
                
                yMin = Math.min(y, yMin);
                yMax = Math.max(y, yMax);
            }
        }        
        
        var topLeft = new Coordinates(xMin, yMin);
        var bottomRight = new Coordinates(xMax, yMax);
        var habitat = new Area(topLeft, bottomRight);
        
        return habitat;
    },
    
    _findCell: function (x, y) {
        "use strict";
        var target = new Coordinates(x, y);
        var length = this._cells.length;
        var i;

        for (i = 0; i < length; ++i) {
  
            if (i in this._cells) {
                var candidate = this._cells[i];
                var coordinates = candidate.coordinates();
                
                if (target.equals(coordinates)) {
                    return candidate;
                }
            }
        }
        
        return null;
    }
    
};