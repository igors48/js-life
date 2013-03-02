var KineticEditor = function (container, width, height, maxCols, maxRows) {
    "use strict";
    
    this.init(container, width, height, maxCols, maxRows);
}

KineticEditor.prototype = {

    CELL_SIZE: 15,
    CLICK_EVENT: 'click',
    EMPTY_CELL_COLOR: 'silver',
    LIVE_CELL_COLOR: 'green',
    
    init: function (container, width, height, maxCols, maxRows) {
        "use strict";

         Assert.isPositiveInteger(width);    
         Assert.isPositiveInteger(height);    
         Assert.isPositiveInteger(maxCols);    
         Assert.isPositiveInteger(maxRows);    

        this._maxRows = maxRows;
        this._maxCols = maxCols;
        
        this._viewport = new ViewPort(width, height, maxCols, maxRows, this.CELL_SIZE, this.CELL_SIZE, this.CELL_SIZE, 0);
        this._updateViewContext();

        this._model = new ToggleCellModel();

        var stage = new Kinetic.Stage({
            container: container,
            width: width,
            height: height
        });

        this._layer = new Kinetic.Layer();
        stage.add(this._layer);
        
        var background = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: width,
            height: height,
            fill: 'gray'
        });
        this._layer.add(background);

        this._createViewCellsArray();    
        this._createViewCells();
    },
    
    model: function () {
        "use strict";

        return this._model;
    },
    
    scrollX: function (delta) {
        "use strict";

        Assert.isInteger(delta);
        
        this._paintModelCells(this.EMPTY_CELL_COLOR);
        this._viewport.scrollX(delta);
        this._updateViewContext();
        this._paintModelCells(this.LIVE_CELL_COLOR);
    },
        
    scrollY: function (delta) {
        "use strict";
        
        Assert.isInteger(delta);
        
        this._viewport.scrollY(delta);
        this._updateViewContext();
    },
    
    _updateViewContext: function() {
        "use strict";
        
        this._viewContext = this._viewport.getContext();
    },
    
    _repaint: function () {
        "use strict";
        
        this._layer.draw();
    },
    
    _createViewCells: function () {
        "use strict";
        
        this._createViewCellsArray();
        
        var that = this;
        this._iterateViewCellsArray(function (col, row) {
            var viewCell = that._createViewCell(col, row);
            that._viewCells[col][row] = viewCell;
            that._layer.add(viewCell);
        });
        
        this._repaint();
    },
    
    _clearViewCells: function () {
        "use strict";

        var context = this._viewport.getContext();
    //unbind events
    },
    
    _createViewCellsArray: function () {
        "use strict";

        this._viewCells = new Array(this._viewContext.cols);
    
        for (var i = 0; i < this._viewContext.cols; i++) {
            this._viewCells[i] = new Array(this._viewContext.rows);
        }
    },
    
    _createViewCell: function (col, row) {
        "use strict";

        var viewCell = new Kinetic.Circle({
            x: (col + 1) * this._viewContext.cellSize,
            y: (row + 1) * this._viewContext.cellSize,
            width: this._viewContext.cellSize,
            height: this._viewContext.cellSize,
            fill: this.EMPTY_CELL_COLOR
        });

        var that = this;
        viewCell.on(this.CLICK_EVENT, function(){
            var cellRow = row;
            var cellCol = col;
        
            that._onViewCellClick(cellCol, cellRow);
        });

        return viewCell;
    },

    _onViewCellClick: function (col, row) {
        "use strict";

        var globalCoordinates = this._viewport.toGlobal(new Coordinates(col, row));
        var isSet = this._model.toggle(globalCoordinates.x(), globalCoordinates.y());

        var color = isSet ? this.LIVE_CELL_COLOR : this.EMPTY_CELL_COLOR;

        this._viewCells[col][row].setFill(color);
        this._repaint();
    },
    
    _paintModelCells: function (color) {
        "use strict";
        
        var that = this;
        
        this._iterateModelCells(
            function (cell) {
                
                if (that._isInViewPort(cell.x(), cell.y())) {
                    var coordinates = that._toViewPort(cell.x(), cell.y());
                    that._viewCells[coordinates.col][coordinates.row].setFill(color);
                }
            }
        );
        
        this._repaint();
    },
    
    _iterateModelCells: function (action) {
        "use strict";

        var modelCells = this._model.cells();
        var length = modelCells.length;
        
        for (var index = 0; index < length; ++index) {
            var current = modelCells[index];
            action(current);
        }
    },
    
    _iterateViewCellsArray: function (action) {
        "use strict";

        var colCount = this._viewCells.length;
            
        for (var col = 0; col < colCount; ++col) {
            var rowCount = this._viewCells[col].length;
        
            for (var row = 0; row < rowCount; ++row) {
                action(col, row);
            }
        }    
    }
            
};

