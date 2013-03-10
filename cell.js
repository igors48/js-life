var Cell = function (x, y, value) {
    "use strict";
    
    Assert.cellCoordinateValid(x);
    Assert.cellCoordinateValid(y);
    this._coordinates = new Coordinates(x, y);
        
    Assert.isNotNullAndDefined(value);
    this._value = value;
};

Cell.prototype = {

    coordinates: function () {
        "use strict";
        
        return this._coordinates;
    },
    
    value: function () {
        "use strict";
        
        return this._value;
    },
    
    equals: function (that) {
        "use strict";

        if (!(that instanceof Cell)) {
            return false;
        }

        return _.isEqual(this._value, that.value());
    }
    
};

