test("Cell creation test", function() {
    "use strict";
    
    var x = 1;
    var y = 2;
    var state = 1;
    
    var cell = new Cell(x, y, state);
    
    equal(cell.coordinates().x(), x, "X set correctly" );
    equal(cell.coordinates().y(), y, "Y set correctly" );
    equal(cell.state(), state, "State set correctly" );
});
