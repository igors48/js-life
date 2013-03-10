var Offset = function (x, y) {
    "use strict";
    
    Assert.isInteger(x);
    this._x = x;
        
    Assert.isInteger(y);
    this._y = y;
};

Offset.prototype = {

    x: function () {
        "use strict";
        
        return this._x;
    },
    
    y: function () {
        "use strict";
        
        return this._y;
    }

};    