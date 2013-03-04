var Coordinates = function (x, y) {
    "use strict";
    
    this.init(x, y);
};

Coordinates.prototype = {

    init: function (x, y) {
        "use strict";
        
        Assert.cellCoordinateValid(x);
        this._x = x;
        
        Assert.cellCoordinateValid(y);
        this._y = y;
    },
    
    x: function () {
        "use strict";
        
        return this._x;
    },
    
    y: function () {
        "use strict";
        
        return this._y;
    },

    equals: function (that) {
        "use strict";
        
        if (!(that instanceof Coordinates)) {
            return false;
        }
        
        return ((this._x == that.x()) && (this._y == that.y()));
    }
    
};    