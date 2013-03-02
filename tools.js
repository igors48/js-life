var Tools = Tools || {};

Tools.containsOnlyOne = function (coordinates, cells) {
    var length = cells.length;
    var i;
    var counter = 0;
    
    for (i = 0; i < length; ++i) {

        if (i in cells) {
            var candidate = cells[i];
            
            if (coordinates.equals(candidate)) {
                ++counter;
            }
        }
    }
    
    return counter === 1;
}

Tools.iterate = function (items, action) {
    var length = items.length;
    var index = 0;
    
    for (index = 0; index < length; ++i) {

        if (index in items) {
            var current = cells[index];
            action(current);
        }
    }    
}

