describe("Password character detection for", function() {
    
    describe("empty", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.determineCharacters("".split(""));
        });
        
        it("has 0 UppercaseLetters", function() {  expect(pm.UppercaseLetters.count).toEqual(0);  });
        it("has 0 LowercaseLetters", function() {  expect(pm.LowercaseLetters.count).toEqual(0);  });
        it("has 0 Numerics", function() {  expect(pm.Numerics.count).toEqual(0);  });
        it("has 0 Symbols", function() {  expect(pm.Symbols.count).toEqual(0);  });
        it("has 0 MiddleSymbols", function() {  expect(pm.MiddleSymbols.count).toEqual(0);  });
        it("has 0 MiddleNumerics", function() {  expect(pm.MiddleNumerics.count).toEqual(0);  });
    });

    describe("A", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.determineCharacters("A".split(""));
        });
        
        it("has 1 UppercaseLetters", function() {  expect(pm.UppercaseLetters.count).toEqual(1);  });
        it("has 0 LowercaseLetters", function() {  expect(pm.LowercaseLetters.count).toEqual(0);  });
        it("has 0 Numerics", function() {  expect(pm.Numerics.count).toEqual(0);  });
        it("has 0 Symbols", function() {  expect(pm.Symbols.count).toEqual(0);  });
        it("has 0 MiddleSymbols", function() {  expect(pm.MiddleSymbols.count).toEqual(0);  });
        it("has 0 MiddleNumerics", function() {  expect(pm.MiddleNumerics.count).toEqual(0);  });
    });
        
    describe("AA", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.determineCharacters("AA".split(""));
        });
        
        it("has 2 UppercaseLetters", function() {  expect(pm.UppercaseLetters.count).toEqual(2);  });
        it("has 0 LowercaseLetters", function() {  expect(pm.LowercaseLetters.count).toEqual(0);  });
        it("has 0 Numerics", function() {  expect(pm.Numerics.count).toEqual(0);  });
        it("has 0 Symbols", function() {  expect(pm.Symbols.count).toEqual(0);  });
        it("has 0 MiddleSymbols", function() {  expect(pm.MiddleSymbols.count).toEqual(0);  });
        it("has 0 MiddleNumerics", function() {  expect(pm.MiddleNumerics.count).toEqual(0);  });
    });    

    describe("ABC", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.determineCharacters("ABC".split(""));
        });
        
        it("has 3 UppercaseLetters", function() {  expect(pm.UppercaseLetters.count).toEqual(3);  });
        it("has 0 LowercaseLetters", function() {  expect(pm.LowercaseLetters.count).toEqual(0);  });
        it("has 0 Numerics", function() {  expect(pm.Numerics.count).toEqual(0);  });
        it("has 0 Symbols", function() {  expect(pm.Symbols.count).toEqual(0);  });
        it("has 0 MiddleSymbols", function() {  expect(pm.MiddleSymbols.count).toEqual(0);  });
        it("has 0 MiddleNumerics", function() {  expect(pm.MiddleNumerics.count).toEqual(0);  });
    });    

    describe("abc", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.determineCharacters("abc".split(""));
        });
        
        it("has 0 UppercaseLetters", function() {  expect(pm.UppercaseLetters.count).toEqual(0);  });
        it("has 3 LowercaseLetters", function() {  expect(pm.LowercaseLetters.count).toEqual(3);  });
        it("has 0 Numerics", function() {  expect(pm.Numerics.count).toEqual(0);  });
        it("has 0 Symbols", function() {  expect(pm.Symbols.count).toEqual(0);  });
        it("has 0 MiddleSymbols", function() {  expect(pm.MiddleSymbols.count).toEqual(0);  });
        it("has 0 MiddleNumerics", function() {  expect(pm.MiddleNumerics.count).toEqual(0);  });
    });    

    describe("Ab3", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.determineCharacters("Ab3".split(""));
        });
        
        it("has 1 UppercaseLetters", function() {  expect(pm.UppercaseLetters.count).toEqual(1);  });
        it("has 1 LowercaseLetters", function() {  expect(pm.LowercaseLetters.count).toEqual(1);  });
        it("has 1 Numerics", function() {  expect(pm.Numerics.count).toEqual(1);  });
        it("has 0 Symbols", function() {  expect(pm.Symbols.count).toEqual(0);  });
        it("has 0 MiddleSymbols", function() {  expect(pm.MiddleSymbols.count).toEqual(0);  });
        it("has 0 MiddleNumerics", function() {  expect(pm.MiddleNumerics.count).toEqual(0);  });
    });    

    describe("Ab-3", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.determineCharacters("Ab-3".split(""));
        });
        
        it("has 1 UppercaseLetters", function() {  expect(pm.UppercaseLetters.count).toEqual(1);  });
        it("has 1 LowercaseLetters", function() {  expect(pm.LowercaseLetters.count).toEqual(1);  });
        it("has 1 Numerics", function() {  expect(pm.Numerics.count).toEqual(1);  });
        it("has 1 Symbols", function() {  expect(pm.Symbols.count).toEqual(1);  });
        it("has 1 MiddleSymbols", function() {  expect(pm.MiddleSymbols.count).toEqual(1);  });
        it("has 0 MiddleNumerics", function() {  expect(pm.MiddleNumerics.count).toEqual(0);  });
    });    

    describe("Ab3-", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.determineCharacters("Ab3-".split(""));
        });
        
        it("has 1 UppercaseLetters", function() {  expect(pm.UppercaseLetters.count).toEqual(1);  });
        it("has 1 LowercaseLetters", function() {  expect(pm.LowercaseLetters.count).toEqual(1);  });
        it("has 1 Numerics", function() {  expect(pm.Numerics.count).toEqual(1);  });
        it("has 1 Symbols", function() {  expect(pm.Symbols.count).toEqual(1);  });
        it("has 0 MiddleSymbols", function() {  expect(pm.MiddleSymbols.count).toEqual(0);  });
        it("has 1 MiddleNumerics", function() {  expect(pm.MiddleNumerics.count).toEqual(1);  });
    });    

    describe("Ab33--", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.determineCharacters("Ab33--".split(""));
        });
        
        it("has 1 UppercaseLetters", function() {  expect(pm.UppercaseLetters.count).toEqual(1);  });
        it("has 1 LowercaseLetters", function() {  expect(pm.LowercaseLetters.count).toEqual(1);  });
        it("has 2 Numerics", function() {  expect(pm.Numerics.count).toEqual(2);  });
        it("has 2 Symbols", function() {  expect(pm.Symbols.count).toEqual(2);  });
        it("has 1 MiddleSymbols", function() {  expect(pm.MiddleSymbols.count).toEqual(1);  });
        it("has 2 MiddleNumerics", function() {  expect(pm.MiddleNumerics.count).toEqual(2);  });
    });    

    describe("Ab13-#", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.determineCharacters("Ab13-#".split(""));
        });
        
        it("has 1 UppercaseLetters", function() {  expect(pm.UppercaseLetters.count).toEqual(1);  });
        it("has 1 LowercaseLetters", function() {  expect(pm.LowercaseLetters.count).toEqual(1);  });
        it("has 2 Numerics", function() {  expect(pm.Numerics.count).toEqual(2);  });
        it("has 2 Symbols", function() {  expect(pm.Symbols.count).toEqual(2);  });
        it("has 1 MiddleSymbols", function() {  expect(pm.MiddleSymbols.count).toEqual(1);  });
        it("has 2 MiddleNumerics", function() {  expect(pm.MiddleNumerics.count).toEqual(2);  });
    });    

    describe("1234", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.determineCharacters("1234".split(""));
        });
        
        it("has 0 UppercaseLetters", function() {  expect(pm.UppercaseLetters.count).toEqual(0);  });
        it("has 0 LowercaseLetters", function() {  expect(pm.LowercaseLetters.count).toEqual(0);  });
        it("has 4 Numerics", function() {  expect(pm.Numerics.count).toEqual(4);  });
        it("has 0 Symbols", function() {  expect(pm.Symbols.count).toEqual(0);  });
        it("has 0 MiddleSymbols", function() {  expect(pm.MiddleSymbols.count).toEqual(0);  });
        it("has 2 MiddleNumerics", function() {  expect(pm.MiddleNumerics.count).toEqual(2);  });
    }); 

    describe("333", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.determineCharacters("333".split(""));
        });
        
        it("has 0 UppercaseLetters", function() {  expect(pm.UppercaseLetters.count).toEqual(0);  });
        it("has 0 LowercaseLetters", function() {  expect(pm.LowercaseLetters.count).toEqual(0);  });
        it("has 3 Numerics", function() {  expect(pm.Numerics.count).toEqual(3);  });
        it("has 0 Symbols", function() {  expect(pm.Symbols.count).toEqual(0);  });
        it("has 0 MiddleSymbols", function() {  expect(pm.MiddleSymbols.count).toEqual(0);  });
        it("has 1 MiddleNumerics", function() {  expect(pm.MiddleNumerics.count).toEqual(1);  });
    }); 
    
});


