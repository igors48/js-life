var PainterStub = function () {
    "use strict";
    
    this._paintedCellCount = 0;
    this._cleared = false;
};

PainterStub.prototype = {

    paintCell: function (coordinates) {
        "use strict";

        Assert.isCoordinates(coordinates);
        ++this._paintedCellCount;
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
    
    getPaintedCellCount: function () {
        "use strict";
    
        return this._paintedCellCount;
    },
    
    isCleared: function () {
        "use strict";
    
        return this._cleared;
    }
    
};