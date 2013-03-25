var Area = function (topLeft, bottomRight) {
    "use strict";
    
    Assert.isCoordinates(topLeft);
    this._topLeft = topLeft;
        
    Assert.isCoordinates(bottomRight);
    this._bottomRight = bottomRight;
}

Area.prototype = {

    topLeft: function () {
        "use strict";
        
        return this._topLeft;
    },
    
    bottomRight: function () {
        "use strict";
        
        return this._bottomRight;
    },
    
    width: function () {
        "use strict";

        var width = this._bottomRight.x() - this._topLeft.x();

        return width;    
    },
    
    height: function () {
        "use strict";

        var height = this._bottomRight.y() - this._topLeft.y();

        return height;    
    },
    
    center: function () {
        "use strict";

        var x = Math.floor(this._topLeft.x() + this.width() / 2);
        var y = Math.floor(this._topLeft.y() + this.height() / 2);
        
        var center = new Coordinates(x, y);
        
        return center;
    },

    equals: function (that) {
        "use strict";
        
        if (!(that instanceof Area)) {
            return false;
        }
        
        return ((this._topLeft.equals(that.topLeft())) && (this._bottomRight.equals(that.bottomRight())));
    }
    
}