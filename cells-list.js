var CellsList = function () {
    "use strict";
    
    this._list = [];
    this._count = 0;
};

CellsList.prototype = {

    cells: function () {
        "use strict";
        
        var result = [];
        
        _.each(this._list,
            function (row, rowIndex) {
            
                _.each(row,
                    function (value, colIndex) {
                        var coordinates = new Coordinates(colIndex, rowIndex);
                        
                        result.push(coordinates);
                    }
                );
            }
        );
        
        return result;
    },
    
    add: function (x, y, value) {
        "use strict";
    
        Assert.isPositiveInteger(x);
        Assert.isPositiveInteger(y);

        value = value || x;

        if (!this.exists(x, y)) {    
            var row = this._row(y);
            row[x] = value;
        
            ++this._count;
        }
    },
    
    get: function (x, y) {
        "use strict";
    
        Assert.isPositiveInteger(x);
        Assert.isPositiveInteger(y);

        var row = this._row(y);
        var result = x in row ? row[x] : null;

        return result;    
    },
    
    remove: function (x, y) {
        "use strict";
    
        Assert.isPositiveInteger(x);
        Assert.isPositiveInteger(y);
        
        if (this.exists(x, y)) {    
            var row = this._row(y);
            var rest = this._list[y].slice(x + 1);
            this._list[y].length = x;
            this._list[y].push.apply(this._list[y], rest);
        
            --this._count;
        }
    },
    
    toggle: function (x, y) {
        "use strict";

        Assert.cellCoordinateValid(x);
        Assert.cellCoordinateValid(y);
        
        if (this.exists(x, y)) {
            this.remove(x, y);
            
            return false;
        } else {
            this.add(x, y);
            
            return true;
        }
    },
    
    exists: function (x, y) {
        "use strict";

        Assert.isPositiveInteger(x);
        Assert.isPositiveInteger(y);
        
        var row = this._row(y);
        var result = x in row;
        
        return result;
    },
    
    count: function () {
        "use strict";

        return this._count;
    },

    _row: function (y) {
        "use strict";    
    
        if (!(y in this._list)) {
            this._list[y] = [];
        }
        
        return this._list[y];
    }

};

