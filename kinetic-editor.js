var KineticEditor = function (container, width, height, maxCols, maxRows) {
    "use strict";
    
    this.init(container, width, height, maxCols, maxRows);
}

KineticEditor.prototype = {

    CELL_SIZE: 15,
    CLICK_EVENT: 'click',
    EMPTY_CELL_COLOR: 'silver',
    LIVE_CELL_COLOR: 'green',
    BORN_CELL_COLOR: 'yellow',
    DEAD_CELL_COLOR: 'black',
    
    init: function (container, width, height, maxCols, maxRows) {
        "use strict";
        this._maxRows = maxRows;
        this._maxCols = maxCols;
        this._model = new ToggleCellModel();
        this._viewport = new ViewPort(width, height, maxCols, maxRows, this.CELL_SIZE, this.CELL_SIZE, this.CELL_SIZE, 0);
        
        this._viewCells = new Array(this._maxCols);
    
        for (var i = 0; i < this._maxCols; i++) {
            this._viewCells[i] = new Array(this._maxRows);
        }
        
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
        
        for (var row = 0; row < this._maxRows; ++row) {
        
            for (var col = 0; col < this._maxCols; ++col) {
                
                var cell = new Kinetic.Circle({
                    x: (col + 1) * this.CELL_SIZE,
                    y: (row + 1) * this.CELL_SIZE,
                    width: this.CELL_SIZE,
                    height: this.CELL_SIZE,
                    fill: 'silver'
                });

                cell.on(this.CLICK_EVENT, (function(that){
                    var color = that.EMPTY_CELL_COLOR;
                    var cellRow = row;
                    var cellCol = col;
        
                    var func = function() {
                        color = color === that.EMPTY_CELL_COLOR ? that.LIVE_CELL_COLOR : that.EMPTY_CELL_COLOR;

                        that._viewCells[cellCol][cellRow].setFill(color);
                        that.repaint(); 
                        
                        that._model.toggle(cellCol, cellRow);
                    }
        
                    return func;
                })(this));
                
                this._viewCells[col][row] = cell;
                this._layer.add(cell);
            }
        }
        this.repaint();
    },
    
    model: function () {
        "use strict";
        return this._model;
    },
    
    switchToViewMode: function () {
        "use strict";
    
        for (var row = 0; row < this._maxRows; ++row) {
        
            for (var col = 0; col < this._maxCols; ++col) {
                this._viewCells[col][row].off(this.CLICK_EVENT);
                this._viewCells[col][row].setFill(this.EMPTY_CELL_COLOR);
            }
        }
    },
    
    resetCells: function() {
        "use strict";

        for (var row = 0; row < this._maxRows; ++row) {
        
            for (var col = 0; col < this._maxCols; ++col) {
                this._viewCells[col][row].setFill(this.EMPTY_CELL_COLOR);
            }
        }
    },
    
    paintCell: function (col, row, color) {
        "use strict";
        this._viewCells[col][row].setFill(color);
    },
    
    repaint: function () {
        "use strict";
        this._layer.draw();
    },
    
    scrollX: function (delta) {
        "use strict";
        
        this._viewport.scrollX(delta);
    },
        
    scrollY: function (delta) {
        "use strict";
        
        this._viewport.scrollY(delta);
    },
    
    _fullRepaint: function () {
        "use strict";
            //create cells
            //paint from model
            //bind event handlers
    },

    _createViewCells: function () {
        "use strict";
    //bind events
    },
    
    _clearViewCells: function () {
        "use strict";
    //unbind events
    }
        
};

