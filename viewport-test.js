test("ViewPort initial state test", function() {
    "use strict";

    var width = 50;
    var height = 50;
    var maxCols = 100;
    var maxRows = 100;
    var minCellSize = 0;
    var maxCellSize = 0;
    var initialCellSize = 10;
    
    var viewport = new ViewPort(width, height, maxCols, maxRows, minCellSize, maxCellSize, initialCellSize);
    
    equal(viewport.getCols(), 5, "cols count is correct");
    equal(viewport.getRows(), 5, "rows count is correct");

    equal(viewport.getTop(), 47, "viewport is X centered");
    equal(viewport.getLeft(), 47, "viewport is Y centered");
    
    equal(viewport.getCellSize(), initialCellSize, "initial cell size is correct");    
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
    
    var viewport = new ViewPort(width, height, maxCols, maxRows, minCellSize, maxCellSize, initialCellSize);
    
    viewport.scrollX(1);
    
    equal(viewport.getLeft(), 2, "vieport moved horizontally");    
    equal(viewport.getTop(), 1, "vieport did not move vertically");    

    viewport.scrollX(-1);
    
    equal(viewport.getLeft(), 1, "vieport moved horizontally");    
    equal(viewport.getTop(), 1, "vieport did not move vertically");    
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
    
    var viewport = new ViewPort(width, height, maxCols, maxRows, minCellSize, maxCellSize, initialCellSize);
    
    viewport.scrollX(10);
    
    equal(viewport.getLeft(), 1, "vieport did not move horizontally");    
    equal(viewport.getTop(), 1, "vieport did not move vertically");    

    viewport.scrollX(-10);
    
    equal(viewport.getLeft(), 1, "vieport did not move horizontally");    
    equal(viewport.getTop(), 1, "vieport did not move vertically");    
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
    
    var viewport = new ViewPort(width, height, maxCols, maxRows, minCellSize, maxCellSize, initialCellSize);
    
    viewport.scrollY(1);
    
    equal(viewport.getLeft(), 1, "vieport did not move horizontally");    
    equal(viewport.getTop(), 2, "vieport moved vertically");    

    viewport.scrollY(-1);
    
    equal(viewport.getLeft(), 1, "vieport did not move horizontally");    
    equal(viewport.getTop(), 1, "vieport moved vertically");    
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
    
    var viewport = new ViewPort(width, height, maxCols, maxRows, minCellSize, maxCellSize, initialCellSize);
    
    viewport.scrollY(10);
    
    equal(viewport.getLeft(), 1, "vieport did not move horizontally");    
    equal(viewport.getTop(), 1, "vieport did not move vertically");    

    viewport.scrollY(-10);
    
    equal(viewport.getLeft(), 1, "vieport did not move horizontally");    
    equal(viewport.getTop(), 1, "vieport did not move vertically");    
});

test("ViewPort to Global coordinate conversion test", function() {
    "use strict";

    var width = 50;
    var height = 50;
    var maxCols = 7;
    var maxRows = 7;
    var minCellSize = 0;
    var maxCellSize = 0;
    var initialCellSize = 10;
    
    var viewport = new ViewPort(width, height, maxCols, maxRows, minCellSize, maxCellSize, initialCellSize);

    var viewPortCoordinates = new Coordinates(1, 2);
    var globalCoordinates = viewport.toGlobal(viewPortCoordinates);
    
    equal(globalCoordinates.x(), 2, "Global x is correct"); 
    equal(globalCoordinates.y(), 3, "Global y is correct"); 
});

test("ViewPort to View cell coordinate conversion test", function() {
    "use strict";

    var width = 50;
    var height = 50;
    var maxCols = 7;
    var maxRows = 7;
    var minCellSize = 0;
    var maxCellSize = 0;
    var initialCellSize = 10;
    
    var viewport = new ViewPort(width, height, maxCols, maxRows, minCellSize, maxCellSize, initialCellSize);

    var layerCoordinates = new Coordinates(0, 0);
    var viewCellCoordinates = viewport.toViewCell(layerCoordinates);
    
    equal(viewCellCoordinates.x(), 0, "view cell x is correct"); 
    equal(viewCellCoordinates.y(), 0, "view cell y is correct"); 

    layerCoordinates = new Coordinates(width - 1, height - 1);
    viewCellCoordinates = viewport.toViewCell(layerCoordinates);
    
    equal(viewCellCoordinates.x(), 4, "view cell x is correct"); 
    equal(viewCellCoordinates.y(), 4, "view cell y is correct"); 
});

