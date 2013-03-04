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