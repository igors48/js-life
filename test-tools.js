var TestTools = TestTools || {};

TestTools.containsOnlyOne = function (coordinates, cells) {
    var counter = 0;
    
	_.each(cells,
		function (candidate) {

			if (coordinates.equals(candidate)) {
                ++counter;
            }
		}
	);
	
    return counter === 1;
}

TestTools.assertCellBlockParametersValid = function (cellBlock, offsetX, offsetY, lineOffsets) {

	equal(cellBlock.blockOffset().x(), offsetX, 'block offset x is valid');
	equal(cellBlock.blockOffset().y(), offsetY, 'block offset y is valid');

	_.each(lineOffsets,
		function (line, index) {
			var blockLine = cellBlock.cellsOffsets()[index];
			TestTools.asserttArraysAreEqual(blockLine, line);
		}
	);
}

TestTools.asserttArraysAreEqual = function (first, second) {
	
	_.each(first,
		function (value, index) {
			equal(value, second[index], 'Elements at index [ ' + index + ' ] are not equals');
		}
	);
}