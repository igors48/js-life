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

        this._maxRows = maxRows;
        this._maxCols = maxCols;

        this._viewport = new ViewPort(width, height, maxCols, maxRows, this.CELL_SIZE, this.CELL_SIZE, this.CELL_SIZE, 0);
        this._viewContext = this._viewport.getContext();

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
        
        this._viewport.scrollX(delta);
        this._viewContext = this._viewport.getContext();
    },
        
    scrollY: function (delta) {
        "use strict";
        
        this._viewport.scrollY(delta);
        this._viewContext = this._viewport.getContext();
    },
    
    _repaint: function () {
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
    
    _iterateViewCellsArray: function (action) {
        "use strict";

        var colCount = this._viewCells.length;
            
        for (var col = 0; col < colCount; ++col) {
            var rowCount = this._viewCells[col].length;
        
            for (var row = 0; row < rowCount; ++row) {
                action(col, row);
            }
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
        //TODO get cell state from model, not from viewCell
        var color = this._viewCells[col][row].getFill();
        color = (color === this.LIVE_CELL_COLOR) ? this.EMPTY_CELL_COLOR : this.LIVE_CELL_COLOR;
        this._viewCells[col][row].setFill(color);
        this._repaint();
    }
        
};

