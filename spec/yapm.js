describe("YAPM", function() {
	var yapm;
	
	beforeEach(function() {
		yapm = new YAPM();
	});

	it("Avoid standard password = password", function() {
		expect(yapm.test()).toBe(true);
		expect(yapm.rating).toBe(0);
	});
});
