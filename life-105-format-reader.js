var Life105FormatReader = function () {
    "use strict";    
}

Life105FormatReader.prototype = {

	SIGNATURE: '#Life 1.05',
    DESCRIPTION_LINE_START: '#D',
    CELL_BLOCK_LINE_START: '#P',
    DEAD_CELL: '.',
    ALIVE_CELL: '*',
	
	read: function (reader) {
		"use strict";
    
		var signature = reader.next();
		
		if (this.SIGNATURE !== signature) {
			return new TextFormatReaderError(0, 0, 'Signature is not found');
		}
		
        this._descriptions = [];
        this._cellBlocks = [];
        
        this._resetCurrentCellBlock();
        
		var current = reader.next();
		var error = null;
        
		while((current) || (!error)) {
            
            if (current.indexOf(this.DESCRIPTION_LINE_START) === 0) {
                error = this._readAsDescriptionLine(current);
            } 
                
            if (current.indexOf(this.CELL_BLOCK_LINE_START) === 0) {
                error = this._readAsCellBlockStartLine(current);
            }

            if (current.indexOf(this.DEAD_CELL) === 0) {
                error = this._readAsCellBlockLine(current);
            }

            if (current.indexOf(this.ALIVE_CELL) === 0) {
                error = this._readAsCellBlockLine(current);
            }
            
			current = reader.next();
		}
        
        if (error) {
            return error;
        }
	},
    
    _readAsDescriptionLine: function (line) {
        this._descriptions.push(line);
        
        return null;
    },
    
	_readAsCellBlockStartLine: function (line) {
        
        if (this._currentCellBlockOffset) {
            this._closeCurrentCellBlock();
        }
        
        this._resetCurrentCellBlock();
    },
    
    _readAsCellBlockLine: function(line) {
    },
    
    _closeCurrentCellBlock: function () {
    },
    
    _resetCurrentCellBlock(): function () {
        this._currentCellBlockOffset = null;
        this._currentCellBlockCellsOffsets = null;
    }
    
}
