//TODO check cells coordinates

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
});

test("Rotator is rotating", function() {
    "use strict";
    var field = new Field();
    field.putLiveCell(4, 3);
    field.putLiveCell(3, 3);
    field.putLiveCell(2, 3);
    
    var generationReport = field.generationNext();
    
    equal(generationReport.livingCells().length, 1, "Three living cells");
    equal(generationReport.dyingCells().length, 2, "Two dying cell");
    equal(generationReport.borningCells().length, 2, "Two borning cells");

    generationReport = field.generationNext();
    
    equal(generationReport.livingCells().length, 1, "Three living cells");
    equal(generationReport.dyingCells().length, 2, "Two dying cell");
    equal(generationReport.borningCells().length, 2, "Two borning cells");
});

