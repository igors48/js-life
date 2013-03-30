var BreakableRenderer = function (paintPerCall, painter) {
    "use strict";

    Assert.isPositiveInteger(paintPerCall);
    this._paintPerCall = paintPerCall;
    
    Assert.isNotNullAndDefined(painter);
    this._painter = painter;
    
    this._model = [];
    this._index = 0;
};

BreakableRenderer.prototype = {

    replaceModel: function (model) {
        "use strict";

        Assert.isArray(model);
        this._model = model;

        this.restart();    
    },
    
    render: function () {
        "use strict";
        
        var count = 0;
        var maxIndex = this._model.length;

        if (!this.complete()) {     
            this._painter.startPaint();
            
            while (count < this._paintPerCall && this._index < maxIndex) {
                var current = this._model[this._index];
            
                this._painter.paintCell(current);
            
                ++this._index;
                ++count;
            }

            this._painter.endPaint();
        }
        
        return this.complete();
    },
    
    complete: function () {
        "use strict";

        return this._index >= this._model.length;    
    },
    
    restart: function () {
        "use strict";
        
        this._painter.clear();
        
        this._index = 0;
    }
    
};