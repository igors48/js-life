var HorizontalScrollBar = function (configuration) {
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
    
    Assert.isPositiveInteger(configuration.thumbWidth);    
    this._thumbWidth = configuration.thumbWidth;
    
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
    
    Assert.isFunction(configuration.onLeftAreaClick);
    this._onLeftAreaClick = configuration.onLeftAreaClick;
    
    Assert.isFunction(configuration.onRightAreaClick);
    this._onRightAreaClick = configuration.onRightAreaClick;
    
    this._thumb = null;
    this._thumbMoveAreaWidth = 0;
    
    this._init();
};

HorizontalScrollBar.prototype = {

    CLICK_EVENT: 'click',
    DRAG_MOVE_EVENT: 'dragmove',

    setThumbOffsetInPercent: function (offset) {
        "use strict";
    
        Assert.isNumber(offset);
        
        var left = this._left + Math.floor(this._thumbMoveAreaWidth * offset);
        
        this._thumb.setX(left);
    },
    
    _init: function () {
        "use strict";

        var right = this._left + this._width;
        
        var area = new Kinetic.Rect({
            x: this._left,
            y: this._top,
            width: this._width,
            height: this._height,
            fill: this._areaFill,
            opacity: this._areaOpacity
        });


        var thumbLeftMax = right - this._thumbWidth;
        this._thumbMoveAreaWidth = thumbLeftMax - this._left;


        var that = this;

        this._thumb = new Kinetic.Rect({
            x: this._left,
            y: this._top,
            width: this._thumbWidth,
            height: this._height,
            fill: this._thumbFill,
            opacity: this._thumbOpacity,
            draggable: true,
            dragBoundFunc: function(position) {
                var newX = position.x;
                
                if (newX < that._left) {
                    newX = that._left;
                }
                else if (newX > thumbLeftMax) {
                    newX = thumbLeftMax;
                }
                
                return {
                    x: newX,
                    y: that._top
                }
            }
        });
        
        this._thumb.on(this.DRAG_MOVE_EVENT,
            function () {
                that._onThumbDrag(that._thumb.getX() - that._left, that._thumbMoveAreaWidth);
            }
        );
        
        area.on(this.CLICK_EVENT,
            function (event) {
                var x = event.layerX;

                if (x < that._thumb.getX()) {
                    that._onLeftAreaClick();
                }
                
                if (x > that._thumb.getX() + that._thumb.getWidth()) {
                    that._onRightAreaClick();
                }
            }
        );
        
        this._layer.add(area);
        this._layer.add(this._thumb);
    }
};