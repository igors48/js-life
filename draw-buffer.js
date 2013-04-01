var DrawBuffer = function () {
    "use strict";
    
    this._previous = new CellsList();
    this._current = new CellsList();
};

DrawBuffer.prototype = {

    restart: function () {
        "use strict";

        this._previous.addAll(this._current);
        this._current = new CellsList();    
    },
    
    drawn: function (x, y, object) {
        "use strict";
    
        Assert.isPositiveInteger(x);
        Assert.isPositiveInteger(y);
        Assert.isNotNullAndDefined(object);
        
        var drawn = this._previous.exists(x, y);
        
        this._current.add(x, y, object);
        
        return drawn;
    },
    
    commit: function () {
        "use strict";
    
        var removed = this._previous.retain(this._current);
        this._current = new CellsList();
        
        return removed;
    },
    
    clear: function () {
        "use strict";
    
        this._previous = new CellsList();
        this._current = new CellsList();
    }
    
};