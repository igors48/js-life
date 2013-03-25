var Field = function (cellsPerCall) {
    "use strict";

	Assert.isPositiveInteger(cellsPerCall);
    this._cellsPerCall = cellsPerCall;

    this._cells = new CellsList();
	
	this._index = 0;
	this._finished = true;
    this._processedCells = new CellsList();
    this._newModel = new CellsList();
	this._list = [];
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

		if (this._finished) {
			this._finished = false;
			this._restart();
		}
		
        var that = this;
        var count = 0;
        var maxIndex = this._list.length;
        
        while (count < this._cellsPerCall && this._index < maxIndex) {
            var cell = this._list[this._index];
			
            this._processLiveCellAndTheirNeghbours(cell);

            ++this._index;
            ++count;
		}

		var finished = this._index === maxIndex;
		
		if (finished) {
			this._cells = this._newModel;
		
			this._finished = true;
		}
		
        return finished;
    },

	_restart: function () {
        "use strict";

		this._index = 0;
		this._list = this._cells.cells();
        this._processedCells = new CellsList();
        this._newModel = new CellsList();
	},
	
    _processLiveCellAndTheirNeghbours: function (cell) {
        "use strict";

        var x = cell.x();    
        var y = cell.y();
        
        this._processCell(x, y, true, this._processedCells, this._newModel);

        var coordinates = new Coordinates(x, y);    
        var neighbors = Neighbors.getNeighbors(coordinates);
        
        var that = this;
        
        _.each(neighbors,
            function (current) {
                that._processCell(current.x(), current.y(), false, that._processedCells, that._newModel);
            }
        );        
    },

    _processCell: function (x, y, liveCell) {
        "use strict";

        if (this._processedCells.exists(x, y)) {
            return;
        }
        
        var neighborsCount = this._countNeighbors(x, y);
        
        var isEmpty = liveCell ? false : !this._cells.exists(x, y);

		if (isEmpty) {
                
            if (neighborsCount === 3) {
                var borningCell = new Coordinates(x, y);

				this._newModel.add(x, y);
            }
        } else {

			if (neighborsCount === 2 || neighborsCount === 3) {
                var livingCell = new Coordinates(x, y);

				this._newModel.add(x, y);
            }
        }
		
        this._processedCells.add(x, y);
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