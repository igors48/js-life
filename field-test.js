test("Field creation test", function() {
    "use strict";
    var field = new Field();
    
    equal(field.cellCount(), 0, "Initially there is no cells");
});

test("Field putting a cell test", function() {
    "use strict";
    var field = new Field();
    var x = 1;
    var y = 1;
    
    field.putLiveCell(x, y);
    
    equal(field.cellCount(), 1, "Cells count increased");
    equal(field.cellState(x, y), 1, "Cells state set correctly");
    equal(field.cellState(x + 1, y + 1), null, "Not existent cells state returns as null");
});

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