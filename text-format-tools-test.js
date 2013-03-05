test("Empty line does not contains live cells", function() {
    "use strict";

	var offsets = TextFormatTools.parseCellBlockLine('', '.', '*');	
	
	equal(offsets.length, 0, 'result is empty');
});

test("Wrong symbol causes an error", function() {
    "use strict";

	var offsets = TextFormatTools.parseCellBlockLine('.*2*.', '.', '*');	
	
	ok(offsets instanceof TextFormatReaderError, 'error returns');
});

test("Live cell counts", function() {
    "use strict";

	var offsets = TextFormatTools.parseCellBlockLine('*.*.*', '.', '*');	
	
	equal(offsets.length, 3, 'all live cells counted');
	equal(offsets[0], 0, 'first cells correct');
	equal(offsets[1], 2, 'second cells correct');
	equal(offsets[2], 4, 'third cells correct');
});

test("Cell block header must contains three space separated tokens only", function() {
    "use strict";

	var header = TextFormatTools.parseCellBlockHeader('#P -1 -1 -1');	
	
	ok(header instanceof TextFormatReaderError, 'error returns');
});

test("Valid cell block header parsed correctly", function() {
    "use strict";

	var header = TextFormatTools.parseCellBlockHeader('#P -1 4');	
	
	equal(header.x(), -1, 'x offset is valid');
	equal(header.y(), 4, 'y offset is valid');
});

test("Invalid offsets in cell block header causes an error", function() {
    "use strict";

	var header = TextFormatTools.parseCellBlockHeader('#P a 4');	
	
	ok(header instanceof TextFormatReaderError, 'error returns');
});

