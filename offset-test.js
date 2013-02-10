test("Offset creation test", function() {
    "use strict";
    
    var x = 1;
    var y = -1;
    
    var offset = new Offset(x, y);
    
    equal(offset.x(), x, "X set correctly" );
    equal(offset.y(), y, "Y set correctly" );
});
