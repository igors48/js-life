var Offset = function (x, y) {
    "use strict";
    this.init(x, y);
};

Offset.prototype = {

    init: function (x, y) {
        "use strict";
        Assert.offsetValid(x);
        this._x = x;
        
        Assert.offsetValid(y);
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