var TextFormatReaderError = function (line, column, message) {
    "use strict";
    
	this.init(line, column, message);
}

TextFormatReaderError.prototype = {

	init: function(line, column, message) {
		"use strict";
		
		Assert.isPositiveInteger(line);
		this._line = line;
		
		Assert.isPositiveInteger(column);
		this._column = column;
		
		Assert.isString(message);
		this._message = message;
	},
	
	line: function () {
		"use strict";
		
		return this._line;	
	},
	
	column: function () {
		"use strict";
		
		return this._column;	
	},
	
	message: function () {
		"use strict";
		
		return this._message;	
	}
	
}
