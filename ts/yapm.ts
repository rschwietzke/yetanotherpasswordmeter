/**
*   Original File: password-meter.js
*	Renamed: yapm.ts
* 
*	Created by: Rene Schwietzke (mail@03146f06.net)
*   Created on: 2008-12-01
*   Last modified: 2013-01-20
*   Version: 2.0.0
*
*   License Information:
*   -------------------------------------------------------------------------
*   Copyright (C) 2008-2013 Rene Schwietzke
*
*   This program is free software; you can redistribute it and/or modify it
*   under the terms of the GNU General Public License as published by the
*   Free Software Foundation; either version 2 of the License, or (at your
*   option) any later version.
*    
*   This program is distributed in the hope that it will be useful, but
*   WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
*   General Public License for more details.
*    
*   You should have received a copy of the GNU General Public License along
*   with this program; if not, write to the Free Software Foundation, Inc.,
*   59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
*    
*   Based on original work by Jeff Todnem published under GPL 2.
* 
*   Original File: pwd_meter.js (http://www.passwordmeter.com/)
*   Created by: Jeff Todnem (http://www.todnem.com/)
*
*   History:
*   -------------------------------------------------------------------------
*   v1.0.0 : initial version
*   v1.0.1 : fixed rounding problem by adjusting float2str
*   v1.0.2 : fixed influence of redundancy on long passwords. More bad
*            characters after a good start should not be punished
*   v1.1.0 : Introduced significance to cover the case of old system, where you
*            can type in long passwords, but only the first 8 characters are
*            considered. So now, the first characters are more important
*            and a good end cannot fix the password when it started bad.
*	v2.0.0 : Rewrite. It is now Typescript, because I am an JS idiot.
* 
*    ToDo: 
*    -------------------------------------------------------------------------
*    * Punish first or last letter uppercase characters only
*    * Punish special characters only at the end
*    * Punish numbers only at the end
*    * Filter common patterns, such as 12.12.2008 12/20/2009 2008-12-13
*    * Seem to contain a year 19XX or 20XX
*/
module YAPM {
	// The password under test.
	export var password: string = "";

	// The rating for that password
	export var rating: number = 0;
	
	export interface Criteria {
		/**
		 * The weight defines the overall importance on
		 * a scale from 0 to 100 with 100 to be very important.
		 */
		weight: number;
		
		/** 
		 * Will define the result of this check. Can be negative
		 * to express disappointment. Score ranges from -200 to 200
		 * where -100 means failed and 100 passed. The range 100..200
		 * is for extra evaluation point.
		 */
		score: number;
		
		/**
		 * Just runs this check. You pass a string into it. Normally
		 * that is the password, but because you can reuse this
		 * check for subchecks, it might be just data of any kind.
		 */ 
		check(data: string): void;
	}
	
	/**
	 * Checks the password length
	 */
	export class Length implements Criteria{
		weight: number = 100;
		score: number = -100;
		
		static MINIMUMLENGTH: number = 8;
		static RECOMMENDEDLENGTH: number = 10;
		static EXCELLENTLENGTH: number = 12;
		
		check (data: string): void {
			var length: number = data.length;
			
			if (length >= Length.EXCELLENTLENGTH) {
				this.score = 200;
			}
			else if (length >= Length.RECOMMENDEDLENGTH) {
				this.score = 150;
			}
			else if (length >= Length.MINIMUMLENGTH) {
				this.score = 100;
			}
			else if (length < Length.MINIMUMLENGTH / 2) {
				this.score = -200;
			}
	
	/**
	 * This is the "main" class and is your way to access the functionality
	 * of YAPM. Everything else is mainly hidden. 
	 */  
	export class Tester {
		constructor (password: string) {
			this.init();
			YAPM.password = password;
		}
	
		// Reset the state
		init() {
			YAPM.password = "";
			YAPM.rating = 0;
		}
	
		test() {
			return true;
		}
	}
}
