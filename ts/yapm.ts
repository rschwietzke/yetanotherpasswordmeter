class YAPM {
	// The password under test.
	password: string;
	
	// The rating for that password
	rating: number = 0;
	
	constructor (password: string) {
		this.password = password;
	}
	
	test() {
		return true;
	}
}
