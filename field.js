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
    
    generationNext: function() {
        "use strict";
        var borningCells = [];
        var dyingCells = [];
        var livingCells = [];        
        var previousGenerationHabitat = this.habitat();
        var potentiallyArea = previousGenerationHabitat.shrink();
        
        var topLeft = potentiallyArea.topLeft();        
        var bottomRight = potentiallyArea.bottomRight();
        
        var xMin = topLeft.x();
        var xMax = bottomRight.x();

        var yMin = topLeft.y();
        var yMax = bottomRight.y();
        
        for (var x = xMin; x <= xMax; ++x) {
            
            for (var y = yMin; y <= yMax; ++y) {
                var cell = this._findCell(x, y);
                var neighbors = this._countNeighbors(x, y);
                
                if (cell) {
                
                    if (neighbors < 2 || neighbors > 3) {
                        var dyingCell = new Coordinates(x ,y);
                        dyingCells.push(borningCell);    
                    }
                    
                    if (neighbors === 2 || neighbors === 3) {
                        var livingCell = new Coordinates(x, y);
                        livingCells.push(livingCell);
                    }
                }
                
                if (!cell && neighbors === 3) {
                    var borningCell = new Coordinates(x ,y);
                    borningCells.push(borningCell);    
                }
            }
        }
        
        this._updateCells(livingCells, borningCells);
        
        var generationReport = new GenerationReport(borningCells, dyingCells, livingCells, previousGenerationHabitat);
        
        return generationReport;
    },
    
    _updateCells: function(livingCells, borningCells) {
        "use strict";
        this._cells.length = 0;
        
        var length = livingCells.length;

        for (var i = 0; i < length; ++i) {
            var cell = livingCells[i];
            this.putLiveCell(cell.x(), cell.y());
        }

        length = borningCells.length;

        for (var i = 0; i < length; ++i) {
            var cell = borningCells[i];
            this.putLiveCell(cell.x(), cell.y());
        }
    },
    
    _countNeighbors: function (x, y) {
        "use strict";
        var coordinates = new Coordinates(x, y);
        var neighbors = Neighbors.getNeighbors(coordinates);        
        var length = neighbors.length;
        var count = 0;
        
        for (var i = 0; i < length; ++i) {
            var current = neighbors[i];
            var neighbor = this._findCell(current.x(), current.y());
            
            if (neighbor) {
                ++count;
            }
        }
        
        return count;
    },
    
    _findCell: function (x, y) {
        "use strict";
        var target = new Coordinates(x, y);
        var length = this._cells.length;

        for (var i = 0; i < length; ++i) {
  
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