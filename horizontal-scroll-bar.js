var HorizontalScrollBar = function (configuration) {
    "use strict";
    
    Assert.isNotNullAndDefined(configuration);
    
    this._layer = configuration.layer;
    this._left = configuration.left;
    this._top = configuration.top;
    this._width = configuration.width;
    this._height = configuration.height;
    this._thumbWidth = configuration.thumbWidth;
    this._areaFill = configuration.areaFill;
    this._areaOpacity = configuration.areaOpacity;
    this._thumbFill = configuration.thumbFill;
    this._thumbOpacity = configuration.thumbOpacity;
    this._onThumbDrag = configuration.onThumbDrag;
    this._onLeftAreaClick = configuration.onLeftAreaClick;
    this._onRightAreaClick = configuration.onRightAreaClick;
}