var NeighborsAndStatus = function (neighborsCount, isEmpty) {
    "use strict";
    
    Assert.isPositiveInteger(neighborsCount);
    this._neighborsCount = neighborsCount;
    
    Assert.isBoolean(isEmpty);
    this._isEmpty = isEmpty;
}

NeighborsAndStatus.prototype = {

    neighborsCount: function () {
        "use strict";
    
        return this._neighborsCount;
    },
    
    isEmpty: function () {
        "use strict";
    
        return this._isEmpty;
    }
    
}