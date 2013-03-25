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
        
        var livingCells = [];        
        var borningCells = [];
        var dyingCells = [];

        _.each(cells,
            function (cell) {
                that._processLiveCell(cell, map, livingCells, borningCells, dyingCells);
            }
        );

        this._updateCells(livingCells, borningCells);
        
        var generationReport = new GenerationReport(borningCells, dyingCells, livingCells, previousGenerationHabitat);
        
        return generationReport;
    },

    _processLiveCell: function (cell, map, livingCells, borningCells, dyingCells) {
        "use strict";

        var x = cell.coordinates().x();    
        var y = cell.coordinates().y();
        
        this._storeNeighborsCountAndCellState(x, y, true, map, livingCells, borningCells, dyingCells);

        var coordinates = new Coordinates(x, y);    
        var neighbors = Neighbors.getNeighbors(coordinates);
        
        var that = this;
        
        _.each(neighbors,
            function (current) {
                that._storeNeighborsCountAndCellState(current.x(), current.y(), false, map, livingCells, borningCells, dyingCells);
            }
        );        
    },

    _storeNeighborsCountAndCellState: function (x, y, liveCell, map, livingCells, borningCells, dyingCells) {

        if (map.exists(x, y)) {
            return;
        }
        
        var neighborsCount = this._countNeighbors(x, y);
        var isEmpty = liveCell ? false : !this._cells.exists(x, y);
        
        var neighborsAndStatus = new NeighborsAndState(neighborsCount, isEmpty);
        
        map.add(x, y, neighborsAndStatus);
		
		if (isEmpty) {
                
            if (neighborsCount === 3) {
                var borningCell = new Coordinates(x, y);
                borningCells.push(borningCell);
            }
        } else {
                
            if (neighborsCount < 2 || neighborsCount > 3) {
                var dyingCell = new Coordinates(x ,y);
                dyingCells.push(dyingCell);    
            }
                    
            if (neighborsCount === 2 || neighborsCount === 3) {
                var livingCell = new Coordinates(x, y);
                livingCells.push(livingCell);
            }
        }
    },
    
    _updateCells: function (livingCells, borningCells) {
        "use strict";

        this._cells = new CellsList();

        var that = this;
        
        _.each(livingCells,
            function (cell) {
				that._cells.add(cell.x(), cell.y());
            }
        );

        _.each(borningCells,
            function (cell) {
				that._cells.add(cell.x(), cell.y());
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
                var exists = that._cells.exists(current.x(), current.y());
            
                if (exists) {
                    ++count;
                }
            }
        );
        
        return count;
    }
    
};