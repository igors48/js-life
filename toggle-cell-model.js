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
        
        var cellIndex = this._findCellIndex(x, y);
        
        if (cellIndex >= 0) {
            this._removeCell(cellIndex);
        } else {
            var coordinates = new Coordinates(x, y);
            this._cells.push(coordinates);
        }
        
    },
    
    cells: function () {
        "use strict";
        return this._cells;
    },
    
    _removeCell: function(index) {
        var rest = this._cells.slice(index + 1);
        this._cells.length = index;
        this._cells.push.apply(this._cells, rest);
    },
    
    _findCellIndex: function (x, y) {
        "use strict";
        var target = new Coordinates(x, y);
        var length = this._cells.length;

        for (var i = 0; i < length; ++i) {
  
            if (i in this._cells) {
                var candidate = this._cells[i];
                
                if (target.equals(candidate)) {
                    return i;
                }
            }
        }
        
        return -1;
    }
    
};    