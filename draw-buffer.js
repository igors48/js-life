var DrawBuffer = function () {
    "use strict";
    
    this._previous = new CellList();
    this._current = new CellList();
};

DrawBuffer.prototype = {

    restart: function () {
        "use strict";
    
    },
    
    drawn: function (x, y, object) {
        "use strict";
    
    },
    
    commit: function () {
        "use strict";
    
        //returns object that must be removed from layer
    },
    
    clear: function () {
        "use strict";
    
    }
    
};