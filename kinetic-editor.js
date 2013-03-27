var KineticEditor = function (container, width, height, maxCols, maxRows, listener) {
    "use strict";
    
    this.init(container, width, height, maxCols, maxRows, listener);
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
  
    THAT: this,
    
    init: function (container, width, height, maxCols, maxRows, listener) {
        "use strict";

        Assert.isPositiveInteger(width);    
        Assert.isPositiveInteger(height);    
        Assert.isPositiveInteger(maxCols);    
        Assert.isPositiveInteger(maxRows);    
        Assert.isNotNullAndDefined(listener);
        this._listener = listener;
        
        this._playMode = false;
        
        this._maxRows = maxRows;
        this._maxCols = maxCols;
        
        this._viewport = new ViewPort(width, height, maxCols, maxRows, this.MIN_CELL_SIZE, this.MAX_CELL_SIZE, this.CELL_SIZE);

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

    scrollX: function (delta) {
        "use strict";

        Assert.isInteger(delta);
        
        this._removeHighlightedCell();
        this._viewport.scrollX(delta);
        this._syncHorizontalThumbPositionWithViewport();

        this._listener.onRedraw();
    },
        
    scrollY: function (delta) {
        "use strict";
        
        Assert.isInteger(delta);
        
        this._removeHighlightedCell();
        this._viewport.scrollY(delta);
        this._syncVerticalThumbPositionWithViewport();

        this._listener.onRedraw();
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
    
    switchToPlayMode: function () {
        "use strict";
        
        this._playMode = true;
    },

    paintCell: function (coordinates) {
        "use strict";
                        
        var viewPortCoordinates = this._viewport.toViewPort(coordinates);
                
        if (viewPortCoordinates) {
            var image = new Kinetic.Image({
                image: this._cachedCellView,
                x: (viewPortCoordinates.x()) * this._cachedCellSize,
                y: (viewPortCoordinates.y()) * this._cachedCellSize
            });

            this._modelLayer.add(image);
        }
    },
    
    clear: function () {
        "use strict";
    
        this._modelLayer.removeChildren();
    },
    
    draw: function () {
        "use strict";
    
        this._modelLayer.draw();
    },
    
    _initControlLayer: function (width, height) {
        "use strict";

        this._initHorizontalScrollBar(width, height);
        this._initVerticalScrollBar(width, height);
    },

    _initHorizontalScrollBar: function (width, height) {
        "use strict";

        var that = this;
        
        var configuration = {
            layer: this._scrollBarsLayer,
            left: this.SCROLL_BAR_INDENT,
            top: height - this.SCROLL_BAR_INDENT - this.SCROLL_BAR_WIDTH,
            width: width - 2 * this.SCROLL_BAR_INDENT - this.SCROLL_BAR_WIDTH,
            height: this.SCROLL_BAR_WIDTH,
            thumbWidth: this.SCROLL_THUMB_WIDTH,
            areaFill: this.SCROLL_BAR_AREA_FILL,    
            areaOpacity: this.SCROLL_BAR_AREA_OPACITY,    
            thumbFill: this.SCROLL_BAR_THUMB_FILL,
            thumbOpacity: this.SCROLL_BAR_THUMB_OPACITY,
            onThumbDrag:  function (position, maximum) {
                that._onHorizontalThumbDrag(position, maximum);
            },   
            onLeftAreaClick: function () {
                that._onHorizontalLeftScrollAreaClick();
            },
            onRightAreaClick: function () {
                that._onHorizontalRightScrollAreaClick();
            }        
        };
        
        this._horizontalScrollBar = new HorizontalScrollBar(configuration);
        this._syncHorizontalThumbPositionWithViewport();
    },
    
    _initVerticalScrollBar: function (width, height) {
        "use strict";

        var that = this;
        
        var configuration = {
            layer: this._scrollBarsLayer,
            left: width - this.SCROLL_BAR_INDENT - this.SCROLL_BAR_WIDTH,
            top: this.SCROLL_BAR_INDENT,
            width: this.SCROLL_BAR_WIDTH,
            height: height - 2 * this.SCROLL_BAR_INDENT - this.SCROLL_BAR_WIDTH,
            thumbHeight: this.SCROLL_THUMB_WIDTH,
            areaFill: this.SCROLL_BAR_AREA_FILL,    
            areaOpacity: this.SCROLL_BAR_AREA_OPACITY,    
            thumbFill: this.SCROLL_BAR_THUMB_FILL,
            thumbOpacity: this.SCROLL_BAR_THUMB_OPACITY,
            onThumbDrag:  function (position, maximum) {
                that._onVerticalThumbDrag(position, maximum);
            },   
            onTopAreaClick: function () {
                that._onVerticalTopScrollAreaClick();
            },
            onBottomAreaClick: function () {
                that._onVerticalBottomScrollAreaClick();
            }        
        };
        
        this._verticalScrollBar = new VerticalScrollBar(configuration);
        this._syncVerticalThumbPositionWithViewport();
    },
    
    _onHorizontalThumbDrag: function (position, maximum) {
        "use strict";

        var ratio = position / maximum;
        
        this._viewport.setHorizontalScrollRatio(ratio);
        this._listener.onRedraw();
        
    },
    
    _onVerticalThumbDrag: function (position, maximum) {
        "use strict";

        var ratio = position / maximum;
        
        this._viewport.setVerticalScrollRatio(ratio);
        this._listener.onRedraw();
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

        this._horizontalScrollBar.setThumbOffsetInPercent(ratio);
        this._scrollBarsLayer.draw();
    },
    
    _syncVerticalThumbPositionWithViewport: function () {
        "use strict";

        var ratio = this._viewport.getVerticalScrollRatio();

        this._verticalScrollBar.setThumbOffsetInPercent(ratio);
        this._scrollBarsLayer.draw();
    },
    
    _initModelLayer: function () {
        "use strict";

        var that = this;
        this._modelLayer.on(this.CLICK_EVENT,
            function (event) {
                that._onModelLayerClick(event);
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
                that._onModelLayerClick(event);
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
        
        this._cachedCellSize = this._viewport.getCellSize();

        var viewCell = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: this._cachedCellSize,
            height: this._cachedCellSize,
            fill: this.LIVE_CELL_COLOR
        });
        
        var that = this;

        viewCell.toImage({
            width: this._cachedCellSize,
            height: this._cachedCellSize,
            callback: function(image) {
                that._cachedCellView = image;
                that._listener.onRedraw();
            }
        });
    },
    
    _onModelLayerClick: function (event) {
        "use strict";
        
        if (this._playMode) {
            return;
        }

        var x = event.layerX;
        var y = event.layerY;

        var clickCoordinates = new Coordinates(x, y);
        var viewCellCoordinates = this._viewport.toViewCell(clickCoordinates);
        var modelCellCoordinates = this._viewport.toGlobal(viewCellCoordinates);
        
        this._listener.onToggleCell(modelCellCoordinates);
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
        
        var cell = new Kinetic.Rect({
            x: (coordinates.x()) * this._cachedCellSize,
            y: (coordinates.y()) * this._cachedCellSize,
            width: this._cachedCellSize,
            height: this._cachedCellSize,
            fill: this.HIGHLIGHTED_CELL_COLOR
        });

        this._cellHighlightingLayer.add(cell);
        this._cellHighlightingLayer.draw();
    },
    
    _removeHighlightedCell: function() {
        "use strict";
        
        this._cellHighlightingLayer.removeChildren();
    },
    
};

