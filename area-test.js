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

test("Area width and height calculation test", function() {
    "use strict";
    
    var area = new Area(new Coordinates(5, 3), new Coordinates(8, 10));
    
    var width = area.width();
    var height = area.height();
    
    equal(width, 3, "width valid");
    equal(height, 7, "height valid");
});

test("Area center calculation test", function() {
    "use strict";
    
    var area = new Area(new Coordinates(5, 3), new Coordinates(8, 10));
    
    var center = area.center();
    
    equal(center.x(), 6, "center x valid");
    equal(center.y(), 6, "center y valid");
});
