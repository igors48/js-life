var NeighborsAndState = function (neighborsCount, isEmpty) {
    "use strict";
    
    Assert.isPositiveInteger(neighborsCount);
    this._neighborsCount = neighborsCount;
    
    Assert.isBoolean(isEmpty);
    this._isEmpty = isEmpty;
}

NeighborsAndState.prototype = {

    neighborsCount: function () {
        "use strict";
    
        return this._neighborsCount;
    },
    
    isEmpty: function () {
        "use strict";
    
        return this._isEmpty;
    }
    
}