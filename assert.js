var Assert = Assert || {};

Assert.isString = function (value) {
    "use strict";
    var isString = _.isString(value);
    
    if (!isString) {
        throw new Error('Value [ ' + value + ' ] is not string');
    }
};

Assert.isInteger = function (value) {
    "use strict";
    var isInteger = AssertBase.isInteger(value);
    
    if (!isInteger) {
        throw new Error('Value [ ' + value + ' ] is not integer');
    }
};

Assert.isPositiveInteger = function (value) {
    "use strict";
    var isPositiveInteger = AssertBase.isPositiveInteger(value);
    
    if (!isPositiveInteger) {
        throw new Error('Value [ ' + value + ' ] is not positive integer');
    }
};

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

Assert.isToggleCellModel = function (value) {
    "use strict";
    
    var isToggleCellModel = value instanceof ToggleCellModel;
    
    if (!isToggleCellModel) {
        throw new Error('Is not an ToggleCellModel value');
    }
};

Assert.isArea = function (value) {
    "use strict";
    
    var isArea = value instanceof Area;
    
    if (!isArea) {
        throw new Error('Is not an Area value');
    }
};

Assert.isArray = function (value) {
    "use strict";
    
    var isArray = _.isArray(value);;
    
    if (!isArray) {
        throw new Error('Is not an Array value');
    }
};