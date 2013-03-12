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

test("Area shrink test", function() {
    "use strict";
    
    var area = new Area(new Coordinates(1, 1), new Coordinates(2, 2));
    var shrinked = area.shrink();
    
    var expected = new Area(new Coordinates(0, 0), new Coordinates(3, 3));
    
    ok(shrinked.equals(expected), "shrinked == expected");
});

test("Area shrink near border test", function() {
    "use strict";
    
    var area = new Area(new Coordinates(0, 0), new Coordinates(2, 2));
    var shrinked = area.shrink();
    
    var expected = new Area(new Coordinates(0, 0), new Coordinates(3, 3));
    
    ok(shrinked.equals(expected), "shrinked == expected");
});

test("Area width and height calculation test", function() {
    "use strict";
    
    var area = new Area(new Coordinates(5, 3), new Coordinates(8, 10));
    
    var width = area.width();
    var height = area.height();
    
    equal(width, 3, "width valid");
    equal(height, 7, "height valid");
});
