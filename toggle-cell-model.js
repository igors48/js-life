var ToggleCellModel = function () {
    "use strict";
    this.init();
};

ToggleCellModel.prototype = {

    init: function () {
        "use strict";
        this._cells = [];
    },
    
    toggle: function (x, y) {
        "use strict";
        Assert.cellCoordinateValid(x);
        Assert.cellCoordinateValid(y);
    },
    
    cells: function () {
        "use strict";
        return [];
    },
    
    _findCellIndex: function (x, y) {
        "use strict";
        var target = new Coordinates(x, y);
        var length = this._cells.length;

        for (var i = 0; i < length; ++i) {
  
            if (i in this._cells) {
                var candidate = this._cells[i];
                var coordinates = candidate.coordinates();
                
                if (target.equals(coordinates)) {
                    return i;
                }
            }
        }
        
        return -1;
    }
    
};    