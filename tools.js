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
