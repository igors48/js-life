var Field = function () {
    "use strict";

    this._cells = new CellsList();
};

Field.prototype = {

    putLiveCell: function (x, y) {
        "use strict";

        Assert.cellCoordinateValid(x);
        Assert.cellCoordinateValid(y);
        
        this._cells.add(x, y);
    },

    habitat: function () {
        "use strict";
        
        return this._cells.habitat();
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
                var exists = this._findCell(x, y);
                var neighbors = this._countNeighbors(x, y);
                
                if (exists) {
                
                    if (neighbors < 2 || neighbors > 3) {
                        var dyingCell = new Coordinates(x ,y);
                        dyingCells.push(dyingCell);    
                    }
                    
                    if (neighbors === 2 || neighbors === 3) {
                        var livingCell = new Coordinates(x, y);
                        livingCells.push(livingCell);
                    }
                }
                
                if (!exists && neighbors === 3) {
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

        this._cells = new CellsList();

        var that = this;
        
        _.each(livingCells,
            function (cell) {
                that.putLiveCell(cell.x(), cell.y());
            }
        );

        _.each(borningCells,
            function (cell) {
                that.putLiveCell(cell.x(), cell.y());
            }
        );
    },
    
    _countNeighbors: function (x, y) {
        "use strict";

        var coordinates = new Coordinates(x, y);
        var neighbors = Neighbors.getNeighbors(coordinates);        
        var count = 0;
        var that = this;
        
        _.each(neighbors,
            function (current) {
                var exists = that._findCell(current.x(), current.y());
            
                if (exists) {
                    ++count;
                }
            }
        );
        
        return count;
    },
    
    _findCell: function (x, y) {
        "use strict";
        
        var exists = this._cells.exists(x, y);

        return exists;
    }
    
};