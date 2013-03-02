var ViewPort = function (width, height, maxCols, maxRows, minCellSize, maxCellSize, initialCellSize, cellSizeStep) {
    "use strict";
    
    this.init(width, height, maxCols, maxRows, minCellSize, maxCellSize, initialCellSize, cellSizeStep);
};

ViewPort.prototype = {
    
    init: function (width, height, maxCols, maxRows, minCellSize, maxCellSize, initialCellSize, cellSizeStep) {
        "use strict";

        Assert.isPositiveInteger(width);    
        this._width = width; 
        
        Assert.isPositiveInteger(height);    
        this._height = height; 
        
        Assert.isPositiveInteger(maxCols);    
        this._maxCols = maxCols; 
        
        Assert.isPositiveInteger(maxRows);    
        this._maxRows = maxRows; 
        
        Assert.isPositiveInteger(minCellSize);    
        this._minCellSize = minCellSize; 
        
        Assert.isPositiveInteger(maxCellSize);    
        this._maxCellSize = maxCellSize; 
        
        Assert.isPositiveInteger(initialCellSize);    
        this._initialCellSize = initialCellSize; 
        
        Assert.isPositiveInteger(cellSizeStep);    
        this._cellSizeStep = cellSizeStep;
        
        this._reset();
    },
    
    getCols: function () {
        "use strict";

        return this._cols;
    },
    
    getRows: function () {
        "use strict";

        return this._rows;
    },
    
    getTop: function () {
        "use strict";

        return this._top;
    },

    getLeft: function () {
        "use strict";

        return this._left;
    },
    
    getCellSize: function () {
        "use strict";

        return this._cellSize;
    },

    toGlobal: function (viewPortCoordinates) {
        "use strict";
        
        Assert.isCoordinates(viewPortCoordinates);
        
        var globalCol = viewPortCoordinates.x() + this._left;
        var globalRow = viewPortCoordinates.y() + this._top;
        
        return new Coordinates(globalCol, globalRow);
    },

    toViewPort: function (globalCoordinates) {
        "use strict";
        
        Assert.isCoordinates(globalCoordinates);
        
        var viewPortCol = globalCoordinates.x() - this._left;
        var viewPortColValid = (viewPortCol >= 0) && (viewPortCol < this._cols);
        
        var viewPortRow = globalCoordinates.y() - this._top;
        var viewPortRowValid = (viewPortRow >= 0) && (viewPortRow < this._rows);
        
        var coordinatesValid = viewPortColValid && viewPortRowValid;
        
        return coordinatesValid ? new Coordinates(viewPortCol, viewPortRow) : null;
    },
    
    scrollX: function (delta) {
        "use strict";
        
        Assert.isInteger(delta);
        
        var newValue = this._left + delta;
        
        var valid = (newValue >= 0) && ((newValue + this._cols) <= this._maxCols);
        
        this._left = valid ? newValue : this._left;
    },

    scrollY: function (delta) {
        "use strict";
        
        Assert.isInteger(delta);
        
        var newValue = this._top + delta;
        
        var valid = (newValue >= 0) && ((newValue + this._rows) <= this._maxRows);
        
        this._top = valid ? newValue : this._top;
    },
    
    _reset: function () {
        "use strict";
        
        this._cellSize = this._initialCellSize;
        
        this._rows = Math.floor(this._height / this._cellSize);
        this._cols = Math.floor(this._width / this._cellSize);
        
        this._top = Math.floor((this._maxRows - this._rows) / 2);
        this._left = Math.floor((this._maxCols - this._cols) / 2);
    }
    
};    