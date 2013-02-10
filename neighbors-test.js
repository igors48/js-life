test("Neighbors coordinates calculation test", function() {
    "use strict";
    
    var origin = new Coordinates(5, 5);
    var neighbors = Neighbors.getNeighbors(origin);

    equal(neighbors.length, 8, "Neighbors count is correct");
    
    ok(Tools.containsOnlyOne(new Coordinates(4, 4), neighbors), "-1 -1 neighbor present");
    ok(Tools.containsOnlyOne(new Coordinates(5, 4), neighbors), "0 -1 neighbor present");
    ok(Tools.containsOnlyOne(new Coordinates(6, 4), neighbors), "+1 -1 neighbor present");
    ok(Tools.containsOnlyOne(new Coordinates(4, 5), neighbors), "-1 0 neighbor present");
    ok(Tools.containsOnlyOne(new Coordinates(6, 5), neighbors), "+1 0 neighbor present");
    ok(Tools.containsOnlyOne(new Coordinates(4, 6), neighbors), "-1 +1 neighbor present");
    ok(Tools.containsOnlyOne(new Coordinates(5, 6), neighbors), "0 +1 neighbor present");
    ok(Tools.containsOnlyOne(new Coordinates(6, 6), neighbors), "+1 +1 neighbor present");
});

test("Neighbors coordinates calculation test for top left corner", function() {
    "use strict";
    
    var origin = new Coordinates(0, 0);
    var neighbors = Neighbors.getNeighbors(origin);

    equal(neighbors.length, 3, "Neighbors count is correct");
    
    ok(Tools.containsOnlyOne(new Coordinates(0, 1), neighbors), "0 +1 neighbor present");
    ok(Tools.containsOnlyOne(new Coordinates(1, 1), neighbors), "+1 +1 neighbor present");
    ok(Tools.containsOnlyOne(new Coordinates(1, 0), neighbors), "+1 0 neighbor present");
});

test("Neighbors coordinates calculation test for left border", function() {
    "use strict";
    
    var origin = new Coordinates(0, 5);
    var neighbors = Neighbors.getNeighbors(origin);

    equal(neighbors.length, 5, "Neighbors count is correct");
    
    ok(Tools.containsOnlyOne(new Coordinates(0, 4), neighbors), "0 -1 neighbor present");
    ok(Tools.containsOnlyOne(new Coordinates(1, 4), neighbors), "+1 -1 neighbor present");
    ok(Tools.containsOnlyOne(new Coordinates(1, 5), neighbors), "+1 0 neighbor present");
    ok(Tools.containsOnlyOne(new Coordinates(1, 6), neighbors), "+1 +1 neighbor present");
    ok(Tools.containsOnlyOne(new Coordinates(0, 6), neighbors), "0 +1 neighbor present");
});