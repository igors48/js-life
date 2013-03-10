var CellBlockContainer = function (descriptions, cellBlocks) {
    "use strict";
    
    Assert.isArray(descriptions);
    this._descriptions = descriptions;
        
    Assert.isArray(cellBlocks);
    this._cellBlocks = cellBlocks;
}

CellBlockContainer.prototype = {

	descriptions: function() {
        "use strict";
    
		return this._descriptions;
	},
        
	cellBlocks: function() {
        "use strict";
    
		return this._cellBlocks;
	}
        
}