test("First line must be a signature", function() {
    "use strict";

	var reader = new StringArrayReader(['invalid_signature']);
	var formatReader = new Life105FormatReader();

	var result = formatReader.read(reader);	
	
	ok(result instanceof TextFormatReaderError, 'error returns');
	equal(result.line(), 0, 'error on zero line');
	equal(result.column(), 0, 'error on zero column');
});

//TODO test empty lines ignorance
