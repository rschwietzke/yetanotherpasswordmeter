describe("Password sequenctial letters detection for", function() {
    
    describe("empty", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.SequentialLetters.length = 3;
            pm.determineSequentialLetters("");
        });
        
        it("has 0 SequentialLetters", function() {  expect(pm.SequentialLetters.count).toEqual(0);  });
    });
   
    describe("a", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.SequentialLetters.length = 3;
            pm.determineSequentialLetters("a");
        });
        
        it("has 0 SequentialLetters", function() {  expect(pm.SequentialLetters.count).toEqual(0);  });
    }); 
    
    describe("aa", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.SequentialLetters.length = 2;
            pm.determineSequentialLetters("aa");
        });
        
        it("has 0 SequentialLetters", function() {  expect(pm.SequentialLetters.count).toEqual(0);  });
    });     
    
    describe("ab", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.SequentialLetters.length = 2;
            pm.determineSequentialLetters("ab");
        });
        
        it("has 1 SequentialLetters", function() {  expect(pm.SequentialLetters.count).toEqual(1);  });
    }); 
     
    describe("abc", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.SequentialLetters.length = 2;
            pm.determineSequentialLetters("abc");
        });
        
        it("has 2 SequentialLetters", function() {  expect(pm.SequentialLetters.count).toEqual(2);  });
    });     

    describe("abc", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.SequentialLetters.length = 3;
            pm.determineSequentialLetters("abc");
        });
        
        it("has 1 SequentialLetters", function() {  expect(pm.SequentialLetters.count).toEqual(1);  });
    });    

    describe("abcdef", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.SequentialLetters.length = 3;
            pm.determineSequentialLetters("abcdef");
        });
        
        it("has 4 SequentialLetters", function() {  expect(pm.SequentialLetters.count).toEqual(4);  });
    });
 
    describe("fedcba", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.SequentialLetters.length = 3;
            pm.determineSequentialLetters("fedcba");
        });
        
        it("has 4 SequentialLetters", function() {  expect(pm.SequentialLetters.count).toEqual(4);  });
    });
        
    describe("xyzabc", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.SequentialLetters.length = 3;
            pm.determineSequentialLetters("xyzabc");
        });
        
        it("has 4 SequentialLetters", function() {  expect(pm.SequentialLetters.count).toEqual(4);  });
    });    
    
    
});


