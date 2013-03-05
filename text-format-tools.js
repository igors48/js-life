var TextFormatTools = TextFormatTools || {};

TextFormatTools.parseCellBlockLine = function (line, deadChar, liveChar) {
	"use strict";
	
	Assert.isString(line);
	Assert.isOneSymbolString(deadChar);
	Assert.isOneSymbolString(liveChar);
	
	var result = [];
	var length = line.length;
	
	for (var index = 0; index < length; ++index) {
		var current = line.charAt(index);
		
		if ((current === deadChar) || (current === liveChar)) {
		
			if (current === liveChar) {
				result.push(index);
			}
		} else {
			return new TextFormatReaderError(0, index, 'Wrong char [ ' + current + ' ] in line [ ' + line + ' ]');
		}
		
	}
	
    return result;
};

TextFormatTools.parseCellBlockHeader = function(line) {
	"use strict";
	
	Assert.isString(line);
	
	var parts = line.split(' ');
	
	if (parts.length !== 3) {
		return new TextFormatReaderError(0, 0, 'Wrong cell block header [ ' + line + ' ]');
	}
	
	var offsetX = parseInt(parts[1]);
	var offsetY = parseInt(parts[2]);
	
	if (_.isNaN(offsetX) || _.isNaN(offsetY)) {
		return new TextFormatReaderError(0, 0, 'Wrong cell block header [ ' + line + ' ]');
	}
	
	var result = new Offset(offsetX, offsetY);
	
	return result;
}