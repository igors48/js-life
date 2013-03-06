test("Empty field stays empty", function() {
    "use strict";
    var field = new Field();
    
    var generationReport = field.generationNext();
    
    equal(generationReport.livingCells().length, 0, "No living cells");
    equal(generationReport.dyingCells().length, 0, "No dying cells");
    equal(generationReport.borningCells().length, 0, "No borning cells");
});

test("One cell will die", function() {
    "use strict";
    var field = new Field();
    field.putLiveCell(1, 1);
    
    var generationReport = field.generationNext();
    
    equal(generationReport.livingCells().length, 0, "No living cells");
    equal(generationReport.dyingCells().length, 1, "One dying cell");
    equal(generationReport.borningCells().length, 0, "No borning cells");
});

test("Stone will not change", function() {
    "use strict";
    var field = new Field();
    field.putLiveCell(1, 1);
    field.putLiveCell(1, 2);
    field.putLiveCell(2, 1);
    field.putLiveCell(2, 2);
    
    var generationReport = field.generationNext();
    
    equal(generationReport.livingCells().length, 4, "Four living cells");
    equal(generationReport.dyingCells().length, 0, "No dying cell");
    equal(generationReport.borningCells().length, 0, "No borning cells");
    
    ok(TestTools.containsOnlyOne(new Coordinates(1, 1), generationReport.livingCells()));
    ok(TestTools.containsOnlyOne(new Coordinates(1, 2), generationReport.livingCells()));
    ok(TestTools.containsOnlyOne(new Coordinates(2, 1), generationReport.livingCells()));
    ok(TestTools.containsOnlyOne(new Coordinates(2, 2), generationReport.livingCells()));
});

test("Rotator is rotating", function() {
    "use strict";
    var field = new Field();
    field.putLiveCell(4, 3);
    field.putLiveCell(3, 3);
    field.putLiveCell(2, 3);
    
    var generationReport = field.generationNext();
    var livingCells = generationReport.livingCells();
    var dyingCells = generationReport.dyingCells();
    var borningCells = generationReport.borningCells();
    
    equal(livingCells.length, 1, "Three living cells");
    equal(dyingCells.length, 2, "Two dying cell");
    equal(borningCells.length, 2, "Two borning cells");

    ok(TestTools.containsOnlyOne(new Coordinates(3, 3), livingCells));
    
    ok(TestTools.containsOnlyOne(new Coordinates(3, 2), borningCells));
    ok(TestTools.containsOnlyOne(new Coordinates(3, 4), borningCells));

    ok(TestTools.containsOnlyOne(new Coordinates(4, 3), dyingCells));
    ok(TestTools.containsOnlyOne(new Coordinates(2, 3), dyingCells));

    generationReport = field.generationNext();
    livingCells = generationReport.livingCells();
    dyingCells = generationReport.dyingCells();
    borningCells = generationReport.borningCells();
    
    equal(generationReport.livingCells().length, 1, "Three living cells");
    equal(generationReport.dyingCells().length, 2, "Two dying cell");
    equal(generationReport.borningCells().length, 2, "Two borning cells");

    ok(TestTools.containsOnlyOne(new Coordinates(3, 3), livingCells));
    
    ok(TestTools.containsOnlyOne(new Coordinates(3, 2), dyingCells));
    ok(TestTools.containsOnlyOne(new Coordinates(3, 4), dyingCells));

    ok(TestTools.containsOnlyOne(new Coordinates(4, 3), borningCells));
    ok(TestTools.containsOnlyOne(new Coordinates(2, 3), borningCells));
});

