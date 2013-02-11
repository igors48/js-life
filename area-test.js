test("Area creation test", function() {
    "use strict";
    
    var topLeft = new Coordinates(1, 2);
    var bottomRight = new Coordinates(3, 4);
    
    var area = new Area(topLeft, bottomRight);
    
    ok(area.topLeft().equals(topLeft), "Top left is ok");
    ok(area.bottomRight().equals(bottomRight), "Bottom right is ok");
});