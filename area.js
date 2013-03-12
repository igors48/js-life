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
    
    shrink: function () {
        "use strict";
        
        var newTop = this._topLeft.x() - 1;
        var newLeft = this._topLeft.y() - 1;
        var newBottom = this._bottomRight.x() + 1;
        var newRight = this._bottomRight.y() + 1;
        
        newTop = newTop < 0 ? 0 : newTop;
        newLeft = newLeft < 0 ? 0 : newLeft;
        
        var newTopLeft = new Coordinates(newTop, newLeft);
        var newBottomRight = new Coordinates(newBottom, newRight);
        
        var shrinked = new Area(newTopLeft, newBottomRight);
        
        return shrinked;
    },
    
    equals: function (that) {
        "use strict";
        
        if (!(that instanceof Area)) {
            return false;
        }
        
        return ((this._topLeft.equals(that.topLeft())) && (this._bottomRight.equals(that.bottomRight())));
    }
    
}