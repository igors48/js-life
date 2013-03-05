var CellBlockContainer = function (description, cellBlocks) {
    "use strict";
    
    this.init(description, cellBlocks);
}

CellBlockContainer.prototype = {

    init: function (description, cellBlocks) {
        "use strict";
    
        Assert.isArray(description);
        this._description = description;
        
        Assert.isArray(cellBlocks);
        this._cellBlocks = cellBlocks;
    },
	
	description: function() {
        "use strict";
    
		return this._description;
	},
        
	cellBlocks: function() {
        "use strict";
    
		return this._cellBlocks;
	}
        
}