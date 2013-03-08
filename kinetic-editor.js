var KineticEditor = function (container, width, height, maxCols, maxRows) {
    "use strict";
    
    this.init(container, width, height, maxCols, maxRows);
}

KineticEditor.prototype = {

    CELL_SIZE: 15,
    CLICK_EVENT: 'click',
    EMPTY_CELL_COLOR: 'silver',
    LIVE_CELL_COLOR: 'green',
    MIN_CELL_SIZE: 4, 
    MAX_CELL_SIZE: 25,
    
    init: function (container, width, height, maxCols, maxRows) {
        "use strict";

        Assert.isPositiveInteger(width);    
        Assert.isPositiveInteger(height);    
        Assert.isPositiveInteger(maxCols);    
        Assert.isPositiveInteger(maxRows);    

        this._playMode = false;
        
        this._maxRows = maxRows;
        this._maxCols = maxCols;
        
        this._viewport = new ViewPort(width, height, maxCols, maxRows, this.MIN_CELL_SIZE, this.MAX_CELL_SIZE, this.CELL_SIZE);

        this._model = new ToggleCellModel();

        var stage = new Kinetic.Stage({
            container: container,
            width: width,
            height: height
        });

        this._backgroundLayer = new Kinetic.Layer();
        this._modelLayer = new Kinetic.Layer();
        
        var backgroundRect = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: width,
            height: height,
            fill: 'silver'
        });

        this._backgroundLayer.add(backgroundRect);
        var that = this;
        this._backgroundLayer.on(this.CLICK_EVENT,
            function (event) {
                var x = event.layerX;
                var y = event.layerY;
                
                that._onLayerClick(x, y);
            }
        );

        stage.add(this._backgroundLayer);
        stage.add(this._modelLayer);
        

        /*
        this._createViewCellsArray();    
        this._createViewCells();
        */
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
        this._paintModelCells(this.LIVE_CELL_COLOR);
    },
        
    scrollY: function (delta) {
        "use strict";
        
        Assert.isInteger(delta);
        
        this._paintModelCells(this.EMPTY_CELL_COLOR);
        this._viewport.scrollY(delta);
        this._paintModelCells(this.LIVE_CELL_COLOR);
    },

    zoom: function (delta) {
        "use strict";
        
        Assert.isInteger(delta);
        
        this._viewport.zoom(delta);
        this._clearViewCellsArray();
        this._createViewCellsArray();
        this._createViewCells();
        this._paintModelCells(this.LIVE_CELL_COLOR);
    },
    
    replaceModel: function (newModel) {
        "use strict";
        
        Assert.isToggleCellModel(newModel);
        
        this._modelLayer.removeChildren();
        this._model = newModel;
        
        var cellSize = this._viewport.getCellSize();

        var viewCell = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: cellSize,
            height: cellSize,
            fill: this.LIVE_CELL_COLOR
        });
        
        var that = this;

        viewCell.toImage(
            {
                width: cellSize,
                height: cellSize,
                callback: function(img) {
                    
                    that._iterateModelCells(
                        function (cell) {
                            var viewPortCoordinates = that._viewport.toViewPort(cell);
                
                            if (viewPortCoordinates) {
                                var image = new Kinetic.Image({
                                    image: img,
                                    x: (viewPortCoordinates.x()) * cellSize,
                                    y: (viewPortCoordinates.y()) * cellSize
                                });

                                that._modelLayer.add(image);
                            }
                        }
                    );
                    
                    that._modelLayer.draw();
                }
            }
        );
    },
    
    switchToPlayMode: function () {
        "use strict";
        
        this._playMode = true;
    },
    
    _onLayerClick: function (x, y) {
        var clickCoordinates = new Coordinates(x, y);
        var viewCellCoordinates = this._viewport.toViewCell(clickCoordinates);
        var modelCellCoordinates = this._viewport.toGlobal(viewCellCoordinates);
        
        this._model.toggle(modelCellCoordinates.x(), modelCellCoordinates.y());
        this.replaceModel(this._model);
    },
    
    _repaint: function () {
        "use strict";
        
        this._layer.draw();
    },
    
    _createViewCells: function () {
        "use strict";
        
        var that = this;
        this._iterateViewCellsArray(
            function (col, row) {
                var viewCell = that._createViewCell(col, row);
                that._viewCells[col][row] = viewCell;
                that._layer.add(viewCell);
            }
        );
        
        this._repaint();
    },
    
    _clearViewCellsArray: function () {
        "use strict";

        var that = this;
        this._iterateViewCellsArray(
            function (col, row) {
                var viewCell = that._viewCells[col][row];
                viewCell.off(that.CLICK_EVENT);
            }    
        );
        
        that._layer.removeChildren();
        
        _.each(this._viewCells, 
            function (array) {
                array.length = 0;
            }
        );
        
        this._viewCells.length = 0;
    },
    
    _createViewCellsArray: function () {
        "use strict";

        this._viewCells = new Array(this._viewport.getCols());
    
        for (var i = 0; i < this._viewport.getCols(); i++) {
            this._viewCells[i] = new Array(this._viewport.getRows());
        }
    },
    
    _createViewCell: function (col, row) {
        "use strict";

        var cellSize = this._viewport.getCellSize();
        var viewCell = new Kinetic.Circle({
            x: (col + 1) * cellSize - cellSize / 4,
            y: (row + 1) * cellSize - cellSize / 4,
            width: cellSize,
            height: cellSize,
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

        if (this._playMode) {
            return;
        }
        
        var globalCoordinates = this._viewport.toGlobal(new Coordinates(col, row));
        
        var isSet = this._model.toggle(globalCoordinates.x(), globalCoordinates.y());

        var color = isSet ? this.LIVE_CELL_COLOR : this.EMPTY_CELL_COLOR;

        this._viewCells[col][row].setFill(color);
        this._repaint();
    },
    
    _paintModelCells: function (color) {
        "use strict";
        
        this._setVisibleModelCellsColors(color);
        this._repaint();
    },
 
    _setVisibleModelCellsColors: function (color) {
        "use strict";
        
        var that = this;
        
        this._iterateModelCells(
            function (cell) {
                var viewPortCoordinates = that._viewport.toViewPort(cell);
                
                if (viewPortCoordinates) {
                    that._viewCells[viewPortCoordinates.x()][viewPortCoordinates.y()].setFill(color);
                }
            }
        );
    },
    
    _iterateModelCells: function (action) {
        "use strict";

        var modelCells = this._model.cells();

        _.each(modelCells,
            function (cell) {
                action(cell);
            }
        );
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

