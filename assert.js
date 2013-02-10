var Assert = Assert || {};

Assert.cellCoordinateValid = function (value) {
    "use strict";
    var isPositiveInteger = AssertBase.isPositiveInteger(value);
    
    if (!isPositiveInteger) {
        throw new Error('Cell coordinate [ ' + value + ' ] is invalid');
    }
};

Assert.cellStateValid = function (value) {
    "use strict";
    var isStateValid = AssertBase.isOneOfThese(value, [1, 2]);
    
    if (!isStateValid) {
        throw new Error('Cell state [ ' + value + ' ] is invalid');
    }
};

Assert.offsetValid = function (value) {
    "use strict";
    var isOffsetValid = AssertBase.isOneOfThese(value, [-1, 0, +1]);
    
    if (!isOffsetValid) {
        throw new Error('Offset value [ ' + value + ' ] is invalid');
    }
};

Assert.isOffset = function (value) {
    "use strict";
    var isOffset = value instanceof Offset;
    
    if (!isOffset) {
        throw new Error('Is not an Offset value');
    }
};

Assert.isCoordinates = function (value) {
    "use strict";
    var isCoordinates = value instanceof Coordinates;
    
    if (!isCoordinates) {
        throw new Error('Is not an Coordinates value');
    }
};