var GenerationReport = function (borningCells, dyingCells, livingCells, habitat) {
    "use strict";

    this.init(borningCells, dyingCells, livingCells, habitat);
}

GenerationReport.prototype = {

    init: function (borningCells, dyingCells, livingCells, habitat) {
        "use strict";

        Assert.isArray(borningCells);
        this._borningCells = borningCells;

        Assert.isArray(dyingCells);
        this._dyingCells = dyingCells;

        Assert.isArray(livingCells);
        this._livingCells = livingCells;
        
        Assert.isArea(habitat);
        this._habitat = habitat;
    },
    
    borningCells: function () {
        "use strict";

        return this._borningCells;
    },

    dyingCells: function () {
        "use strict";

        return this._dyingCells;
    },

    livingCells: function () {
        "use strict";

        return this._livingCells;
    },

    habitat: function () {
        "use strict";

        return this._habitat;
    }
    
}