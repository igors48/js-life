var FieldGenerationTestTools = FieldGenerationTestTools || {};

FieldGenerationTestTools.createFieldWithHorizontalRotator = function (recalculatedCellsPerCall) {
    "use strict";
	
    var field = new Field(recalculatedCellsPerCall);

    field.putLiveCell(4, 3);
    field.putLiveCell(3, 3);
    field.putLiveCell(2, 3);
	
	return field;
};

FieldGenerationTestTools.assertIsVerticalRotator = function (cells) {
    "use strict";
	
	equal(cells.length, 3, "Three cells");
	
    ok(TestTools.containsOnlyOne(new Coordinates(3, 3), cells));
    ok(TestTools.containsOnlyOne(new Coordinates(3, 2), cells));
    ok(TestTools.containsOnlyOne(new Coordinates(3, 4), cells));	
};

FieldGenerationTestTools.assertIsHorizontalRotator = function (cells) {
    "use strict";
	
	equal(cells.length, 3, "Three cells");

    ok(TestTools.containsOnlyOne(new Coordinates(3, 3), cells));
    ok(TestTools.containsOnlyOne(new Coordinates(4, 3), cells));
    ok(TestTools.containsOnlyOne(new Coordinates(2, 3), cells));
};

test("Empty field stays empty", function() {
    "use strict";
	
    var field = new Field(100);

    field.generationNext();
	var cells = field.cells(); 
    
    equal(cells.length, 0, "No living cells");
});

test("One cell will die", function() {
    "use strict";
	
    var field = new Field(100);
    field.putLiveCell(1, 1);
  
	field.generationNext();
	var cells = field.cells(); 
    
    equal(cells.length, 0, "No living cells");
});

test("Stone will not change", function() {
    "use strict";
	
    var field = new Field(100);
    field.putLiveCell(1, 1);
    field.putLiveCell(1, 2);
    field.putLiveCell(2, 1);
    field.putLiveCell(2, 2);
  
    field.generationNext();
	var cells = field.cells(); 

    ok(TestTools.containsOnlyOne(new Coordinates(1, 1), cells));
    ok(TestTools.containsOnlyOne(new Coordinates(1, 2), cells));
    ok(TestTools.containsOnlyOne(new Coordinates(2, 1), cells));
    ok(TestTools.containsOnlyOne(new Coordinates(2, 2), cells));
});

test("Rotator is rotating", function() {
    "use strict";

	var field = FieldGenerationTestTools.createFieldWithHorizontalRotator(100);

	field.generationNext();
	var cells = field.cells(); 
	
	FieldGenerationTestTools.assertIsVerticalRotator(cells);
	
	field.generationNext();
	cells = field.cells(); 

	FieldGenerationTestTools.assertIsHorizontalRotator(cells);
});

test("Rotator in breakable iteration", function() {
    "use strict";

	var field = FieldGenerationTestTools.createFieldWithHorizontalRotator(2);

	var completed = field.generationNext();
    ok(!completed, "Recalculation is not completed");

	completed = field.generationNext();
    ok(completed, "Recalculation is completed");
	
	var cells = field.cells(); 
	
	FieldGenerationTestTools.assertIsVerticalRotator(cells);
	
	completed = field.generationNext();
    ok(!completed, "Recalculation is not completed");

	completed = field.generationNext();
    ok(completed, "Recalculation is completed");

	cells = field.cells(); 
	
	FieldGenerationTestTools.assertIsHorizontalRotator(cells);
});

