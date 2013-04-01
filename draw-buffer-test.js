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

test("Currently not drawn object must be removed", function() {
    "use strict";
    
    var buffer = new DrawBuffer();
    
    var xFirst = 48;
    var yFirst = 49;
    var objectFirst = '52';
    
    buffer.drawn(xFirst, yFirst, objectFirst);
    buffer.commit();
    
    var xSecond = 148;
    var ySecond = 149;
    var objectSecond = '152';

    var drawn = buffer.drawn(xSecond, ySecond, objectSecond);
    var deleted = buffer.commit();
    
    equal(deleted.length, 1, "length valid");
    
    ok(deleted[0].equals(new Cell(xFirst, yFirst, objectFirst)), "Deleted cell valid");
});

test("After restart currently drawn object added to previous drawn objects", function() {
    "use strict";
    
    var buffer = new DrawBuffer();
    
    var xFirst = 48;
    var yFirst = 49;
    var objectFirst = '52';
    
    buffer.drawn(xFirst, yFirst, objectFirst);
    buffer.commit();
    
    var xSecond = 148;
    var ySecond = 149;
    var objectSecond = '152';

    buffer.drawn(xSecond, ySecond, objectSecond);
    buffer.restart();
    
    ok(buffer.drawn(xFirst, yFirst, objectFirst), "First cell drawn");
    ok(buffer.drawn(xSecond, ySecond, objectSecond), "Second cell drawn");
});
