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

	cells: function () {
        "use strict";
        
        return this._cells.cells();
	},
	
    generationNext: function () {
        "use strict";

        var processedCells = new CellsList();
        var newModel = new CellsList();
        
        var cells = this._cells.cells();
        var that = this;

        _.each(cells,
            function (cell) {
                that._processLiveCell(cell, processedCells, newModel);
            }
        );

		this._cells = newModel;
    },

    _processLiveCell: function (cell, processedCells, newModel) {
        "use strict";

        var x = cell.x();    
        var y = cell.y();
        
        this._storeNeighborsCountAndCellState(x, y, true, processedCells, newModel);

        var coordinates = new Coordinates(x, y);    
        var neighbors = Neighbors.getNeighbors(coordinates);
        
        var that = this;
        
        _.each(neighbors,
            function (current) {
                that._storeNeighborsCountAndCellState(current.x(), current.y(), false, processedCells, newModel);
            }
        );        
    },

    _storeNeighborsCountAndCellState: function (x, y, liveCell, processedCells, newModel) {

        if (processedCells.exists(x, y)) {
            return;
        }
        
        var neighborsCount = this._countNeighbors(x, y);
        
        var isEmpty = liveCell ? false : !this._cells.exists(x, y);

		if (isEmpty) {
                
            if (neighborsCount === 3) {
                var borningCell = new Coordinates(x, y);

				newModel.add(x, y);
            }
        } else {

			if (neighborsCount === 2 || neighborsCount === 3) {
                var livingCell = new Coordinates(x, y);

				newModel.add(x, y);
            }
        }
		
        processedCells.add(x, y);
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