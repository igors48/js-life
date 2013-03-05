var StringArrayReader = function (strings) {
    "use strict";
    
	this.init(strings);
}

StringArrayReader.prototype = {

	init: function (strings) {
		"use strict";
    
		Assert.isArray(strings);
		this._strings = strings;
		
		this._current = 0;
	},
	
	next: function () {
		"use strict";
		
		var result = null;
		
		if (this._current < this._strings.length) {
			result = this._strings[this._current];
			++this._current;
		}
		
		return result;
	}
	
}
