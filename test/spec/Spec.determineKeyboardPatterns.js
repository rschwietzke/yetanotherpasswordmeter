describe("Password keyboard pattern detection ", function() {
    
    describe("empty", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.determineKeyboardPatterns("");
        });
        
        it("empty password has no keyboard matches", function() {  expect(pm.KeyboardPatterns.count).toEqual(0);  });
    });

    describe("too short", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.KeyboardPatterns.length = 4;
            pm.determineKeyboardPatterns("qwe");
        });
        
        it("length 4 but password is 3", function() {  expect(pm.KeyboardPatterns.count).toEqual(0);  });
    });
    
    describe("1 full keyboard line, several length", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.KeyboardPatterns.length = 3;
        });
        
        it("1/0", function() { pm.determineKeyboardPatterns("q"); expect(pm.KeyboardPatterns.count).toEqual(0);  });
        it("2/0", function() { pm.determineKeyboardPatterns("qw"); expect(pm.KeyboardPatterns.count).toEqual(0);  });
        it("3/1", function() { pm.determineKeyboardPatterns("qwe"); expect(pm.KeyboardPatterns.count).toEqual(1);  });
        it("4/2", function() { pm.determineKeyboardPatterns("qwer"); expect(pm.KeyboardPatterns.count).toEqual(2);  });
        it("5/3", function() { pm.determineKeyboardPatterns("qwert"); expect(pm.KeyboardPatterns.count).toEqual(3);  });
        it("6/4", function() { pm.determineKeyboardPatterns("qwertz"); expect(pm.KeyboardPatterns.count).toEqual(4);  });
        it("7/5", function() { pm.determineKeyboardPatterns("qwertzu"); expect(pm.KeyboardPatterns.count).toEqual(5);  });
        it("8/6", function() { pm.determineKeyboardPatterns("qwertzui"); expect(pm.KeyboardPatterns.count).toEqual(6);  });
        it("9/7", function() { pm.determineKeyboardPatterns("qwertzuio"); expect(pm.KeyboardPatterns.count).toEqual(7);  });
        it("10/8", function() { pm.determineKeyboardPatterns("qwertzuiop"); expect(pm.KeyboardPatterns.count).toEqual(8);  });
    });

    describe("1 full keyboard line, several length, reverse", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.KeyboardPatterns.length = 3;
        });
        
        it("1/0", function() { pm.determineKeyboardPatterns("q"); expect(pm.KeyboardPatterns.count).toEqual(0);  });
        it("2/0", function() { pm.determineKeyboardPatterns("wq"); expect(pm.KeyboardPatterns.count).toEqual(0);  });
        it("3/1", function() { pm.determineKeyboardPatterns("ewq"); expect(pm.KeyboardPatterns.count).toEqual(1);  });
        it("4/2", function() { pm.determineKeyboardPatterns("rewq"); expect(pm.KeyboardPatterns.count).toEqual(2);  });
        it("5/3", function() { pm.determineKeyboardPatterns("trewq"); expect(pm.KeyboardPatterns.count).toEqual(3);  });
        it("6/4", function() { pm.determineKeyboardPatterns("ztrewq"); expect(pm.KeyboardPatterns.count).toEqual(4);  });
        it("7/5", function() { pm.determineKeyboardPatterns("uztrewq"); expect(pm.KeyboardPatterns.count).toEqual(5);  });
        it("8/6", function() { pm.determineKeyboardPatterns("iuztrewq"); expect(pm.KeyboardPatterns.count).toEqual(6);  });
        it("9/7", function() { pm.determineKeyboardPatterns("oiuztrewq"); expect(pm.KeyboardPatterns.count).toEqual(7);  });
        it("10/8", function() { pm.determineKeyboardPatterns("poiuztrewq"); expect(pm.KeyboardPatterns.count).toEqual(8);  });
    });

});


