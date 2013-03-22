var BreakableRenderer = function (paintPerCall, painter) {
    "use strict";
    
    Assert.isNotNullAndDefined(painter);
    this._painter = painter;
};

BreakableRenderer.prototype = {

    replaceModel: function (model) {
    },
    
    paintPart: function () {
    },
    
    reset: function () {
    }
    
};