test("Global to ViewPort coordinate conversion test", function() {
    "use strict";

    var width = 50;
    var height = 50;
    var maxCols = 7;
    var maxRows = 7;
    var minCellSize = 0;
    var maxCellSize = 0;
    var initialCellSize = 10;
    
    var viewport = new ViewPort(width, height, maxCols, maxRows, minCellSize, maxCellSize, initialCellSize);

    var globalCoordinates = new Coordinates(2, 3);
    var viewPortCoordinates = viewport.toViewPort(globalCoordinates);
    
    equal(viewPortCoordinates.x(), 1, "ViewPort x is correct"); 
    equal(viewPortCoordinates.y(), 2, "ViewPort y is correct"); 
    
    var outOfViewPortGlobalCoordinates = new Coordinates(6, 6);
    var outOfViewPortCoordinates = viewport.toViewPort(outOfViewPortGlobalCoordinates);
    
    ok(outOfViewPortCoordinates == null, "if Global coordinates is out of ViewPort then null returns")
});

test("ViewPort corner points test", function() {
    "use strict";

    var width = 50;
    var height = 50;
    var maxCols = 7;
    var maxRows = 7;
    var minCellSize = 0;
    var maxCellSize = 0;
    var initialCellSize = 10;
    
    var viewport = new ViewPort(width, height, maxCols, maxRows, minCellSize, maxCellSize, initialCellSize);

    var leftTopGlobal = new Coordinates(1, 1);
    var leftTopViewPort = viewport.toViewPort(leftTopGlobal);
    
    equal(leftTopViewPort.x(), 0, "ViewPort left top x is correct"); 
    equal(leftTopViewPort.y(), 0, "ViewPort left top y is correct");   

    var rightTopGlobal = new Coordinates(5, 1);
    var rightTopViewPort = viewport.toViewPort(rightTopGlobal);
    
    equal(rightTopViewPort.x(), 4, "ViewPort right top x is correct"); 
    equal(rightTopViewPort.y(), 0, "ViewPort right top y is correct"); 
    
    var leftBottomGlobal = new Coordinates(1, 5);
    var leftBottomViewPort = viewport.toViewPort(leftBottomGlobal);
    
    equal(leftBottomViewPort.x(), 0, "ViewPort left bottom x is correct"); 
    equal(leftBottomViewPort.y(), 4, "ViewPort left bottom y is correct");   

    var rightBottomGlobal = new Coordinates(5, 5);
    var rightBottomViewPort = viewport.toViewPort(rightBottomGlobal);
    
    equal(rightBottomViewPort.x(), 4, "ViewPort right bottom x is correct"); 
    equal(rightBottomViewPort.y(), 4, "ViewPort right bottom y is correct");   
});

test("ViewPort zoom test", function() {
    "use strict";

    var width = 50;
    var height = 50;
    var maxCols = 7;
    var maxRows = 7;
    var minCellSize = 1;
    var maxCellSize = 3;
    var initialCellSize = 2;
    
    var viewport = new ViewPort(width, height, maxCols, maxRows, minCellSize, maxCellSize, initialCellSize);

    viewport.zoom(-1);
    
    equal(viewport.getCellSize(), 1, "cell size decreased");

    viewport.zoom(-1);
    
    equal(viewport.getCellSize(), 1, "cell size can not be lesser than minimum");

    viewport.zoom(2);
    
    equal(viewport.getCellSize(), 3, "cell size increased");

    viewport.zoom(1);
    
    equal(viewport.getCellSize(), 3, "cell size can not be greater than maximum");
});

