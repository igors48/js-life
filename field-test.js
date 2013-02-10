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
    equal(field.getCellState(x, y), 1, "Cells state set correctly");
    equal(field.getCellState(x + 1, y + 1), null, "Not existent cells state returns as null");
});
