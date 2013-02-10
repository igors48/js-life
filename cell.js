var Cell = function (x, y, state) {
    "use strict";
    this.init(x, y, state);
};

Cell.prototype = {

    init: function (x, y, state) {
        "use strict";
        Assert.cellCoordinateValid(x);
        Assert.cellCoordinateValid(y);
        this._coordinates = new Coordinates(x, y);
        
        Assert.cellStateValid(state);
        this._state = state;
    },
    
    coordinates: function () {
        "use strict";
        return this._coordinates;
    },
    
    state: function () {
        "use strict";
        return this._state;
    }
};

