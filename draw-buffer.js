var DrawBuffer = function () {
    "use strict";
    
    this._previous = new CellList();
    this._current = new CellList();
};

DrawBuffer.prototype = {

    restart: function () {
        "use strict";
    
        //_.each
    },
    
    drawn: function (x, y, object) {
        "use strict";
    
        Assert.isPositiveInteger(x);
        Assert.isPositiveInteger(y);
        Assert.isNotNullAndDefined(object);
        
        var drawn = this._previuos.exists(x, y);
        
        this._current.add(x, y, object);
        
        return drawn;
    },
    
    commit: function () {
        "use strict";
    
        //returns object that must be removed from layer
    },
    
    clear: function () {
        "use strict";
    
    }
    
};