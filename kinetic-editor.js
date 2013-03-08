var KineticEditor = function (container, width, height, maxCols, maxRows) {
    "use strict";
    
    this.init(container, width, height, maxCols, maxRows);
}

KineticEditor.prototype = {

    CELL_SIZE: 15,
    CLICK_EVENT: 'click',
    BACKGROUND_COLOR: 'silver',
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
            fill: this.BACKGROUND_COLOR
        });

        this._backgroundLayer.add(backgroundRect);
        
        var that = this;
        this._backgroundLayer.on(this.CLICK_EVENT,
            function (event) {
                that._onLayerClick(event);
            }
        );
        this._modelLayer.on(this.CLICK_EVENT,
            function (event) {
                that._onLayerClick(event);
            }
        );

        stage.add(this._backgroundLayer);
        stage.add(this._modelLayer);

        this._cacheCellView();
    },
    
    model: function () {
        "use strict";

        return this._model;
    },
    
    scrollX: function (delta) {
        "use strict";

        Assert.isInteger(delta);
        
        this._viewport.scrollX(delta);
        this.paintModel(this._model);
    },
        
    scrollY: function (delta) {
        "use strict";
        
        Assert.isInteger(delta);
        
        this._viewport.scrollY(delta);
        this.paintModel(this._model);
    },

    zoom: function (delta) {
        "use strict";
        
        Assert.isInteger(delta);
        
        this._viewport.zoom(delta);
        this._cacheCellView();
        this.paintModel(this._model);
    },
    
    paintModel: function (newModel) {
        "use strict";
        
        Assert.isToggleCellModel(newModel);
        
        this._modelLayer.removeChildren();
        this._model = newModel;
        
        var cellSize = this._viewport.getCellSize();
        var that = this;

        that._iterateModelCells(
            function (cell) {
                var viewPortCoordinates = that._viewport.toViewPort(cell);
                
                if (viewPortCoordinates) {
                    var image = new Kinetic.Image({
                        image: that._cachedCellView,
                        x: (viewPortCoordinates.x()) * cellSize,
                        y: (viewPortCoordinates.y()) * cellSize
                    });

                    that._modelLayer.add(image);
                }
            }
        );
                    
        that._modelLayer.draw();
    },
    
    switchToPlayMode: function () {
        "use strict";
        
        this._playMode = true;
    },

    _cacheCellView: function () {
        var cellSize = this._viewport.getCellSize();

        var viewCell = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: cellSize,
            height: cellSize,
            fill: this.LIVE_CELL_COLOR
        });
        
        var that = this;

        viewCell.toImage({
            width: cellSize,
            height: cellSize,
            callback: function(image) {
                that._cachedCellView = image;
            }
        });
    },
    
    _onLayerClick: function (event) {
        
        if (this._playMode) {
            return;
        }

        var x = event.layerX;
        var y = event.layerY;

        var clickCoordinates = new Coordinates(x, y);
        var viewCellCoordinates = this._viewport.toViewCell(clickCoordinates);
        var modelCellCoordinates = this._viewport.toGlobal(viewCellCoordinates);
        
        this._model.toggle(modelCellCoordinates.x(), modelCellCoordinates.y());
        this.paintModel(this._model);
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

};

