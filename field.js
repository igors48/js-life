//TODO getDyingCells, getBornigArea, getBorningCells
//TODO try iterateCells;
//TODO create Area -- two Coordinates
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

    getCellState: function (x, y) {
        "use strict";
        Assert.cellCoordinateValid(x);
        Assert.cellCoordinateValid(y);
        
        var cell = this._findCell(x, y);
        
        return cell === null ? null : cell.state();
    },
    
    getHabitat: function () {
        "use strict";
        var length = this._cells.length;
        var i;

        for (i = 0; i < length; ++i) {
  
            if (i in this._cells) {
                var candidate = this._cells[i];
                var coordinates = candidate.coordinates();
            }
        }        
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