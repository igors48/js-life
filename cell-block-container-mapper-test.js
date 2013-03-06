test("Block mapping test", function() {
    "use strict";

	var block = new CellBlock(new Offset(1, 2), [[0], [1]]);
	
	var container = new CellBlockContainer([], [ block ]);	
	
	var cells = CellBlockContainerMapper.map(container, 10, 20);
	
	equal(cells.length, 2, 'all blocks mapped');

	equal(cells[0].x(), 6, 'x mapped correctly');
	equal(cells[0].y(), 12, 'y mapped correctly');

	equal(cells[1].x(), 7, 'x mapped correctly');
	equal(cells[1].y(), 13, 'y mapped correctly');
});

test("Two blocks mapping test", function() {
    "use strict";

	var firstBlock = new CellBlock(new Offset(1, 2), [[0]]);
	var secondBlock = new CellBlock(new Offset(-2, -2), [[1]]);
	
	var container = new CellBlockContainer([], [firstBlock, secondBlock]);	
	
	var cells = CellBlockContainerMapper.map(container, 10, 20);
	
	equal(cells.length, 2, 'all blocks mapped');

	equal(cells[0].x(), 6, 'x mapped correctly');
	equal(cells[0].y(), 12, 'y mapped correctly');

	equal(cells[1].x(), 4, 'x mapped correctly');
	equal(cells[1].y(), 8, 'y mapped correctly');
});
