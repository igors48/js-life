var BreakableRendererTestTools = BreakableRendererTestTools || {};

BreakableRendererTestTools.createModel = function () {
    "use strict";
    
    return [new Coordinates(48, 48), new Coordinates(48, 48), new Coordinates(48, 48), new Coordinates(48, 48), new Coordinates(48, 48)];
};
    
BreakableRendererTestTools.assertModelPainted = function (renderer, painter) {
    "use strict";
    
    var completed = renderer.render();
    var paintedCellCount = painter.getPaintedCellCount();
    
    ok(!completed, "Painting is not completed");
    ok(!renderer.complete(), "Painting is not completed");
    equal(paintedCellCount, 2, "Painted cell count is valid");

    completed = renderer.render();
    paintedCellCount = painter.getPaintedCellCount();
    
    ok(!completed, "Painting is not completed");
    ok(!renderer.complete(), "Painting is not completed");
    equal(paintedCellCount, 4, "Painted cell count is valid");

    completed = renderer.render();
    paintedCellCount = painter.getPaintedCellCount();
    
    ok(completed, "Painting is completed");
    ok(renderer.complete(), "Painting is completed");
    equal(paintedCellCount, 5, "Painted cell count is valid");
};    

test("Empty model does not draw", function() {
    "use strict";
    
    var painter = new PainterStub();
    var renderer = new BreakableRenderer(4, painter);
    
    var completed = renderer.render();
    var paintedCellCount = painter.getPaintedCellCount();
    
    ok(completed, "Draw completed after first call");
    equal(paintedCellCount, 0, "No cell was painted");
});

test("When new model replaced painter cleared", function() {
    "use strict";
    
    var painter = new PainterStub();
    var renderer = new BreakableRenderer(4, painter);
    
    var model = [new Coordinates(48, 48)];
    renderer.replaceModel(model);
    
    var cleared = painter.isCleared();
    
    ok(cleared, "Painter was cleared");
});

test("Restarting renderer cleared painter", function() {
    "use strict";
    
    var painter = new PainterStub();
    var renderer = new BreakableRenderer(4, painter);
    
    renderer.restart();
    
    var cleared = painter.isCleared();
    
    ok(cleared, "Painter was cleared");
});

test("Painting process breaks into parts", function() {
    "use strict";
    
    var painter = new PainterStub();
    var renderer = new BreakableRenderer(2, painter);
    
    var model = BreakableRendererTestTools.createModel();
    renderer.replaceModel(model);

    BreakableRendererTestTools.assertModelPainted(renderer, painter);
});

test("Painting process really restarted", function() {
    "use strict";
    
    var painter = new PainterStub();
    var renderer = new BreakableRenderer(2, painter);
    
    var model = BreakableRendererTestTools.createModel();
    renderer.replaceModel(model);

    var completed = renderer.render();
    var paintedCellCount = painter.getPaintedCellCount();
    
    ok(!completed, "Painting is not completed");
    equal(paintedCellCount, 2, "Painted cell count is valid");

    renderer.restart();
    
    BreakableRendererTestTools.assertModelPainted(renderer, painter);
});


