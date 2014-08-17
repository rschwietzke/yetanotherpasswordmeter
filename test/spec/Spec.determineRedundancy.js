describe("Determine redundancy", function() {
    
    describe("empty", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
        });
        
        it("has 0 redundancy", function() {  expect(pm.determineRedundancy("")).toEqual(0); });
    });

    describe("single chars", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
        });
        
        it("a has 1 redudancy", function() {  expect(pm.determineRedundancy("a")).toEqual(1); });
        it("1 has 1 redudancy", function() {  expect(pm.determineRedundancy("1")).toEqual(1); });
    });    

    describe("double chars", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
        });
        
        it("aa has 2 redudancy", function() {  expect(pm.determineRedundancy("aa")).toEqual(2.0); });
        it("11 has 2 redudancy", function() {  expect(pm.determineRedundancy("11")).toEqual(2.0); });
    });  

    describe("triple chars", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
        });
        
        it("aaa has 3 redudancy", function() {  expect(pm.determineRedundancy("aaa")).toEqual(3.0); });
        it("aba has 2 redudancy", function() {  expect(pm.determineRedundancy("aba")).toEqual(1.5); });
        it("abc has 1 redudancy", function() {  expect(pm.determineRedundancy("abc")).toEqual(1.0); });
    });
    
    describe("rest", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
        });
        
        it("aaaa has 4 redudancy", function() {  expect(pm.determineRedundancy("aaaa")).toEqual(4.0); });
        it("abab has 2 redudancy", function() {  expect(pm.determineRedundancy("abab")).toEqual(2.0); });
        it("abcd has 1 redudancy", function() {  expect(pm.determineRedundancy("abcd")).toEqual(1.0); });
    });  
});


