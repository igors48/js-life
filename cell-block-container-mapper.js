var CellBlockContainerMapper = CellBlockContainerMapper || {};

CellBlockContainerMapper.map = function (container, cols, rows) {
	"use strict";
	
	Assert.isCellBlockContainer(container);
	Assert.isPositiveInteger(cols);
	Assert.isPositiveInteger(rows);

    var originCol = Math.floor(cols / 2);
    var originRow = Math.floor(rows / 2);
    
	var cells = [];
	
	_.each(container.cellBlocks(), 
		function (cellBlock) {
			CellBlockContainerMapper._mapCellBlock(cellBlock, originCol, originRow, cells);	
		}
	);
	
	return cells;	
};

CellBlockContainerMapper._mapCellBlock = function (cellBlock, originCol, originRow, cells) {
	"use strict";
    
	var blockOffset = cellBlock.blockOffset();
    var correctedCol = originCol + blockOffset.x();
    var correctedRow = originRow + blockOffset.y();
    
	_.each(cellBlock.cellsOffsets(),
		function (line, index) {
			CellBlockContainerMapper._mapCellLine(line, correctedCol, correctedRow + index, cells);
		}
	);
};

CellBlockContainerMapper._mapCellLine = function (cellLine, originCol, originRow, cells) {
	"use strict";
	
	_.each(cellLine,
		function (offset) {
			var x = originCol + offset;
			var y = originRow;
			
			var cell = new Coordinates(x, y);
			
			cells.push(cell);
		}
	);
};

