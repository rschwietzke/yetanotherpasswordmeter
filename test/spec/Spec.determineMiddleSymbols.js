describe("Determine middle symbols", function() {
    
    describe("empty", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
        });
        
        it("empty string middle symbols", function() {  expect(pm.determineMiddleSymbols("")).toEqual(0); });
    });

    describe("not in the middle", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
        });
        
        it("-", function() {  expect(pm.determineMiddleSymbols("-")).toEqual(0); });
        it("--", function() {  expect(pm.determineMiddleSymbols("--")).toEqual(0); });
        it("#+*", function() {  expect(pm.determineMiddleSymbols("#+*")).toEqual(0); });
        it("*A", function() {  expect(pm.determineMiddleSymbols("*A")).toEqual(0); });
        it("A#", function() {  expect(pm.determineMiddleSymbols("A#")).toEqual(0); });
        it("A#+", function() {  expect(pm.determineMiddleSymbols("A#+")).toEqual(0); });
        it("#!A", function() {  expect(pm.determineMiddleSymbols("#!A")).toEqual(0); });
    });

    describe("in the middle", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
        });
        
        it("A-A", function() {  expect(pm.determineMiddleSymbols("A-A")).toEqual(1); });
        it("A+A!", function() {  expect(pm.determineMiddleSymbols("A+A!")).toEqual(1); });
        it("AA??AA", function() {  expect(pm.determineMiddleSymbols("AA??AA")).toEqual(1); });
        it("!A+A?", function() {  expect(pm.determineMiddleSymbols("!A+A?")).toEqual(1); });
        it("+++A!!!!!A+++", function() {  expect(pm.determineMiddleSymbols("+++A!!!!!A+++")).toEqual(1); });
    });
});



