var PainterStub = function () {
    "use strict";
    
    this._paintedCellCount = 0;
    this._cleared = false;
    this._draw = false;
};

PainterStub.prototype = {

    startPaint: function () {
        "use strict";

    },
    
    paintCell: function (coordinates) {
        "use strict";

        Assert.isCoordinates(coordinates);
        ++this._paintedCellCount;
    },
    
    endPaint: function () {
        "use strict";

    },
    
    clear: function () {
        "use strict";
        
        this._paintedCellCount = 0;
        this._cleared = true;
    },
    
    reset: function () {
        "use strict";
        
        this._paintedCellCount = 0;
        this._reseted = false;
    },

    draw: function () {
        "use strict";
    
        this._draw = true;
    },

    getPaintedCellCount: function () {
        "use strict";
    
        return this._paintedCellCount;
    },
    
    isCleared: function () {
        "use strict";
    
        return this._cleared;
    },
    
    isDraw: function () {
        "use strict";
    
        return this._draw;
    }
    
};