test("Coordinates creation test", function() {
    "use strict";
    
    var x = 1;
    var y = 2;
    
    var coordinates = new Coordinates(x, y);
    
    equal(coordinates.x(), x, "X set correctly" );
    equal(coordinates.y(), y, "Y set correctly" );
});

test("Coordinates equality test", function() {
    "use strict";
    
    var x = 1;
    var y = 2;
    
    var first = new Coordinates(x, y);
    var second = new Coordinates(x, y);
    var third = new Coordinates(x + 1, y);
    var fourth = new Coordinates(x, y + 1);
    
    ok(first.equals(second), "first == second" );
    ok(!first.equals(third), "first != third" );
    ok(!first.equals(fourth), "first != fourth" );
});