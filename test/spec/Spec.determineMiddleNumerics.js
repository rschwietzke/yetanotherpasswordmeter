describe("Determine middle numerics", function() {
    
    describe("empty", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
        });
        
        it("empty string no middle numeric", function() {  expect(pm.determineMiddleNumerics("")).toEqual(0); });
    });

    describe("not in the middle", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
        });
        
        it("1", function() {  expect(pm.determineMiddleNumerics("1")).toEqual(0); });
        it("11", function() {  expect(pm.determineMiddleNumerics("11")).toEqual(0); });
        it("111", function() {  expect(pm.determineMiddleNumerics("111")).toEqual(0); });
        it("1A", function() {  expect(pm.determineMiddleNumerics("1A")).toEqual(0); });
        it("A1", function() {  expect(pm.determineMiddleNumerics("A1")).toEqual(0); });
        it("A11", function() {  expect(pm.determineMiddleNumerics("A11")).toEqual(0); });
        it("11A", function() {  expect(pm.determineMiddleNumerics("11A")).toEqual(0); });
    });

    describe("in the middle", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
        });
        
        it("A1A", function() {  expect(pm.determineMiddleNumerics("A1A")).toEqual(1); });
        it("A1A1", function() {  expect(pm.determineMiddleNumerics("A1A1")).toEqual(1); });
        it("AA11AA", function() {  expect(pm.determineMiddleNumerics("AA11AA")).toEqual(1); });
        it("1A1A1", function() {  expect(pm.determineMiddleNumerics("1A1A1")).toEqual(1); });
        it("111A11111A111", function() {  expect(pm.determineMiddleNumerics("111A11111A111")).toEqual(1); });
    });
});



