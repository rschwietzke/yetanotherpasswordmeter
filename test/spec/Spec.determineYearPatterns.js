describe("Search for year patterns", function() {
    
    describe("empty", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
        });
        
        it("empty string no pattern", function() {  expect(pm.determineYearPatterns("")).toEqual(0); });
        it("space string no pattern", function() {  expect(pm.determineYearPatterns(" ")).toEqual(0); });
        it("mulitple space string no pattern", function() {  expect(pm.determineYearPatterns("    ")).toEqual(0); });
        it("1799", function() {  expect(pm.determineYearPatterns("    ")).toEqual(0); });
        it("2200", function() {  expect(pm.determineYearPatterns("    ")).toEqual(0); });
    });

    describe("one pattern", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
        });
        
        it("2199", function() {  expect(pm.determineYearPatterns("2199")).toEqual(1); });
        it("2000", function() {  expect(pm.determineYearPatterns("2000")).toEqual(1); });
        it("1980", function() {  expect(pm.determineYearPatterns("1980")).toEqual(1); });
        it("1800", function() {  expect(pm.determineYearPatterns("1800")).toEqual(1); });
    });

    describe("several patterns", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
        });
        
        it("21991800", function() {  expect(pm.determineYearPatterns("21991800")).toEqual(2); });
        it("514619000019", function() {  expect(pm.determineYearPatterns("514619000019")).toEqual(1); });
        it("1980 1980 2040 2042", function() {  expect(pm.determineYearPatterns("1980 1980 2040 2042")).toEqual(4); });
        it("1800000019900000", function() {  expect(pm.determineYearPatterns("1800000019900000")).toEqual(2); });
    });
});


