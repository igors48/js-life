var CellBlock = function (blockOffset, cellsOffsets) {
    "use strict";
    
    this.init(blockOffset, cellsOffsets);
}

CellBlock.prototype = {

    init: function (blockOffset, cellsOffsets) {
        "use strict";
    
        Assert.isOffset(blockOffset);
        this._blockOffset = blockOffset;
        
        Assert.isArray(cellsOffsets);
        this._cellsOffsets = cellsOffsets;
    },
	
	blockOffset: function() {
        "use strict";
    
		return this._blockOffset;
	},
        
	cellsOffsets: function() {
        "use strict";
    
		return this._cellsOffsets;
	}
        
}