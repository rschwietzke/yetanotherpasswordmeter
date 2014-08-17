describe("Determine entropy", function() {
    
    describe("empty", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
        });
        
        it("has 0 entropy", function() {  expect(pm.calculateEntropy("")).toEqual(0); });
    });

    describe("single chars", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
        });
        
        it("a has 5 bits of entropy", function() {  expect(pm.calculateEntropy("a")).toEqual(5); });
        it("b has 5 bits of entropy", function() {  expect(pm.calculateEntropy("b")).toEqual(5); });
        it("A has 5 bits of entropy", function() {  expect(pm.calculateEntropy("A")).toEqual(5); });
        it("1 has 3 bits of entropy", function() {  expect(pm.calculateEntropy("1")).toEqual(3); });
        it("_ has 4 bits of entropy", function() {  expect(pm.calculateEntropy("_")).toEqual(4); });
        it("! has 3 bits of entropy", function() {  expect(pm.calculateEntropy("!")).toEqual(3); });
    });    

    describe("double chars, same pool", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
        });
        
        it("aa has 5 bits of entropy", function() {  expect(pm.calculateEntropy("aa")).toEqual(9); });
        it("ab has 5 bits of entropy", function() {  expect(pm.calculateEntropy("ab")).toEqual(9); });
        it("ba has 5 bits of entropy", function() {  expect(pm.calculateEntropy("ba")).toEqual(9); });
        it("12 has 3 bits of entropy", function() {  expect(pm.calculateEntropy("12")).toEqual(7); });
    });   
    
});


