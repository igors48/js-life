test("After creation list cell is empty", function() {
    "use strict";
    
    var list = new CellsList();
    
    equal(list.count(), 0, 'cells count increased')
});

test("Adding cell to list", function() {
    "use strict";
    
    var list = new CellsList();
    
    var x = 48;
    var y = 49;
    
    ok(!list.exists(x, y), 'cell not exists');

    list.add(x, y);
    
    ok(list.exists(x, y), 'cell exists');
    equal(list.count(), 1, 'cells count increased')
});

test("Remove cell from list", function() {
    "use strict";
    
    var list = new CellsList();
    
    var x = 48;
    var y = 49;
    
    list.add(x, y);
    list.remove(x, y);
    
    ok(!list.exists(x, y), 'cell not exists');
    equal(list.count(), 0, 'cells count decreased')
});

test("Add existing cell to list", function() {
    "use strict";
    
    var list = new CellsList();
    
    var x = 48;
    var y = 49;
    
    list.add(x, y);
    list.add(x, y);
    
    ok(list.exists(x, y), 'cell exists');
    equal(list.count(), 1, 'cells count does not change')
});

test("Remove cell from list", function() {
    "use strict";
    
    var list = new CellsList();
    
    var x = 48;
    var y = 49;
    
    list.add(x, y);
    list.remove(x + 1, y);
    
    ok(!list.exists(x + 1, y), 'cell not exists');
    equal(list.count(), 1, 'cells count does not change')
});

test("Habitat calculation", function() {
    "use strict";
    
    var list = new CellsList();
    
    var xFirst = 48;
    var yFirst = 49;
    var xSecond = 148;
    var ySecond = 149;
    
    list.add(xFirst, yFirst);
    list.add(xSecond, ySecond);

    var actual = list.habitat();    
    var expected = new Area(new Coordinates(xFirst, yFirst), new Coordinates(xSecond, ySecond));    
    ok(actual.equals(expected), 'habitat is valid');
});

test("All added cells returns in list", function() {
    "use strict";
    
    var list = new CellsList();
    
    var xFirst = 48;
    var yFirst = 49;
    var valueFirst = 349;
    
    var xSecond = 148;
    var ySecond = 149;
    var valueSecond = 749;
    
    list.add(xFirst, yFirst, valueFirst);
    list.add(xSecond, ySecond, valueSecond);
 
    var cells = list.cells();
    
    equal(cells.length, 2, 'cell list length valid');
    ok(cells[0].equals(new Cell(xFirst, yFirst, valueFirst)), 'first cell valid');
    ok(cells[1].equals(new Cell(xSecond, ySecond, valueSecond)), 'second cell valid');
});

test("Add and get value test", function() {
    "use strict";
    
    var list = new CellsList();
    
    var x = 48;
    var y = 49;
    var value = 148;
    
    list.add(x, y, value);
 
    var restored = list.get(x, y);
    
    equal(restored, value, 'restored value valid');
    
    var notExists = list.get(x + 1, y);

    equal(notExists, null, 'not existent value reaturns as null');    
});

