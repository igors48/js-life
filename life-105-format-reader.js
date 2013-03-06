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
        
		while((current) && (!error)) {
            current = _.str.trim(current);
			
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

        this._closeCurrentCellBlock();
		
		var cellBlockContainer = new CellBlockContainer(this._descriptions, this._cellBlocks);
		
		return cellBlockContainer;
	},
    
    _readAsDescriptionLine: function (line) {
		var description = line.substring(this.DESCRIPTION_LINE_START.length);
		description = _.str.trim(description);
		
        this._descriptions.push(description);
        
        return null;
    },
    
	_readAsCellBlockStartLine: function (line) {
        this._closeCurrentCellBlock();
        this._resetCurrentCellBlock();
		
		var cellBlockOffset = TextFormatTools.parseCellBlockHeader(line);

		if (cellBlockOffset instanceof TextFormatReaderError) {
			return cellBlockOffset;
		}
		
		this._currentCellBlockOffset = cellBlockOffset;
		
		return null;
    },
    
    _readAsCellBlockLine: function(line) {
		var cellOffsets = TextFormatTools.parseCellBlockLine(line, this.DEAD_CELL, this.ALIVE_CELL);
		
		if (cellOffsets instanceof TextFormatReaderError) {
			return cellOffsets;
		}
		
		this._currentCellBlockCellsOffsets.push(cellOffsets);
		
		return null;
    },
    
    _closeCurrentCellBlock: function () {
        
		if (this._currentCellBlockCellsOffsets.length !== 0) {
			var newCellBlock = new CellBlock(this._currentCellBlockOffset, this._currentCellBlockCellsOffsets);
		
			this._cellBlocks.push(newCellBlock);
		}
    },
    
    _resetCurrentCellBlock: function () {
        this._currentCellBlockOffset = new Offset(0, 0);
        this._currentCellBlockCellsOffsets = [];
    }
    
}
