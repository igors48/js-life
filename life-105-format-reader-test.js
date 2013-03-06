test("First line must be a signature", function() {
    "use strict";

	var reader = new StringArrayReader(['invalid_signature']);
	var formatReader = new Life105FormatReader();

	var result = formatReader.read(reader);	
	
	ok(result instanceof TextFormatReaderError, 'error returns');
	equal(result.line(), 0, 'error on zero line');
	equal(result.column(), 0, 'error on zero column');
});

test("Descriptions readed", function() {
    "use strict";

	var firstDescription = 'This is some text#1';
	var secondDescription = 'This is some text#2';
	
	var reader = new StringArrayReader([
		'#Life 1.05',
		'#D ' + firstDescription,
		'#D' + secondDescription
	]);
	
	var formatReader = new Life105FormatReader();

	var result = formatReader.read(reader);	
	
	equal(result.descriptions().length, 2, 'all description readed');
	equal(result.descriptions()[0], firstDescription, 'first description is valid');
	equal(result.descriptions()[1], secondDescription, 'second description is valid');
});

test("One cell block readed", function() {
    "use strict";

	var reader = new StringArrayReader([
		'#Life 1.05',
		'#P -1 -2',
		'.*.',
		'*..'
	]);
	
	var formatReader = new Life105FormatReader();

	var result = formatReader.read(reader);	
	
	equal(result.cellBlocks().length, 1, 'one cell block readed');
	
	var firstCellBlock = result.cellBlocks()[0];
	
	TestTools.assertCellBlockParametersValid(firstCellBlock, -1, -2, [[1], [0]]);
});

test("Two cell blocks readed", function() {
    "use strict";

	var reader = new StringArrayReader([
		'#Life 1.05',
		'#P -1 -2',
		'.*.',
		'*..',
		'#P -3 -4',
		'*.*',
		'..*'
	]);
	
	var formatReader = new Life105FormatReader();

	var result = formatReader.read(reader);	
	
	equal(result.cellBlocks().length, 2, 'two cell block readed');
	
	var firstCellBlock = result.cellBlocks()[0];
	TestTools.assertCellBlockParametersValid(firstCellBlock, -1, -2, [[1], [0]]);

	var secondCellBlock = result.cellBlocks()[1];
	TestTools.assertCellBlockParametersValid(secondCellBlock, -3, -4, [[0, 2], [2]]);
});
