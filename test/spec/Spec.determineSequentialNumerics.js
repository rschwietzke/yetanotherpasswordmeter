describe("Password sequenctial numerics detection for", function() {
    
    describe("empty", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.determineSequentialNumerics("");
        });
        
        it("has 0 SequentialNumerics", function() {  expect(pm.SequentialNumerics.count).toEqual(0);  });
    });
   
    describe("1", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.SequentialNumerics.length = 3;
            pm.determineSequentialNumerics("1");
        });
        
        it("has 0 SequentialNumerics", function() {  expect(pm.SequentialNumerics.count).toEqual(0);  });
    }); 
    
    describe("11", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.SequentialNumerics.length = 2;
            pm.determineSequentialNumerics("11");
        });
        
        it("has 0 SequentialNumerics", function() {  expect(pm.SequentialNumerics.count).toEqual(0);  });
    });     
    
    describe("12", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.SequentialNumerics.length = 2;
            pm.determineSequentialNumerics("12");
        });
        
        it("has 1 SequentialNumerics", function() {  expect(pm.SequentialNumerics.count).toEqual(1);  });
    });         

    describe("21", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.SequentialNumerics.length = 2;
            pm.determineSequentialNumerics("21");
        });
        
        it("has 1 SequentialNumerics", function() {  expect(pm.SequentialNumerics.count).toEqual(1);  });
    });

    describe("1234", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.SequentialNumerics.length = 2;
            pm.determineSequentialNumerics("1234");
        });
        
        it("has 3 SequentialNumerics", function() {  expect(pm.SequentialNumerics.count).toEqual(3);  });
    });
 
    describe("4321", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.SequentialNumerics.length = 2;
            pm.determineSequentialNumerics("4321");
        });
        
        it("has 3 SequentialNumerics", function() {  expect(pm.SequentialNumerics.count).toEqual(3);  });
    });   
    
    describe("89012", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.SequentialNumerics.length = 2;
            pm.determineSequentialNumerics("89012");
        });
        
        it("has 4 SequentialNumerics", function() {  expect(pm.SequentialNumerics.count).toEqual(4);  });
    });         
});


