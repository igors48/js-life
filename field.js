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
		
        var processedCells = new CellsList();
        var newModel = new CellsList();
        
        var livingCells = [];        
        var borningCells = [];
        var dyingCells = [];

        var cells = this._cells.cells();
        var that = this;

        _.each(cells,
            function (cell) {
                that._processLiveCell(cell, processedCells, livingCells, borningCells, dyingCells, newModel);
            }
        );

		this._cells = newModel;
        
        var generationReport = new GenerationReport(borningCells, dyingCells, livingCells, previousGenerationHabitat);
        
        return generationReport;
    },

    _processLiveCell: function (cell, processedCells, livingCells, borningCells, dyingCells, newModel) {
        "use strict";

        var x = cell.coordinates().x();    
        var y = cell.coordinates().y();
        
        this._storeNeighborsCountAndCellState(x, y, true, processedCells, livingCells, borningCells, dyingCells, newModel);

        var coordinates = new Coordinates(x, y);    
        var neighbors = Neighbors.getNeighbors(coordinates);
        
        var that = this;
        
        _.each(neighbors,
            function (current) {
                that._storeNeighborsCountAndCellState(current.x(), current.y(), false, processedCells, livingCells, borningCells, dyingCells, newModel);
            }
        );        
    },

    _storeNeighborsCountAndCellState: function (x, y, liveCell, processedCells, livingCells, borningCells, dyingCells, newModel) {

        if (processedCells.exists(x, y)) {
            return;
        }
        
        var neighborsCount = this._countNeighbors(x, y);
        var isEmpty = liveCell ? false : !this._cells.exists(x, y);
        
        processedCells.add(x, y);
		
		if (isEmpty) {
                
            if (neighborsCount === 3) {
                var borningCell = new Coordinates(x, y);
                borningCells.push(borningCell);

				newModel.add(x, y);
            }
        } else {
                
            if (neighborsCount < 2 || neighborsCount > 3) {
                var dyingCell = new Coordinates(x ,y);
                dyingCells.push(dyingCell);    
            }
                    
            if (neighborsCount === 2 || neighborsCount === 3) {
                var livingCell = new Coordinates(x, y);
                livingCells.push(livingCell);

				newModel.add(x, y);
            }
        }
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