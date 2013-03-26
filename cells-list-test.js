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

test("All added cells returns in list", function() {
    "use strict";
    
    var list = new CellsList();
    
    var xFirst = 48;
    var yFirst = 49;
    
    var xSecond = 148;
    var ySecond = 149;
    
    list.add(xFirst, yFirst);
    list.add(xSecond, ySecond);
 
    var cells = list.cells();
    
    equal(cells.length, 2, 'cell list length valid');
    ok(cells[0].equals(new Coordinates(xFirst, yFirst)), 'first cell valid');
    ok(cells[1].equals(new Coordinates(xSecond, ySecond)), 'second cell valid');
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

test("Initially model is empty", function() {
    "use strict";

    var model = new CellsList();
    var cells = model.cells();
    
    equal(cells.length, 0, 'No cells');    
});

test("If cell added then cell returns", function() {
    "use strict";

    var x = 48;
    var y = 49;
    
    var model = new CellsList();
    var isSet = model.toggle(x, y);
    ok(isSet, 'When cell setted true returns');
    
    var cells = model.cells();
    equal(cells.length, 1, 'There is one cell');    
    
    var cell = cells[0];
    ok((new Coordinates(x, y)).equals(cell), 'Cell coordinates valid');    
});

test("If cell added then cell returns", function() {
    "use strict";

    var x = 48;
    var y = 49;
    
    var model = new CellsList();
    model.add(x, y);
    
    var cells = model.cells();
    equal(cells.length, 1, 'There is one cell');    
    
    var cell = cells[0];
    ok((new Coordinates(x, y)).equals(cell), 'Cell coordinates valid');    
});

test("If cell toggled then cell removed", function() {
    "use strict";

    var xFirst = 48;
    var yFirst = 49;
    
    var xSecond = 50;
    var ySecond = 51;
    
    var model = new CellsList();

    model.toggle(xFirst, yFirst);
    model.toggle(xSecond, ySecond);
    var isSet = model.toggle(xFirst, yFirst);
    ok(!isSet, 'When cell cleared false returns');
    
    var cells = model.cells();
    equal(cells.length, 1, 'There is one cells');    
});
