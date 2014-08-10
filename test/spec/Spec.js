describe("Password", function() {
    
    describe("empty", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.checkPassword("");
        });
        
        it("is very weak", function() {  expect(pm.Complexity.value).toEqual(pm.COMPLEXITY.VERYWEAK);  });
        it("has a score of 0", function() {  expect(pm.Score.adjusted).toEqual(0);  });

        it("has a length of 0", function() {  expect(pm.PasswordLength.count).toEqual(0);  });
        it("has a length status of FAILED", function() {  expect(pm.PasswordLength.status).toEqual(pm.STATUS.FAILED);  });

        it("0 basic requirements fullfilled", function() {  expect(pm.BasicRequirements.count).toEqual(0);  });
        it("basic requirements have FAILED", function() {  expect(pm.BasicRequirements.status).toEqual(pm.STATUS.FAILED);  });

        it("recommened password length is 0", function() {  expect(pm.RecommendedPasswordLength.count).toEqual(0);  });
        it("recommended password length failed", function() {  expect(pm.RecommendedPasswordLength.status).toEqual(pm.STATUS.FAILED);  });

        it("has 0 lowercase letters", function() {  expect(pm.LowercaseLetters.count).toEqual(0);  });
        it("lowercase letters failed", function() {  expect(pm.LowercaseLetters.status).toEqual(pm.STATUS.FAILED);  });

        it("has 0 uppercase letters", function() {  expect(pm.UppercaseLetters.count).toEqual(0);  });
        it("uppercase letters failed", function() {  expect(pm.UppercaseLetters.status).toEqual(pm.STATUS.FAILED);  });

        it("has 0 numerics", function() {  expect(pm.Numerics.count).toEqual(0);  });
        it("numerics failed", function() {  expect(pm.Numerics.status).toEqual(pm.STATUS.FAILED);  });

        it("has 0 symbols", function() {  expect(pm.Symbols.count).toEqual(0);  });
        it("symbols failed", function() {  expect(pm.Symbols.status).toEqual(pm.STATUS.FAILED);  });

        it("has 0 middle numerics", function() {  expect(pm.MiddleNumerics.count).toEqual(0);  });
        it("middle numerics failed", function() {  expect(pm.MiddleNumerics.status).toEqual(pm.STATUS.FAILED);  });

        it("has 0 middle symbols", function() {  expect(pm.MiddleSymbols.count).toEqual(0);  });
        it("middle symbols failed", function() {  expect(pm.MiddleSymbols.status).toEqual(pm.STATUS.FAILED);  });

        it("has 0 sequentials letters", function() {  expect(pm.SequentialLetters.count).toEqual(0);  });
        it("sequentials letters passed", function() {  expect(pm.SequentialLetters.status).toEqual(pm.STATUS.PASSED);  });
        
        it("has 0 sequentials numerics", function() {  expect(pm.SequentialNumerics.count).toEqual(0);  });
        it("sequentials numerics passed", function() {  expect(pm.SequentialNumerics.status).toEqual(pm.STATUS.PASSED);  });
        
        it("has 0 keyboard patterns", function() {  expect(pm.KeyboardPatterns.count).toEqual(0);  });
        it("keyboard patterns passed", function() {  expect(pm.KeyboardPatterns.status).toEqual(pm.STATUS.PASSED);  });                

        it("has 0 repeated sequences", function() {  expect(pm.RepeatedSequences.count).toEqual(0);  });
        it("repeated sequences passed", function() {  expect(pm.RepeatedSequences.status).toEqual(pm.STATUS.PASSED);  });                

        it("has 0 mirrored sequences", function() {  expect(pm.MirroredSequences.count).toEqual(0);  });
        it("mirrored sequences passed", function() {  expect(pm.MirroredSequences.status).toEqual(pm.STATUS.PASSED);  });                
    });
    
    /*
     * count 
     * rating
     * status
    pm.PasswordLength, pm);
    pm.BasicRequirements, pm);
    pm.RecommendedPasswordLength, pm);
    pm.LowercaseLetters, pm);
    pm.UppercaseLetters, pm);
    pm.Numerics, pm);
    pm.Symbols, pm);
    pm.MiddleNumerics, pm);
    pm.MiddleSymbols, pm);
    pm.SequentialLetters, pm);
    pm.SequentialNumerics, pm);
    pm.KeyboardPatterns, pm);
    pm.RepeatedSequences, pm);
    pm.MirroredSequences, pm);*/
});
