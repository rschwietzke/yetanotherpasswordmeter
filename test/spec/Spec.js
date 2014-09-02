describe("Password", function() {

    describe("Very weak passwords are", function() {
        var pm;

        beforeEach(function() {
            pm = new PasswordMeter();
        });

        it("<none>", function() {expect(pm.checkPassword("")).toEqual(pm.COMPLEXITY.VERYWEAK); });
        it("a", function() {expect(pm.checkPassword("a")).toEqual(pm.COMPLEXITY.VERYWEAK); });
        it("aa", function() {expect(pm.checkPassword("aa")).toEqual(pm.COMPLEXITY.VERYWEAK); });
        it("aA", function() {expect(pm.checkPassword("aA")).toEqual(pm.COMPLEXITY.VERYWEAK); });
        it("aAa", function() {expect(pm.checkPassword("aAa")).toEqual(pm.COMPLEXITY.VERYWEAK); });
        it("a-A", function() {expect(pm.checkPassword("a-Z")).toEqual(pm.COMPLEXITY.VERYWEAK); });
        it("password", function() {expect(pm.checkPassword("password")).toEqual(pm.COMPLEXITY.VERYWEAK); });
        it("testtesttest", function() {expect(pm.checkPassword("testtesttest")).toEqual(pm.COMPLEXITY.VERYWEAK); });
        it("FOO2014", function() {expect(pm.checkPassword("FOO2014")).toEqual(pm.COMPLEXITY.VERYWEAK); });
        it("Foo1234567890", function() {expect(pm.checkPassword("Foo1234567890")).toEqual(pm.COMPLEXITY.VERYWEAK); });
    });

    describe("Weak passwords are", function() {
    var pm;

    beforeEach(function() {
        pm = new PasswordMeter();
    });

    it("", function() {expect(pm.checkPassword("")).toEqual(pm.COMPLEXITY.VERYWEAK); });
    it("a", function() {expect(pm.checkPassword("")).toEqual(pm.COMPLEXITY.VERYWEAK); });
    it("aa", function() {expect(pm.checkPassword("")).toEqual(pm.COMPLEXITY.VERYWEAK); });
    it("aA", function() {expect(pm.checkPassword("")).toEqual(pm.COMPLEXITY.VERYWEAK); });
    it("aAa", function() {expect(pm.checkPassword("")).toEqual(pm.COMPLEXITY.VERYWEAK); });
    it("a-A", function() {expect(pm.checkPassword("")).toEqual(pm.COMPLEXITY.VERYWEAK); });
    it("password", function() {expect(pm.checkPassword("")).toEqual(pm.COMPLEXITY.VERYWEAK); });
    it("testtesttest", function() {expect(pm.checkPassword("")).toEqual(pm.COMPLEXITY.VERYWEAK); });
    it("FOO2014", function() {expect(pm.checkPassword("")).toEqual(pm.COMPLEXITY.VERYWEAK); });
    it("Foo1234567890", function() {expect(pm.checkPassword("")).toEqual(pm.COMPLEXITY.VERYWEAK); });
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
