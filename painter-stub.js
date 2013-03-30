var PainterStub = function () {
    "use strict";
    
    this._paintedCellCount = 0;
    this._cleared = false;
    this._draw = false;
    this._paintedStarted = 0;
    this._paintedEnded = 0;
};

PainterStub.prototype = {

    startPaint: function () {
        "use strict";

        ++this._paintedStarted;
    },
    
    paintCell: function (coordinates) {
        "use strict";

        Assert.isCoordinates(coordinates);
        ++this._paintedCellCount;
    },
    
    endPaint: function () {
        "use strict";

        ++this._paintedEnded;
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
    },
    
    startPaintCount: function () {
        "use strict";
    
        return this._paintedStarted;
    },
    
    endPaintCount: function () {
        "use strict";

        return this._paintedEnded;
    },
    
};