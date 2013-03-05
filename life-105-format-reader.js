var Life105FormatReader = function () {
    "use strict";
    
}

Life105FormatReader.prototype = {

	SIGNATURE: '#Life 1.05',
	
	read: function (reader) {
		"use strict";
    
		var signature = reader.next();
		
		if (this.SIGNATURE !== signature) {
			return new TextFormatReaderError(0, 0, 'Signature is not found');
		}
		
		var current = reader.next();
		
		while(!_.isNull(current)) {
		
			current = reader.next();
		}
	}
	
}
