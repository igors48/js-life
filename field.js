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
    
    generationNext: function () {
        "use strict";

        var previousGenerationHabitat = this._cells.habitat();    
        var cells = this._cells.cells();
        var map = new CellsList();
        var that = this;
        
        _.each(cells,
            function (cell) {
                that._processLiveCell(cell, map);
            }
        );
        
        var mapValues = map.cells();
        
        var borningCells = [];
        var dyingCells = [];
        var livingCells = [];        

        _.each(mapValues,
            function (current) {
                var neighbors = current.state();
                
                var x = current.coordinates().x();
                var y = current.coordinates().y();
                
                var existent = that._cells.exists(x, y);
                
                if (existent) {
                if (neighbors === 2 || neighbors === 3) {
                    var livingCell = new Coordinates(current.coordinates().x(), current.coordinates().y());
                    livingCells.push(livingCell);
                }
                } else {
                    if (neighbors === 3) {
                        var borningCell = new Coordinates(x, y);
                        borningCells.push(borningCell);
                    }
                }
            }
        );
        
        this._updateCells(livingCells, borningCells);
        
        var generationReport = new GenerationReport(borningCells, dyingCells, livingCells, previousGenerationHabitat);
        
        return generationReport;
    },

    _processLiveCell: function (cell, map) {
        "use strict";

        var x = cell.coordinates().x();    
        var y = cell.coordinates().y();
        
        this._storeNeighborsCount(x, y, map);

        var coordinates = new Coordinates(x, y);    
        var neighbors = Neighbors.getNeighbors(coordinates);
        
        var that = this;
        
        _.each(neighbors,
            function (current) {
                that._storeNeighborsCount(current.x(), current.y(), map);
            }
        );        
    },

    _storeNeighborsCount: function (x, y, map) {

        if (map.exists(x, y)) {
            return;
        }
        
        var neighborsCount = this._countNeighbors(x, y);
        map.add(x, y, neighborsCount);
    },
    
    _updateCells: function (livingCells, borningCells) {
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