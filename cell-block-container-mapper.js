var CellBlockContainerMapper = CellBlockContainerMapper || {};

CellBlockContainerMapper.map = function (container, originCol, originRow) {
	"use strict";
	
	Assert.isCellBlockContainer(container);
	Assert.isPositiveInteger(originCol);
	Assert.isPositiveInteger(originRow);

	var cells = [];
	//var that = this;
	
	_.each(container.cellBlocks(), 
		function (cellBlock) {
			CellBlockContainerMapper._mapCellBlock(cellBlock, originCol, originRow, cells);	
		}
	);
	
	return cells;	
};

CellBlockContainerMapper._mapCellBlock = function (cellBlock, originCol, originRow, cells) {
	"use strict";
	
	_.each(cellBlock.cellsOffsets(),
		function (line, index) {
			CellBlockContainerMapper._mapCellLine(line, originCol, originRow + index, cells);
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

