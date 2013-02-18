test("Initially model is empty", function() {
    "use strict";

    var model = new ToggleCellModel();
    var cells = model.cells();
    
    equal(cells.length, 0, 'No cells');    
});

test("If cell added then cell returns", function() {
    "use strict";

    var x = 48;
    var y = 49;
    
    var model = new ToggleCellModel();
    model.toggle(x, y);
    
    var cells = model.cells();
    equal(cells.length, 1, 'There is one cell');    
    
    var cell = cells[0];
    ok((new Coordinates(x, y)).equals(cell), 'Cell coordinates valid');    
});

test("If cell toggled then cell removed", function() {
    "use strict";

    var x = 48;
    var y = 49;
    
    var model = new ToggleCellModel();
    model.toggle(x, y);
    model.toggle(x, y);
    
    var cells = model.cells();
    equal(cells.length, 0, 'There is no cells');    
});


