var KineticEditor = function (container, width, height, rows, cols) {
    "use strict";
    
    this.init(container, width, height, rows, cols);
}

KineticEditor.prototype = {

    CELL_SIZE: 15,
    
    init: function (container, width, height, rows, cols) {
        "use strict";
        
        var stage = new Kinetic.Stage({
            container: container,
            width: width,
            height: height
        });

        var layer = new Kinetic.Layer();
        
        var background = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: width,
            height: height,
            fill: 'gray'
        });
        layer.add(background);
        
        for (var row = 1; row <= rows; ++row) {
        
            for (var col = 1; col <= cols; ++col) {
                
                var cell = new Kinetic.Circle({
                    x: col * this.CELL_SIZE,
                    y: row * this.CELL_SIZE,
                    width: this.CELL_SIZE,
                    height: this.CELL_SIZE,
                    fill: 'silver'
                });

                cell.on('click', (function(){
                    var color = 'silver';
                    var that = cell;
                    var cellRow = row;
                    var cellCol = col;
        
                    var func = function() {
                        color = color === 'silver' ? 'green' : 'silver';
                        that.setFill(color);
                        layer.draw();
                        alert(cellRow + ' ' + cellCol);
                    }
        
                    return func;
                })());
                
                layer.add(cell);
            }
        }
      
        stage.add(layer);
    }
    
};

