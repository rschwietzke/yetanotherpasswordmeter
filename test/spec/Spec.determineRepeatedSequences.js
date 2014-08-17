describe("Password repeated sequences", function() {
    
    describe("empty", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.determineRepeatedSequences("");
        });
        
        it("has 0 repeated sequences", function() {  expect(pm.RepeatedSequences.count).toEqual(0);  });
    });

    describe("abcdefg", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.determineRepeatedSequences("abcdefg");
        });
        
        it("has 0 repeated sequences", function() {  expect(pm.RepeatedSequences.count).toEqual(0);  });
    });

    describe("1 repeated sequence, length of 3", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.RepeatedSequences.length = 3;
        });
        
        it("abcabc", function() {  pm.determineRepeatedSequences("abcabc"); expect(pm.RepeatedSequences.count).toEqual(1);  });
        it("abc abc", function() {  pm.determineRepeatedSequences("abc abc"); expect(pm.RepeatedSequences.count).toEqual(1);  });
        it("abcbbgatabc", function() {  pm.determineRepeatedSequences("abcbbgatabc"); expect(pm.RepeatedSequences.count).toEqual(1);  });
        it("123abc456abc98751", function() {  pm.determineRepeatedSequences("123abc456abc98751"); expect(pm.RepeatedSequences.count).toEqual(1);  });
    });

    describe("1 repeated sequence, length of 5", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.RepeatedSequences.length = 5;
        });
        
        it("abcdeabcde", function() {  pm.determineRepeatedSequences("abcdeabcde"); expect(pm.RepeatedSequences.count).toEqual(1);  });
        it("abcde abcde", function() {  pm.determineRepeatedSequences("abcde abcde"); expect(pm.RepeatedSequences.count).toEqual(1);  });
        it("abcde s abcde", function() {  pm.determineRepeatedSequences("abcde s abcde"); expect(pm.RepeatedSequences.count).toEqual(1);  });
        it("7913ffd1-8112-4a8a-bede-595ec767538a"
, function() {  pm.determineRepeatedSequences("7913ffd1-abcde-4a8a-bede-595abcdec767538a"); expect(pm.RepeatedSequences.count).toEqual(1);  });
    });

    describe("Several repeated sequence, length of 3", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.RepeatedSequences.length = 3;
        });
        
        it("JaneJane", function() {  pm.determineRepeatedSequences("JaneJane"); expect(pm.RepeatedSequences.count).toEqual(2);  });
    });
    
});


