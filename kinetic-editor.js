var KineticEditor = function (container, width, height, maxCols, maxRows) {
    "use strict";
    
    this.init(container, width, height, maxCols, maxRows);
}

KineticEditor.prototype = {

    CLICK_EVENT: 'click',
    DRAG_MOVE_EVENT: 'dragmove',
    MOUSE_MOVE_EVENT: 'mousemove',
    MOUSE_OUT_EVENT: 'mouseout',
    
    CELL_SIZE: 15,    
    
    BACKGROUND_COLOR: 'silver',
    BACKGROUND_OPACITY: 0.5,
    
    HIGHLIGHTED_CELL_COLOR: 'red',
    
    LIVE_CELL_COLOR: 'green',
    
    MIN_CELL_SIZE: 1, 
    MAX_CELL_SIZE: 25,
    
    SCROLL_BAR_INDENT: 5,
    SCROLL_BAR_WIDTH: 15,
    SCROLL_BAR_AREA_FILL: 'black',
    SCROLL_BAR_AREA_OPACITY: 0.3,
    SCROLL_BAR_AREA_CLICK_RATIO: 4,
    SCROLL_THUMB_WIDTH: 50,
    SCROLL_BAR_THUMB_FILL: '#9f005b',
    SCROLL_BAR_THUMB_OPACITY: 0.9,
  
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
        this._scrollBarsLayer = new Kinetic.Layer();
        this._cellHighlightingLayer = new Kinetic.Layer();
    
        this._initBackgroundLayer(width, height);
        this._initModelLayer();
        this._initControlLayer(width, height);
        
        stage.add(this._cellHighlightingLayer);
        stage.add(this._backgroundLayer);
        stage.add(this._modelLayer);
        stage.add(this._scrollBarsLayer);

        this._cacheCellViewAndPaint();
    },

    model: function () {
        "use strict";

        return this._model;
    },
    
    scrollX: function (delta) {
        "use strict";

        Assert.isInteger(delta);
        
        this._removeHighlightedCell();
        this._viewport.scrollX(delta);
        this.paintModel(this._model);
        this._syncHorizontalThumbPositionWithViewport();
    },
        
    scrollY: function (delta) {
        "use strict";
        
        Assert.isInteger(delta);
        
        this._removeHighlightedCell();
        this._viewport.scrollY(delta);
        this.paintModel(this._model);
        this._syncVerticalThumbPositionWithViewport();
    },

    zoom: function (delta) {
        "use strict";
        
        Assert.isInteger(delta);
        
        this._removeHighlightedCell();
        this._viewport.zoom(delta);
        this._cacheCellViewAndPaint();
    },
    
    zoomToFit: function (area) {
        "use strict";
        
        Assert.isArea(area);
        
        this._removeHighlightedCell();
        this._viewport.zoomToFit(area);
        this._cacheCellViewAndPaint();
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

    paintCell: function (coordinates) {
        "use strict";
        
        var viewPortCoordinates = that._viewport.toViewPort(cell);
                
        if (viewPortCoordinates) {
            var image = new Kinetic.Image({
                image: that._cachedCellView,
                x: (viewPortCoordinates.x()) * cellSize,
                y: (viewPortCoordinates.y()) * cellSize
            });

            that._modelLayer.add(image);
        }
    },
    
    // this._painter.clear();
    
    _initControlLayer: function (width, height) {
        "use strict";

        this._initHorizontalScrollBar(width, height);
        this._initVerticalScrollBar(width, height);
    },

    _initHorizontalScrollBar: function (width, height) {
        "use strict";

        var horizontalScrollAreaLeft = this.SCROLL_BAR_INDENT;
        var horizontalScrollAreaTop = height - this.SCROLL_BAR_INDENT - this.SCROLL_BAR_WIDTH;

        var horizontalScrollAreaWidth = width - 2 * this.SCROLL_BAR_INDENT - this.SCROLL_BAR_WIDTH;
        var horizontalScrollAreaHeight = this.SCROLL_BAR_WIDTH;
        
        var horizontalScrollAreaRight = horizontalScrollAreaLeft + horizontalScrollAreaWidth;
        
        this._horizontalScrollArea = new Kinetic.Rect({
            x: horizontalScrollAreaLeft,
            y: horizontalScrollAreaTop,
            width: horizontalScrollAreaWidth,
            height: horizontalScrollAreaHeight,
            fill: this.SCROLL_BAR_AREA_FILL,
            opacity: this.SCROLL_BAR_AREA_OPACITY
        });

        var horizontalScrollThumbWidth = this.SCROLL_THUMB_WIDTH;
        var horizontalScrollThumbHeight = this.SCROLL_BAR_WIDTH;

        var horizontalScrollThumbLeftMax = horizontalScrollAreaRight - horizontalScrollThumbWidth;

        var horizontalScrollThumbLeft = horizontalScrollAreaLeft;
        var horizontalScrollThumbTop = horizontalScrollAreaTop;

        this._horizontalScrollThumb = new Kinetic.Rect({
            x: horizontalScrollThumbLeft,
            y: horizontalScrollThumbTop,
            width: horizontalScrollThumbWidth,
            height: horizontalScrollThumbHeight,
            fill: this.SCROLL_BAR_THUMB_FILL,
            opacity: this.SCROLL_BAR_THUMB_OPACITY,
            draggable: true,
            dragBoundFunc: function(position) {
                var newX = position.x;
                
                if (newX < horizontalScrollAreaLeft) {
                    newX = horizontalScrollAreaLeft;
                }
                else if (newX > horizontalScrollThumbLeftMax) {
                    newX = horizontalScrollThumbLeftMax;
                }
                
                return {
                    x: newX,
                    y: horizontalScrollThumbTop
                }
            }
        });
        
        this._syncHorizontalThumbPositionWithViewport();
        
        var that = this;

        this._horizontalScrollThumb.on(this.DRAG_MOVE_EVENT,
            function () {
                that._onHorizontalThumbDrag(that._horizontalScrollThumb.getX() - horizontalScrollAreaLeft, horizontalScrollThumbLeftMax - horizontalScrollAreaLeft);
            }
        );
        
        this._horizontalScrollArea.on(this.CLICK_EVENT,
            function (event) {
                var x = event.layerX;

                if (x < that._horizontalScrollThumb.getX()) {
                    that._onHorizontalLeftScrollAreaClick();
                }
                
                if (x > that._horizontalScrollThumb.getX() + that._horizontalScrollThumb.getWidth()) {
                    that._onHorizontalRightScrollAreaClick();
                }
            }
        );
        
        this._scrollBarsLayer.add(this._horizontalScrollArea);
        this._scrollBarsLayer.add(this._horizontalScrollThumb);
    },
    
    _initVerticalScrollBar: function (width, height) {
        "use strict";

        var verticalScrollAreaLeft = width - this.SCROLL_BAR_INDENT - this.SCROLL_BAR_WIDTH;
        var verticalScrollAreaTop = this.SCROLL_BAR_INDENT;

        var verticalScrollAreaWidth = this.SCROLL_BAR_WIDTH;
        var verticalScrollAreaHeight = height - 2 * this.SCROLL_BAR_INDENT - this.SCROLL_BAR_WIDTH;
        
        var verticalScrollAreaBottom = verticalScrollAreaTop + verticalScrollAreaHeight;
        
        this._verticalScrollArea = new Kinetic.Rect({
            x: verticalScrollAreaLeft,
            y: verticalScrollAreaTop,
            width: verticalScrollAreaWidth,
            height: verticalScrollAreaHeight,
            fill: this.SCROLL_BAR_AREA_FILL,
            opacity: this.SCROLL_BAR_AREA_OPACITY
        });

        var verticalScrollThumbWidth = this.SCROLL_BAR_WIDTH;
        var verticalScrollThumbHeight = this.SCROLL_THUMB_WIDTH;

        var verticalScrollThumbTopMax = verticalScrollAreaBottom - verticalScrollThumbHeight;

        var verticalScrollThumbLeft = verticalScrollAreaLeft;
        var verticalScrollThumbTop = verticalScrollAreaTop;

        this._verticalScrollThumb = new Kinetic.Rect({
            x: verticalScrollThumbLeft,
            y: verticalScrollThumbTop,
            width: verticalScrollThumbWidth,
            height: verticalScrollThumbHeight,
            fill: this.SCROLL_BAR_THUMB_FILL,
            opacity: this.SCROLL_BAR_THUMB_OPACITY,
            draggable: true,
            dragBoundFunc: function(position) {
                var newY = position.y;
                
                if (newY < verticalScrollAreaTop) {
                    newY = verticalScrollAreaTop;
                }
                else if (newY > verticalScrollThumbTopMax) {
                    newY = verticalScrollThumbTopMax;
                }
                
                return {
                    x: verticalScrollThumbLeft,
                    y: newY
                }
            }
        });
        
        this._syncVerticalThumbPositionWithViewport();
        
        var that = this;

        this._verticalScrollThumb.on(this.DRAG_MOVE_EVENT,
            function () {
                that._onVerticalThumbDrag(that._verticalScrollThumb.getY() - verticalScrollAreaTop, verticalScrollThumbTopMax - verticalScrollAreaTop);
            }
        );
        
        this._verticalScrollArea.on(this.CLICK_EVENT,
            function (event) {
                var y = event.layerY;

                if (y < that._verticalScrollThumb.getY()) {
                    that._onVerticalTopScrollAreaClick();
                }
                
                if (y > that._verticalScrollThumb.getY() + that._verticalScrollThumb.getHeight()) {
                    that._onVerticalBottomScrollAreaClick();
                }
            }
        );
        
        this._scrollBarsLayer.add(this._verticalScrollArea);
        this._scrollBarsLayer.add(this._verticalScrollThumb);
    },
    
    _onHorizontalThumbDrag: function (position, maximum) {
        "use strict";

        var ratio = position / maximum;
        this._viewport.setHorizontalScrollRatio(ratio);
        this.paintModel(this._model);
    },
    
    _onVerticalThumbDrag: function (position, maximum) {
        "use strict";

        var ratio = position / maximum;
        this._viewport.setVerticalScrollRatio(ratio);
        this.paintModel(this._model);
    },
    
    _onHorizontalLeftScrollAreaClick: function () {
        "use strict";

        this.scrollX(-Math.floor(this._viewport.getCols() / this.SCROLL_BAR_AREA_CLICK_RATIO));
    },
    
    _onHorizontalRightScrollAreaClick: function () {
        "use strict";

        this.scrollX(Math.floor(this._viewport.getCols() / this.SCROLL_BAR_AREA_CLICK_RATIO));
    },
    
    _onVerticalTopScrollAreaClick: function () {
        "use strict";

        this.scrollY(-Math.floor(this._viewport.getRows() / this.SCROLL_BAR_AREA_CLICK_RATIO));
    },
    
    _onVerticalBottomScrollAreaClick: function () {
        "use strict";

        this.scrollY(Math.floor(this._viewport.getRows() / this.SCROLL_BAR_AREA_CLICK_RATIO));
    },
    
    _syncHorizontalThumbPositionWithViewport: function () {
        "use strict";

        var ratio = this._viewport.getHorizontalScrollRatio();
        var horizontalScrollThumbLeft = this._horizontalScrollArea.getX() + Math.floor((this._horizontalScrollArea.getWidth() - this.SCROLL_THUMB_WIDTH) * ratio);
        
        this._horizontalScrollThumb.setX(horizontalScrollThumbLeft);
        
        this._scrollBarsLayer.draw();
    },
    
    _syncVerticalThumbPositionWithViewport: function () {
        "use strict";

        var ratio = this._viewport.getVerticalScrollRatio();
        var verticalScrollThumbLeft = this._verticalScrollArea.getY() + Math.floor((this._verticalScrollArea.getHeight() - this.SCROLL_THUMB_WIDTH) * ratio);
        
        this._verticalScrollThumb.setY(verticalScrollThumbLeft);
        
        this._scrollBarsLayer.draw();
    },
    
    _initModelLayer: function () {
        "use strict";

        var that = this;
        this._modelLayer.on(this.CLICK_EVENT,
            function (event) {
                that._onLayerClick(event);
            }
        );

    },
    
    _initBackgroundLayer: function (width, height) {
        "use strict";

        var backgroundRect = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: width,
            height: height,
            opacity: this.BACKGROUND_OPACITY,
            fill: this.BACKGROUND_COLOR
        });

        this._backgroundLayer.add(backgroundRect);
        
        var that = this;
        
        this._backgroundLayer.on(this.CLICK_EVENT,
            function (event) {
                that._onLayerClick(event);
            }
        );
        
        this._backgroundLayer.on(this.MOUSE_MOVE_EVENT,
            function (event) {
                that._onMouseOver(event);
            }
        );
        
        this._backgroundLayer.on(this.MOUSE_OUT_EVENT,
            function (event) {
                that._onMouseOut(event);
            }
        );
    },
    
    _cacheCellViewAndPaint: function () {
        "use strict";
        
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
                that.paintModel(that._model);
            }
        });
    },
    
    _onLayerClick: function (event) {
        "use strict";
        
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

    _onMouseOver: function (event) {
        "use strict";
        
        if (this._playMode) {
            return;
        }

        var x = event.layerX;
        var y = event.layerY;

        var coordinates = new Coordinates(x, y);
        var viewCellCoordinates = this._viewport.toViewCell(coordinates);
        
        this._removeHighlightedCell();
        this._highlightCell(viewCellCoordinates);
    },

    _onMouseOut: function () {
        "use strict";
        
        if (this._playMode) {
            return;
        }
        
        this._removeHighlightedCell();
        this._cellHighlightingLayer.draw();
    },

    _highlightCell: function(coordinates) {
        "use strict";
        
        var cellSize = this._viewport.getCellSize();
                
        var cell = new Kinetic.Rect({
            x: (coordinates.x()) * cellSize,
            y: (coordinates.y()) * cellSize,
            width: cellSize,
            height: cellSize,
            fill: this.HIGHLIGHTED_CELL_COLOR
        });

        this._cellHighlightingLayer.add(cell);
        this._cellHighlightingLayer.draw();
    },
    
    _removeHighlightedCell: function() {
        "use strict";
        
        this._cellHighlightingLayer.removeChildren();
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

