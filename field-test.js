test("Field one cell habitat test", function() {
    "use strict";
    var field = new Field();
    var x = 1;
    var y = 1;
    
    field.putLiveCell(x, y);
    
    var habitat = field.habitat();
    var expected = new Area(new Coordinates(x, y), new Coordinates(x, y));
    
    ok(habitat.equals(expected), "habitat == expected");
});

test("Field several cells habitat test", function() {
    "use strict";
    var field = new Field();
    var xFirst = 1;
    var yFirst = 1;
    var xSecond = 2;
    var ySecond = 2;
    var xThird = 3;
    var yThird = 5;
    
    field.putLiveCell(xFirst, yFirst);
    field.putLiveCell(xSecond, ySecond);
    field.putLiveCell(xThird, yThird);
    
    var habitat = field.habitat();
    var expected = new Area(new Coordinates(xFirst, yFirst), new Coordinates(xThird, yThird));
    
    ok(habitat.equals(expected), "habitat == expected");
});