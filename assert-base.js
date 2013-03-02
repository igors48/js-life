var AssertBase = AssertBase || {};

AssertBase.isInteger = function (value) {
    "use strict";
    
    var type = typeof value;
    var reminder = value % 1;
    var isInteger = (type === 'number' && reminder === 0);

    return isInteger;
};

AssertBase.isPositiveInteger = function (value) {
    "use strict";
    
    var isInteger = AssertBase.isInteger(value);
    var isPositive = value >= 0;
    var isPositiveInteger = isInteger && isPositive;

    return isPositiveInteger;
};

AssertBase.isOneOfThese = function (value, validValues) {
    "use strict";
    
    var length = validValues.length;
    var i;

    for (i = 0; i < length; ++i) {
  
        if (i in validValues) {
            var candidate = validValues[i];
            
            if (candidate === value) {
                return true;
            }
        }
    }
    
    return false;
};
