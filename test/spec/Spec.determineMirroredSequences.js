describe("Password mirrored sequences", function() {
    
    describe("empty", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.determineMirroredSequences("");
        });
        
        it("has 0 mirrored sequences", function() {  expect(pm.MirroredSequences.count).toEqual(0);  });
    });

    describe("overlapping is not mirroring, length 4", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.MirroredSequences.length = 4;
        });
        
        it("1234321", function() { pm.determineMirroredSequences("1234321"); expect(pm.MirroredSequences.count).toEqual(0);  });
    });

    describe("one mirrored sequence, length 3", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.MirroredSequences.length = 3;
        });
        
        it("ABCCBA", function() { pm.determineMirroredSequences("ABCCBA"); expect(pm.MirroredSequences.count).toEqual(1);  });
        it("ABC CBA", function() { pm.determineMirroredSequences("ABC CBA"); expect(pm.MirroredSequences.count).toEqual(1);  });
        it("ABC CBA ABC", function() { pm.determineMirroredSequences("ABC CBA ABC"); expect(pm.MirroredSequences.count).toEqual(1);  });
    });

    describe("two mirrored sequences, length 4", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.MirroredSequences.length = 4;
        });
        
        it("ABCD_1234-DCBA+4321", function() { pm.determineMirroredSequences("ABCD_1234-DCBA+4321"); expect(pm.MirroredSequences.count).toEqual(2);  });
        it("fooABCDbarDCBAbar", function() { pm.determineMirroredSequences("fooABCDbarDCBAbar"); expect(pm.MirroredSequences.count).toEqual(1);  });
    });

    describe("do not count it twice", function() {
        var pm;
        
        beforeEach(function() {
            pm = new PasswordMeter();
            pm.MirroredSequences.length = 4;
        });
        
        it("1234-4321+1234_4321", function() { pm.determineMirroredSequences("1234-4321+1234_4321"); expect(pm.MirroredSequences.count).toEqual(1);  });
    });


    
});


