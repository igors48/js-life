var GenerationReport = function (borningCells, dyingCells, livingCells, habitat) {
    "use strict";

    this.init(borningCells, dyingCells, livingCells, habitat);
}

GenerationReport.prototype = {

    init: function (borningCells, dyingCells, livingCells, habitat) {
        "use strict";

        this._borningCells = borningCells;
        this._dyingCells = dyingCells;
        this._livingCells = livingCells;
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