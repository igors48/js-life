var ViewPort = function (width, height, maxCols, maxRows, minCellSize, maxCellSize, initialCellSize, cellSizeStep) {
    "use strict";
    this.init(width, height, maxCols, maxRows, minCellSize, maxCellSize, initialCellSize, cellSizeStep);
};

ViewPort.prototype = {
    
    init: function (width, height, maxCols, maxRows, minCellSize, maxCellSize, initialCellSize, cellSizeStep) {
        "use strict";
        
        this.width = width; 
        this.height = height; 
        this.maxCols = maxCols; 
        this.maxRows = maxRows; 
        this.minCellSize = minCellSize; 
        this.maxCellSize = maxCellSize; 
        this.initialCellSize = initialCellSize; 
        this.cellSizeStep = cellSizeStep;
        
        this._reset();
    },
    
    getContext: function () {
        "use strict";
        
        return { 
            top: this.top, 
            left: this.left, 
            cellSize: this.cellSize,
            cols: this.cols,
            rows: this.rows
        };
    },
    
    scrollX: function (delta) {
        var newValue = this.left + delta;
        
        var valid = (newValue > 0) && ((newValue + this.cols) <= this.maxCols);
        
        this.left = valid ? newValue : this.left;
    },

    scrollY: function (delta) {
        var newValue = this.top + delta;
        
        var valid = (newValue > 0) && ((newValue + this.rows) <= this.maxRows);
        
        this.top = valid ? newValue : this.top;
    },
    
    _reset: function () {
        "use strict";
        
        this.cellSize = this.initialCellSize;
        
        this.rows = Math.floor(this.height / this.cellSize);
        this.cols = Math.floor(this.width / this.cellSize);
        
        this.top = Math.floor((this.maxRows - this.rows) / 2);
        this.left = Math.floor((this.maxCols - this.cols) / 2);
    }
    
};    