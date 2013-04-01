test("After clearing everything must be redrawn", function() {
    "use strict";
    
    var buffer = new DrawBuffer();
    
    var x = 48;
    var y = 49;
    var object = '52';
    
    buffer.drawn(x, y, object);
    
    buffer.clear();
    
    var drawn = buffer.drawn(x, y, object);
    
    ok(!drawn, "not drawn");
});

test("No need to draw same object twice", function() {
    "use strict";
    
    var buffer = new DrawBuffer();
    
    var x = 48;
    var y = 49;
    var object = '52';
    
    buffer.drawn(x, y, object);
    buffer.commit();
    
    var drawn = buffer.drawn(x, y, object);
    
    ok(drawn, "drawn");
});


// currently not drawn object must be removed
// after restart currently drawn object added to previous drawn objects