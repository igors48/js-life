var VerticalScrollBar = function (configuration) {
    "use strict";
    
    Assert.isNotNullAndDefined(configuration);
    
    Assert.isNotNullAndDefined(configuration.layer);
    this._layer = configuration.layer;

    Assert.isPositiveInteger(configuration.left);    
    this._left = configuration.left;
    
    Assert.isPositiveInteger(configuration.top);    
    this._top = configuration.top;
    
    Assert.isPositiveInteger(configuration.width);    
    this._width = configuration.width;
    
    Assert.isPositiveInteger(configuration.height);    
    this._height = configuration.height;
    
    Assert.isPositiveInteger(configuration.thumbHeight);    
    this._thumbHeight = configuration.thumbHeight;
    
    Assert.isNotNullAndDefined(configuration.areaFill);
    this._areaFill = configuration.areaFill;
    
    Assert.isPositiveNumber(configuration.areaOpacity);
    this._areaOpacity = configuration.areaOpacity;
    
    Assert.isNotNullAndDefined(configuration.thumbFill);
    this._thumbFill = configuration.thumbFill;
    
    Assert.isPositiveNumber(configuration.thumbOpacity);
    this._thumbOpacity = configuration.thumbOpacity;
    
    Assert.isFunction(configuration.onThumbDrag);
    this._onThumbDrag = configuration.onThumbDrag;
    
    Assert.isFunction(configuration.onTopAreaClick);
    this._onTopAreaClick = configuration.onTopAreaClick;
    
    Assert.isFunction(configuration.onBottomAreaClick);
    this._onBottomAreaClick = configuration.onBottomAreaClick;
    
    this._thumb = null;
    this._thumbMoveAreaHeight = 0;
    
    this._init();
};

VerticalScrollBar.prototype = {

    CLICK_EVENT: 'click',
    DRAG_MOVE_EVENT: 'dragmove',

    setThumbOffsetInPercent: function (offset) {
        "use strict";
    
        Assert.isNumber(offset);
        
        var top = this._top + Math.floor(this._thumbMoveAreaHeight * offset);
        
        this._thumb.setY(top);
    },
    
    _init: function () {
        "use strict";

        var bottom = this._top + this._height;
        
        var area = new Kinetic.Rect({
            x: this._left,
            y: this._top,
            width: this._width,
            height: this._height,
            fill: this._areaFill,
            opacity: this._areaOpacity
        });

        var thumbTopMax = bottom - this._thumbHeight;
        this._thumbMoveAreaHeight = thumbTopMax - this._top;

        var that = this;

        this._thumb = new Kinetic.Rect({
            x: this._left,
            y: this._top,
            width: this._width,
            height: this._thumbHeight,
            fill: this._thumbFill,
            opacity: this._thumbOpacity,
            draggable: true,
            dragBoundFunc: function(position) {
                var newY = position.y;
                
                if (newY < that._top) {
                    newY = that._top;
                }
                else if (newY > thumbTopMax) {
                    newY = thumbTopMax;
                }
                
                return {
                    x: that._left,
                    y: newY
                }
            }
        });
        
        this._thumb.on(this.DRAG_MOVE_EVENT,
            function () {
                that._onThumbDrag(that._thumb.getY() - that._top, that._thumbMoveAreaHeight);
            }
        );
        
        area.on(this.CLICK_EVENT,
            function (event) {
                var y = event.layerY;

                if (y < that._thumb.getY()) {
                    that._onTopAreaClick();
                }
                
                if (y > that._thumb.getY() + that._thumb.getHeight()) {
                    that._onBottomAreaClick();
                }
            }
        );
        
        this._layer.add(area);
        this._layer.add(this._thumb);
    }
};