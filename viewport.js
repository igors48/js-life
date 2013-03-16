var ViewPort = function (width, height, maxCols, maxRows, minCellSize, maxCellSize, initialCellSize) {
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

    this._init();    
};

ViewPort.prototype = {
    
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

    getHorizontalScrollRatio: function () {
        "use strict";

        var maxLeft = this._maxCols - this._cols;
        var ratio = this._left / maxLeft;
        
        return ratio;
    },
    
    setHorizontalScrollRatio: function (ratio) {
        "use strict";
        
        Assert.isNumber(ratio);
        
        var maxLeft = this._maxCols - this._cols;
        this._left = Math.floor(maxLeft * ratio);
    },
    
    getVerticalScrollRatio: function () {
        "use strict";

        var maxTop = this._maxRows - this._rows;
        var ratio = this._top / maxTop;
        
        return ratio;
    },

    setVerticalScrollRatio: function (ratio) {
        "use strict";
        
        Assert.isNumber(ratio);
        
        var maxTop = this._maxRows - this._rows;
        this._top = Math.floor(maxTop * ratio);
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
    
    toViewCell: function (layerCoordinates) {
        "use strict";
        
        Assert.isCoordinates(layerCoordinates);

        var col = Math.floor(layerCoordinates.x() / this._cellSize);
        var row = Math.floor(layerCoordinates.y() / this._cellSize);
        
        var result = new Coordinates(col, row);
        
        return result;
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

    zoom: function (delta) {
        "use strict";
        
        Assert.isInteger(delta);
        
        var newValue = this._cellSize + delta;
        
        var valid = (newValue >= this._minCellSize) && (newValue <= this._maxCellSize);
        
        if (valid) {
            this._zoomTo(newValue);
        }
    },
    
    zoomToFit: function (area) {
        "use strict";

        Assert.isArea(area);

        var width = area.width();        
        var cellWidth = Math.floor(this._width / width);
        cellWidth = cellWidth < this._minCellSize ? this._minCellSize : cellWidth;
        cellWidth = cellWidth > this._maxCellSize ? this._maxCellSize : cellWidth;

        var height = area.height();
        var cellHeight = Math.floor(this._height / height);
        cellHeight = cellHeight < this._minCellSize ? this._minCellSize : cellHeight;
        cellHeight = cellHeight > this._maxCellSize ? this._maxCellSize : cellHeight;
        
        var cellSize = Math.min(cellWidth, cellHeight);
        
        this._zoomTo(cellSize);
        
        var viewPortCenterX = Math.floor(this._left + this._cols / 2);
        var viewPortCenterY = Math.floor(this._top + this._rows / 2);
        var areaCenter = area.center();    
        
        var deltaX = areaCenter.x() - viewPortCenterX;
        var deltaY = areaCenter.y() - viewPortCenterY;
        
        this.scrollX(deltaX);
        this.scrollY(deltaY);
    },
    
    _zoomTo: function (cellSize) {
        "use strict";

        this._cellSize = cellSize;
        this._reset();
    },
    
    _init: function () {
        "use strict";

        this._zoomTo(this._initialCellSize);
    },
    
    _reset: function () {
        "use strict";
        
        this._rows = Math.floor(this._height / this._cellSize);
        this._cols = Math.floor(this._width / this._cellSize);
        
        this._top = Math.floor((this._maxRows - this._rows) / 2);
        this._left = Math.floor((this._maxCols - this._cols) / 2);
    }
    
};    