var Area = function (topLeft, bottomRight) {
    "use strict";
    this.init(topLeft, bottomRight);
}

Area.prototype = {

    init: function (topLeft, bottomRight) {
        "use strict";
        Assert.isCoordinates(topLeft);
        this._topLeft = topLeft;
        
        Assert.isCoordinates(bottomRight);
        this._bottomRight = bottomRight;
    },
    
    topLeft: function () {
        "use strict";
        return this._topLeft;
    },
    
    bottomRight: function () {
        "use strict";
        return this._bottomRight;
    },
    
    equals: function (that) {
        "use strict";
        if (!(that instanceof Area)) {
            return false;
        }
        
        return ((this._topLeft.equals(that.topLeft())) && (this._bottomRight.equals(that.bottomRight())));
    }
    
}