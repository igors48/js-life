var Assert = Assert || {};

Assert.isOneSymbolString = function (value) {
    "use strict";
	
    var isOneSymbolString = (_.isString(value)) && (value.length === 1);
    
    if (!isOneSymbolString) {
        throw new Error('Value [ ' + value + ' ] is not one symbol string');
    }
};

Assert.isString = function (value) {
    "use strict";
	
    var isString = _.isString(value);
    
    if (!isString) {
        throw new Error('Value [ ' + value + ' ] is not string');
    }
};

Assert.isNotNullAndDefined = function (value) {
    "use strict";
	
    var isNull = _.isNull(value);
    var isUndefined = _.isUndefined(value);
    
    if (isNull || isUndefined) {
        throw new Error('Value [ ' + value + ' ] is null or undefined');
    }
};

Assert.isBoolean = function (value) {
    "use strict";
	
    var isBoolean = _.isBoolean(value);
    
    if (!isBoolean) {
        throw new Error('Value [ ' + value + ' ] is not Boolean');
    }
};

Assert.isInteger = function (value) {
    "use strict";
	
    var isInteger = AssertBase.isInteger(value);
    
    if (!isInteger) {
        throw new Error('Value [ ' + value + ' ] is not integer');
    }
};

Assert.isNumber = function (value) {
    "use strict";
	
    var isNumber = (_.isNumber(value)) && (!_.isNaN(value));
    
    if (!isNumber) {
        throw new Error('Value [ ' + value + ' ] is not number');
    }
};

Assert.isPositiveNumber = function (value) {
    "use strict";
	
    var isNumber = (_.isNumber(value)) && (!_.isNaN(value));
    var isPositiveNumber = isNumber && (value >= 0);
    
    if (!isPositiveNumber) {
        throw new Error('Value [ ' + value + ' ] is not positive number');
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
	
    var isStateValid = AssertBase.isInteger(value);
    
    if (!isStateValid) {
        throw new Error('Cell state [ ' + value + ' ] is invalid');
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

Assert.isCellBlockContainer = function (value) {
    "use strict";
    
    var isCellBlockContainer = value instanceof CellBlockContainer;
    
    if (!isCellBlockContainer) {
        throw new Error('Is not an CellBlockContainer value');
    }
};

Assert.isFunction = function (value) {
    "use strict";
    
    var isFunction = _.isFunction(value);
    
    if (!isFunction) {
        throw new Error('Is not an function');
    }
};