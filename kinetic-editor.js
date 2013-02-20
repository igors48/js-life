var KineticEditor = function (container, width, height, rows, cols) {
    "use strict";
    
    this.init(container, width, height, rows, cols);
}

KineticEditor.prototype = {

    CELL_SIZE: 15,
    CLICK_EVENT: 'click',
    EMPTY_CELL_COLOR: 'silver',
    LIVE_CELL_COLOR: 'green',
    BORN_CELL_COLOR: 'yellow',
    DEAD_CELL_COLOR: 'black',
    
    init: function (container, width, height, rows, cols) {
        "use strict";
        this._rows = rows;
        this._cols = cols;
        this._model = new ToggleCellModel();
        this._cells = new Array(rows);
    
        for (var i = 0; i < this._cols; i++) {
            this._cells[i] = new Array(this._rows);
        }
        
        var stage = new Kinetic.Stage({
            container: container,
            width: width,
            height: height
        });

        this._layer = new Kinetic.Layer();
        
        var background = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: width,
            height: height,
            fill: 'gray'
        });
        this._layer.add(background);
        
        for (var row = 0; row < this._rows; ++row) {
        
            for (var col = 0; col < this._cols; ++col) {
                
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

                        that._cells[cellCol][cellRow].setFill(color);
                        that.repaint(); 
                        
                        that._model.toggle(cellCol, cellRow);
                    }
        
                    return func;
                })(this));
                
                this._cells[col][row] = cell;
                this._layer.add(cell);
            }
        }
      
        stage.add(this._layer);
    },
    
    model: function () {
        "use strict";
        return this._model;
    },
    
    switchToViewMode: function () {
        "use strict";
    
        for (var row = 0; row < this._rows; ++row) {
        
            for (var col = 0; col < this._cols; ++col) {
                this._cells[col][row].off(this.CLICK_EVENT);
                this._cells[col][row].setFill(this.EMPTY_CELL_COLOR);
            }
        }
    },
    
    resetCells: function() {
        "use strict";

        for (var row = 0; row < this._rows; ++row) {
        
            for (var col = 0; col < this._cols; ++col) {
                this._cells[col][row].setFill(this.EMPTY_CELL_COLOR);
            }
        }
    },
    
    paintCell: function (col, row, color) {
        "use strict";
        this._cells[col][row].setFill(color);
    },
    
    repaint: function () {
        "use strict";
        this._layer.draw();
    }
        
};

