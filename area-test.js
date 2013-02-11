test("Area creation test", function() {
    "use strict";
    
    var topLeft = new Coordinates(1, 2);
    var bottomRight = new Coordinates(3, 4);
    
    var area = new Area(topLeft, bottomRight);
    
    ok(area.topLeft().equals(topLeft), "Top left is ok");
    ok(area.bottomRight().equals(bottomRight), "Bottom right is ok");
});

test("Area equality test", function() {
    "use strict";
    
    var first = new Area(new Coordinates(1, 1), new Coordinates(2, 2));
    var second = new Area(new Coordinates(1, 1), new Coordinates(2, 2));
    var third = new Area(new Coordinates(2, 2), new Coordinates(3, 3));
    
    ok(first.equals(second), "first == second");
    ok(!first.equals(third), "first != third");
});