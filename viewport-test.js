test("ViewPort initial state test", function() {
    "use strict";

    var width = 50;
    var height = 50;
    var maxCols = 100;
    var maxRows = 100;
    var minCellSize = 0;
    var maxCellSize = 0;
    var initialCellSize = 10;
    var cellSizeStep = 0;
    
    var viewport = new ViewPort(width, height, maxCols, maxRows, minCellSize, maxCellSize, initialCellSize, cellSizeStep);
    var context = viewport.getContext();
    
    equal(context.cols, 5, "cols count is correct");
    equal(context.rows, 5, "rows count is correct");

    equal(context.top, 47, "viewport is X centered");
    equal(context.left, 47, "viewport is Y centered");
    
    equal(context.cellSize, initialCellSize, "initial cell size is correct");    
});

test("ViewPort scroll x test", function() {
    "use strict";

    var width = 50;
    var height = 50;
    var maxCols = 7;
    var maxRows = 7;
    var minCellSize = 0;
    var maxCellSize = 0;
    var initialCellSize = 10;
    var cellSizeStep = 0;
    
    var viewport = new ViewPort(width, height, maxCols, maxRows, minCellSize, maxCellSize, initialCellSize, cellSizeStep);
    
    viewport.scrollX(1);
    var context = viewport.getContext();
    
    equal(context.left, 2, "vieport moved horizontally");    
    equal(context.top, 1, "vieport did not move vertically");    

    viewport.scrollX(-1);
    context = viewport.getContext();
    
    equal(context.left, 1, "vieport moved horizontally");    
    equal(context.top, 1, "vieport did not move vertically");    
});

test("ViewPort invalid scroll x test", function() {
    "use strict";

    var width = 50;
    var height = 50;
    var maxCols = 7;
    var maxRows = 7;
    var minCellSize = 0;
    var maxCellSize = 0;
    var initialCellSize = 10;
    var cellSizeStep = 0;
    
    var viewport = new ViewPort(width, height, maxCols, maxRows, minCellSize, maxCellSize, initialCellSize, cellSizeStep);
    
    viewport.scrollX(10);
    var context = viewport.getContext();
    
    equal(context.left, 1, "vieport did not move horizontally");    
    equal(context.top, 1, "vieport did not move vertically");    

    viewport.scrollX(-10);
    context = viewport.getContext();
    
    equal(context.left, 1, "vieport did not move horizontally");    
    equal(context.top, 1, "vieport did not move vertically");    
});

test("ViewPort scroll y test", function() {
    "use strict";

    var width = 50;
    var height = 50;
    var maxCols = 7;
    var maxRows = 7;
    var minCellSize = 0;
    var maxCellSize = 0;
    var initialCellSize = 10;
    var cellSizeStep = 0;
    
    var viewport = new ViewPort(width, height, maxCols, maxRows, minCellSize, maxCellSize, initialCellSize, cellSizeStep);
    
    viewport.scrollY(1);
    var context = viewport.getContext();
    
    equal(context.left, 1, "vieport did not move horizontally");    
    equal(context.top, 2, "vieport moved vertically");    

    viewport.scrollY(-1);
    context = viewport.getContext();
    
    equal(context.left, 1, "vieport did not move horizontally");    
    equal(context.top, 1, "vieport moved vertically");    
});

test("ViewPort invalid scroll y test", function() {
    "use strict";

    var width = 50;
    var height = 50;
    var maxCols = 7;
    var maxRows = 7;
    var minCellSize = 0;
    var maxCellSize = 0;
    var initialCellSize = 10;
    var cellSizeStep = 0;
    
    var viewport = new ViewPort(width, height, maxCols, maxRows, minCellSize, maxCellSize, initialCellSize, cellSizeStep);
    
    viewport.scrollY(10);
    var context = viewport.getContext();
    
    equal(context.left, 1, "vieport did not move horizontally");    
    equal(context.top, 1, "vieport did not move vertically");    

    viewport.scrollY(-10);
    context = viewport.getContext();
    
    equal(context.left, 1, "vieport did not move horizontally");    
    equal(context.top, 1, "vieport did not move vertically");    
});
