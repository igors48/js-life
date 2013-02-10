var Tools = Tools || {};

Tools.containsOnlyOne = function (coordinates, neighbors) {
    var length = neighbors.length;
    var i;
    var counter = 0;
    
    for (i = 0; i < length; ++i) {

        if (i in neighbors) {
            var candidate = neighbors[i];
            
            if (coordinates.equals(candidate)) {
                ++counter;
            }
        }
    }
    
    return counter === 1;
}

