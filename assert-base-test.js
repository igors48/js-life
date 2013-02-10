test("Base assertions test", function() {
    "use strict";
    
    ok(AssertBase.isInteger(1), "1 is integer");
    ok(AssertBase.isInteger(-1), "-1 is integer");
    ok(!AssertBase.isInteger('1'), "'1' is not integer");
    ok(!AssertBase.isInteger(-1.5), "-1.5 is not integer");
    ok(!AssertBase.isInteger(1.5), "1.5 is not integer");
    
    ok(AssertBase.isPositiveInteger(1), "1 is positive integer");
    ok(!AssertBase.isPositiveInteger(-1), "-1 is not positive integer");
    
    var validValues = [0, 1, 2];
    ok(AssertBase.isOneOfThese(1, validValues), "1 in [0, 1, 2]");
    ok(!AssertBase.isOneOfThese(3, validValues), "3 not in [0, 1, 2]");
    ok(!AssertBase.isOneOfThese("1", validValues), "'1' not in [0, 1, 2]");
});
