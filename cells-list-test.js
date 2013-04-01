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

test("All added cells returns in coordinates list", function() {
    "use strict";
    
    var list = new CellsList();
    
    var xFirst = 48;
    var yFirst = 49;
    
    var xSecond = 148;
    var ySecond = 149;
    
    list.add(xFirst, yFirst);
    list.add(xSecond, ySecond);
 
    var cells = list.coordinates();
    
    equal(cells.length, 2, 'cell list length valid');
    ok(cells[0].equals(new Coordinates(xFirst, yFirst)), 'first cell valid');
    ok(cells[1].equals(new Coordinates(xSecond, ySecond)), 'second cell valid');
});

test("All added cells returns in cells list", function() {
    "use strict";
    
    var list = new CellsList();
    
    var xFirst = 48;
    var yFirst = 49;
    var valueFirst = "50";
    
    var xSecond = 148;
    var ySecond = 149;
    var valueSecond = "150";
    
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

test("Initially model is empty", function() {
    "use strict";

    var model = new CellsList();
    var cells = model.coordinates();
    
    equal(cells.length, 0, 'No cells');    
});

test("If cell added then cell returns", function() {
    "use strict";

    var x = 48;
    var y = 49;
    
    var model = new CellsList();
    var isSet = model.toggle(x, y);
    ok(isSet, 'When cell setted true returns');
    
    var cells = model.coordinates();
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
    
    var cells = model.coordinates();
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
    
    var cells = model.coordinates();
    equal(cells.length, 1, 'There is one cells');    
});

test("Add all actually added all cells from one list to another", function() {
    "use strict";

    var xFirst = 48;
    var yFirst = 49;
    
    var xSecond = 50;
    var ySecond = 51;
    
    var xThird = 52;
    var yThird = 53;
    
    var first = new CellsList();
    first.add(xFirst, yFirst);
    
    var second = new CellsList();
    second.add(xSecond, ySecond);
    second.add(xThird, yThird);

    first.addAll(second);
    
    ok(first.exists(xFirst, yFirst), "First cell present");
    ok(first.exists(xSecond, ySecond), "Second cell present");
    ok(first.exists(xThird, yThird), "Third cell present");
});

test("Retain saves element only from second list", function() {
    "use strict";
    
    var xFirst = 48;
    var yFirst = 49;
    
    var xSecond = 50;
    var ySecond = 51;
    
    var xThird = 52;
    var yThird = 53;
    
    var first = new CellsList();
    first.add(xFirst, yFirst);
    
    var second = new CellsList();
    second.add(xSecond, ySecond);
    second.add(xThird, yThird);
    
    first.retain(second);

    equal(first.cells().length, 2, "Cells count valid");    
    
    ok(first.exists(xSecond, ySecond), "Second cell present");
    ok(first.exists(xThird, yThird), "Third cell present");
});

test("Retain returns deleted elements in list", function() {
    "use strict";
    
    var xFirst = 48;
    var yFirst = 49;
    var valueFirst = "first";
    
    var xSecond = 50;
    var ySecond = 51;
    var valueSecond = "second";
    
    var xThird = 52;
    var yThird = 53;
    var valueThird = "third";
    
    var first = new CellsList();
    first.add(xFirst, yFirst, valueFirst);
    
    var second = new CellsList();
    second.add(xSecond, ySecond);
    second.add(xThird, yThird);
    
    var deleted = first.retain(second);

    equal(deleted.length, 1, "Deletes cells count valid");    
    
    ok(deleted[0].equals(new Cell(xFirst, yFirst, valueFirst)), "First element deleted");
});
