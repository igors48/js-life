test("Blocks mapping test", function() {
    "use strict";

	var block = new CellBlock(new Offset(0, 0), [[0], [1]]);
	
	var container = new CellBlockContainer([], [ block ]);	
	
	var cells = CellBlockContainerMapper.map(container, 15, 16);
	
	equal(cells.length, 2, 'all blocks mapped');

	equal(cells[0].x(), 15, 'x mapped correctly');
	equal(cells[0].y(), 16, 'y mapped correctly');

	equal(cells[1].x(), 16, 'x mapped correctly');
	equal(cells[1].y(), 17, 'y mapped correctly');
});
