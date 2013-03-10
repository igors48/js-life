var ToggleCellModel = function () {
    "use strict";

    this.init();
};

ToggleCellModel.prototype = {

    init: function () {
        "use strict";

        this._cells = [];
    },
    
    put: function (x, y) {
        "use strict";

        Assert.cellCoordinateValid(x);
        Assert.cellCoordinateValid(y);

        var coordinates = new Coordinates(x, y);
        this._cells.push(coordinates);
    },
    
    toggle: function (x, y) {
        "use strict";

        Assert.cellCoordinateValid(x);
        Assert.cellCoordinateValid(y);
        
        var cellIndex = this._findCellIndex(x, y);
        
        if (cellIndex >= 0) {
            this._removeCell(cellIndex);
            
            return false;
        } else {
            var coordinates = new Coordinates(x, y);
            this._cells.push(coordinates);
            
            return true;
        }
        
    },
    
    cells: function () {
        "use strict";

        return this._cells;
    },
    
    _removeCell: function(index) {
        "use strict";

        var rest = this._cells.slice(index + 1);
        this._cells.length = index;
        this._cells.push.apply(this._cells, rest);
    },
    
    _findCellIndex: function (x, y) {
        "use strict";

        var target = new Coordinates(x, y);
        var result = -1;

        _.find(this._cells, 
            function (candidate, index) {
                var found = target.equals(candidate);
                
                if (found) {
                    result = index;
                }
                
                return found;
            }
        );
        
        return result;
    }
    
};    