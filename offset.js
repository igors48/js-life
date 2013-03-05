var Offset = function (x, y) {
    "use strict";
    
    this.init(x, y);
};

Offset.prototype = {

    init: function (x, y) {
        "use strict";
    
        Assert.isInteger(x);
        this._x = x;
        
        Assert.isInteger(y);
        this._y = y;
    },
    
    x: function () {
        "use strict";
        
        return this._x;
    },
    
    y: function () {
        "use strict";
        
        return this._y;
    }

};    