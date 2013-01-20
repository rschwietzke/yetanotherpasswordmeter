describe("YAPM", function() {
		
	describe("Password Length", function() { 
		beforeEach(function() {
			yapm = new YAPM.Length();
		});

		it("Minimum length", function() {yapm.check("12345678");expect(yapm.score).toBe(100);});
		it("Minimum length to recommended length", function() {yapm.check("123456789");expect(yapm.score).toBe(100);});
		
		it("Recommended length", function() {yapm.check("1234567890");expect(yapm.score).toBe(150);});
		it("Recommened length to excellent length", function() {yapm.check("12345678901");expect(yapm.score).toBe(150);});
		
		it("Excellent length", function() {yapm.check("123456789012");expect(yapm.score).toBe(200);});
		it("Aboce excellent length", function() {yapm.check("12345678012345677");expect(yapm.score).toBe(200);});
		
		it("Shorter than minimum length", function() {yapm.check("1234567");expect(yapm.score).toBe(-100);});		
		
		it("Less than half of minimum length", function() {yapm.check("123");expect(yapm.score).toBe(-200);});		
		
	});
});
