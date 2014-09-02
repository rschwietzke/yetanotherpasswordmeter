/**
**    Original File: password-meter.js
**    Created by: Rene Schwietzke (mail@03146f06.net)
**    Created on: 2008-12-01
**    Last modified: 2014-08-20
**    Version: 2.0.0
**
**    License Information:
**    -------------------------------------------------------------------------
**    Copyright (C) 2014 Rene Schwietzke
**
**    This program is free software; you can redistribute it and/or modify it
**    under the terms of the GNU General Public License as published by the
**    Free Software Foundation; either version 2 of the License, or (at your
**    option) any later version.
**
**    This program is distributed in the hope that it will be useful, but
**    WITHOUT ANY WARRANTY; without even the implied warranty of
**    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
**    General Public License for more details.
**
**    You should have received a copy of the GNU General Public License along
**    with this program; if not, write to the Free Software Foundation, Inc.,
**    59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
**
**    Based on original work by Jeff Todnem published under GPL 2.
**
**    Original File: pwd_meter.js (http://www.passwordmeter.com/)
**    Created by: Jeff Todnem (http://www.todnem.com/)
**
**    History:
**    -------------------------------------------------------------------------
**    v1.0.0 : initial version
**    v1.0.1 : fixed rounding problem by adjusting float2str
**    v1.0.2 : fixed influence of redundancy on long passwords. More bad
**             characters after a good start should not be punished
**    v1.1.0 : Introduced significance to cover the case of old system, where you
**             can type in long passwords, but only the first 8 characters are
**             considered. So now, the first characters are more important
**             and a good end cannot fix the password when it started bad.
**    v2.0.0 : Pay more attention to length.
**             Tests
**             Refactored code
**
**    ToDo:
**    -------------------------------------------------------------------------
**    * Punish first or last letter uppercase characters only
**    * Punish special characters only at the end
**    * Punish numbers only at the end
**    * Filter common patterns, such as 12.12.2008 12/20/2009 2008-12-13
**    * Seem to contain a year 19XX or 20XX
**/
PasswordMeter.prototype = (
{
	// the version of the password meter
	version: "2.0.0",

	COMPLEXITY:
	{
	    VERYWEAK: 0,
	    WEAK: 1,
	    FAIR: 2,
	    GOOD: 3,
	    STRONG: 4
	},

	STATUS:
	{
	    FAILED: 0,
	    PASSED: 1,
	    EXCEEDED: 2
	},

    // little string helper to reverse a string
    strReverse: function(str)
    {
        var newstring = "";
        for (var s = 0; s < str.length; s++)
        {
            newstring = str.charAt(s) + newstring;
        }
        return newstring;
    },

    int2str: function(aNumber)
    {
		if (aNumber == 0)
		{
			return "0";
		}
		else
		{
			return parseInt(aNumber, 10);
		}
    },

    float2str: function(aNumber)
    {
		if (aNumber == 0)
		{
			return "0.00";
		}
		else
		{
			return parseFloat(aNumber.toFixed(2));
		}
    },

	// helper for the status
	// <0 failed
	// 0  passed
	// >0 exceeded
	determineStatus: function(aNumber)
	{
		if (aNumber == 0)
		{
			return this.STATUS.PASSED;
		}
		else if (aNumber > 0)
		{
			return this.STATUS.EXCEEDED;
		}
		else
		{
			return this.STATUS.FAILED;
		}
	},

	// helper for the status
	// 0  passed
	// !=0 failed
	determineBinaryStatus: function(aNumber)
	{
		if (aNumber == 0)
		{
			return this.STATUS.PASSED;
		}
		else
		{
			return this.STATUS.FAILED;
		}
	}
});



function PasswordMeter()
{
    this.Score =
	{
		count: 0,
		adjusted: 0,
		beforeRedundancy: 0
	};

	// the complexity index
	this.Complexity =
	{
		limits: [20, 40, 60, 80, 100],
		value: this.COMPLEXITY.VERYWEAK
	};

	// the length of the password
	this.PasswordLength =
	{
		count  : 0,
		minimum: 8,
		formula: "TBD",
		status : this.STATUS.FAILED,
		rating : 0,
		factor : 0.5, // per character bonus
		bonus  : 0, // minimum reached? Get a bonus.
		penalty: -10 // if we stay under minimum, we get punished
	};

	// recommended password length
	this.RecommendedPasswordLength =
	{
		count  : 0,
		minimum: 12,
		formula: "TBD",
		status : this.STATUS.FAILED,
		rating : 0,
		factor : 2,
		bonus  : 0,
		penalty: -10
	};

	// the entropy of the password
	this.Entropy =
	{
		count  : 0,
		minimum: 50,
		formula: "TBD",
		status : this.STATUS.FAILED,
		rating : 0,
		factor : 0.5,
		bonus  : 0, // minimum reached? Get a bonus.
		penalty: 0 // if we stay under minimum, we get punished
	};

	// Basic requirements are:
	// 1) Password Length
	// 2) Uppercase letter use
	// 3) Lowercase letter use
	// 4) Numeric character use
	// 5) Symbol use
	this.BasicRequirements =
	{
		count  : 0,
		minimum: 4, // have to be matched to get the bonus
		formula: "TBD",
		status : this.STATUS.FAILED,
		rating : 0,
		factor : 2,
		bonus  : 10,
		penalty: 0
	};

	// how much redundancy is permitted, if the password is
	// long enough. we will skip the redudancy penalty if this
	// number is not exceeded (meaning redundancy < this number)
	this.Redundancy =
	{
		count  : 1, // 1 means, not double characters, default to start
		maximum: 2.0, // 2 means, in average every character can occur twice
		formula: "TBD",
		status : this.STATUS.FAILED,
		rating : 0,
		factor : -3,
		bonus  : 0,
		penalty: 0
	};

	// number of uppercase letters, such as A-Z
	this.UppercaseLetters =
	{
		count  : 0,
		minimum: 1,
		formula: "TBD",
		status : this.STATUS.FAILED,
		rating : 0,
		factor : 0,
		bonus  : 10,
		penalty: 0
	};

	// number of lowercase letters, such as a-z
	this.LowercaseLetters =
	{
		count  : 0,
		minimum: 1,
		formula: "TBD",
		status : this.STATUS.FAILED,
		rating : 0,
		factor : 0,
		bonus  : 10,
		penalty: 0
	};

	// number of numeric characters
	this.Numerics =
	{
		count  : 0,
		minimum: 1,
		formula: "TBD",
		status : this.STATUS.FAILED,
		rating : 0,
		factor : 0,
		bonus  : 10,
		penalty: 0
	};

	// number of symbol characters
	this.Symbols =
	{
		count  : 0,
		minimum: 1,
		formula: "TBD",
		status : this.STATUS.FAILED,
		rating : 0,
		factor : 0,
		bonus  : 10,
		penalty: 0
	};

	// number of dedicated symbols in the middle
	this.MiddleSymbols =
	{
        data   : ["^.*[0-9a-zA-Z].*[^0-9a-zA-Z]+.*[0-9a-zA-Z].*$"],
		count  : 0,
		minimum: 1,
		formula: "TBD",
		status : this.STATUS.FAILED,
		rating : 0,
		factor : 0,
		bonus  : 10,
		penalty: 0
	};

	// number of dedicated numbers in the middle
	this.MiddleNumerics =
	{
        data   : ["^.*[^0-9].*[0-9]+.*[^0-9].*$"],
		count  : 0,
		minimum: 1,
		formula: "TBD",
		status : this.STATUS.FAILED,
		rating : 0,
		factor : 0,
		bonus  : 10,
		penalty: 0
	};

	// how many sequential characters should be checked
	// such as "abc" or "MNO" to be not part of the password
	this.SequentialLetters =
	{
		data: "abcdefghijklmnopqrstuvwxyz",
		length: 3,

		count: 0,

		formula: "TBD",
		status: this.STATUS.FAILED,
		rating: 0,
		factor: -1,
		bonus: 0,
		penalty: -10
	};

	// how many sequential characters should be checked
	// such as "123" to be not part of the password
	this.SequentialNumerics =
	{
		data: "0123456789",
		length: 3,

		count: 0,

		formula: "TBD",
		status: this.STATUS.FAILED,
		rating: 0,
		factor: -1,
		bonus: 0,
		penalty: -10
	};

	// keyboard patterns to check, typical sequences from your
	// keyboard
	this.KeyboardPatterns =
	{
		// german and english keyboard text
		data: [	"qwertzuiopasdfghjklyxcvbnm", "!\"§$%&/()=", // de
				"1234567890", // de numbers
				"qaywsxedcrfvtgbzhnujmik,ol.pö-üä+#", // de up-down

			    "qwertyuiopasdfghjklzyxcvbnm", "!@#$%^&*()_", // en
				"1234567890", // en numbers
		        "qazwsxedcrfvtgbyhnujmik,ol.p;/[']\\" // en up-down
		],
		length: 3, // how long is the pattern to check and blame for?

		count: 0, // how much of these pattern can be found

		formula: "TBD",
		status: this.STATUS.FAILED,
		rating: 0,
		factor: -1, // each occurence is punished with that factor
		bonus: 0,
		penalty: -10
	};

    ASCII: " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~",

    // just to avoid to have plain years in the password
	this.YearPatterns =
	{
		data: ["1[89][0-9][0-9]", "2[01][0-9][0-9]"],
		length: 4, // how long is the pattern to check and blame for?

		count: 0, // how much of these pattern were found

		formula: "TBD",
		status: this.STATUS.FAILED,
		rating: 0,
		factor: -5, // each occurence is punished with that factor
		bonus: 0,
		penalty: -10
	};

	// check for repeated sequences, like in catcat
	this.RepeatedSequences =
	{
		length: 3,

		count  : 0,
		formula: "TBD",
		status : this.STATUS.FAILED,
		rating : 0,
		factor : 1,
		bonus  : 0,
		penalty: -10
	};

	// check for repeated sequences, like in catcat
	this.MirroredSequences =
	{
		length: 3,

		count  : 0,
		formula: "TBD",
		status : this.STATUS.FAILED,
		rating : 0,
		factor : 0,
		bonus  : 0,
		penalty: -10
	};


    // taken from https://github.com/mvhenten/string-entropy/blob/master/index.js
    // MIT License Copyright (c) 2014 Matthijs van Henten
	// Tests: Spec.determineEntropy.js
    this.calculateEntropy = function(password) {
        var LOWERCASE_ALPHA = 'abcdefghijklmnopqrstuvwxyz';
        var UPPERCASE_ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var DIGITS = '0123456789';
        var PUNCT1 = '!@#$%^&*()';
        var PUNCT2 = '~`-_=+[]{}\\|;:\'",.<>?/';

        // Calculate the size of the alphabet.
        //
        // This is a mostly back-of-the hand calculation of the alphabet.
        // We group the a-z, A-Z and 0-9 together with the leftovers of the keys on an US keyboard.
        // Characters outside ascii add one more to the alphabet. Meaning that the alphabet size of the word:
        // "ümlout" will yield 27 characters. There is no scientific reasoning behind this, besides to
        // err on the save side.
        /**
         * @param {Str} str String to calculate the alphabet from
         * @returns {Number} n Size of the alphabet
         */
        function alphabetSize(str) {
            var c, size = 0,
                collect = {
                    unicode: 0,
                    size: 0
                };

            for (var i = 0; i < str.length; i++) {
                c = str[i];

                // we only need to look at each character once
                if (str.indexOf(c) !== i) continue;
                if (LOWERCASE_ALPHA.indexOf(c) !== -1) collect.alpha = LOWERCASE_ALPHA.length;
                else if (UPPERCASE_ALPHA.indexOf(c) !== -1) collect.alcaps = UPPERCASE_ALPHA.length;
                else if (DIGITS.indexOf(c) !== -1) collect.digits = DIGITS.length;
                else if (PUNCT1.indexOf(c) !== -1) collect.punct1 = PUNCT1.length;
                else if (PUNCT2.indexOf(c) !== -1) collect.size = PUNCT2.length;
                // I can only guess the size of a non-western alphabet.
                // The choice here is to grant the size of the western alphabet, together
                // with an additional bonus for the character itself.
                //
                // Someone correct me if I'm wrong here.
                else if (c.charCodeAt(0) > 127) {
                    collect.alpha = 26;
                    collect.unicode += 1;
                }
            }

            for (var k in collect) {
                size += collect[k];
            }

            return size;
        };

        // Calculate [information entropy](https://en.wikipedia.org/wiki/Password_strength#Entropy_as_a_measure_of_password_strength)
        if (!password) {
            return 0;
        };

        this.Entropy.count = Math.round(password.length * (Math.log(alphabetSize(password)) / Math.log(2)));
        return this.Entropy.count;
    };


	// Count the type of characters in use
	// Everything that is not a-z, A-Z or 0-9 is a special character
	// Tests: Spec.determineCharacters.js
    this.determineCharacters = function(passwordArray)
    {
        // check the password and set all values
        var nTmpAlphaUC = -1;
        var nTmpAlphaLC = -1;
        var nTmpNumber  = -1;
        var nTmpSymbol  = -1;

        // Loop through password to check for Symbol, Numeric, Lowercase
		// and Uppercase pattern matches
        for (var a = 0; a < passwordArray.length; a++)
        {
			// check uppercase letters
            if (passwordArray[a].match(/[A-Z]/g))
            {
                if (nTmpAlphaUC != -1)
				{
					// check last uppercase position, when the previous one, store
					// the information
					if ((nTmpAlphaUC + 1) == a)
					{
						this.nConsecutiveUppercaseLetters++;
						this.nConsecutiveLetters++;
					}
				}
				// store the last uppercase position
                nTmpAlphaUC = a;

                this.UppercaseLetters.count++;
            }
			// check lowercase
            else if (passwordArray[a].match(/[a-z]/g))
            {
                if (nTmpAlphaLC != -1)
				{
					if ((nTmpAlphaLC + 1) == a)
					{
						this.nConsecutiveLowercaseLetters++;
						this.nConsecutiveLetters++;
					}
				}
                nTmpAlphaLC = a;
                this.LowercaseLetters.count++;
            }
			// check numeric
            else if (passwordArray[a].match(/[0-9]/g))
            {
                if (nTmpNumber != -1)
				{
					if ((nTmpNumber + 1) == a)
					{
						this.nConsecutiveNumbers++;
						this.nConsecutiveLetters++;
					}
				}
                nTmpNumber = a;
                this.Numerics.count++;
            }
			// check all extra characters
            else if (passwordArray[a].match(new RegExp(/[^a-zA-Z0-9]/g)))
            {
                if (nTmpSymbol != -1)
				{
					if ((nTmpSymbol + 1) == a)
					{
						this.nConsecutiveSymbols++;
						this.nConsecutiveLetters++;
					}
				}
                nTmpSymbol = a;
                this.Symbols.count++;
            }
        }
    };

    // determine redundancy
    // check the variance of symbols or better the redundancy
    // makes only sense for at least two characters
	// Tests: Spec.determineRedundancy.js
    this.determineRedundancy = function (passwordArray)
    {
		if (passwordArray.length > 1)
        {
			var uniqueCharacters = new Array();
		    for (var a = 0; a < passwordArray.length; a++)
            {
				var found = false;

				for (var b = a + 1; b < passwordArray.length; b++)
                {
					if (passwordArray[a] == passwordArray[b])
                    {
						found = true;
					}
				}
				if (found == false)
                {
					uniqueCharacters.push(passwordArray[a]);
				}
			}

			// calculate a redundancy number
			this.Redundancy.count = (passwordArray.length / uniqueCharacters.length).toFixed(1);

        }
        else
        {
            if (passwordArray.length == 1)
            {
                this.Redundancy.count = 1.0;
            }
            else
            {
                this.Redundancy.count = 0.0;
            }
        }
        this.Redundancy.count = Number(this.Redundancy.count);
        return this.Redundancy.count;
    };

    // Check for sequential alpha string patterns (forward and reverse) but only, if the string
    // has already a length to check for, does not make sense to check the password "ab" for the
    // sequential data "abc"
	// Tests: Spec.determineSequentialLetters.js
    this.determineSequentialLetters = function (lowercasedPassword)
    {
        if (lowercasedPassword.length >= this.SequentialLetters.length)
		{
            // because of the rotation at the end
            var sl = this.SequentialLetters.data + this.SequentialLetters.data.substring(0, this.SequentialLetters.length);

			for (var s = 0; s < sl.length - this.SequentialLetters.length; s++)
			{
				var sFwd = sl.substring(s, s + this.SequentialLetters.length);
				var sRev = this.strReverse(sFwd);

				if (lowercasedPassword.indexOf(sFwd) != -1)
				{
					this.SequentialLetters.count++;
				}
				if (lowercasedPassword.indexOf(sRev) != -1)
				{
					this.SequentialLetters.count++;
				}
			}
		}
    }

	// Check for sequential numeric string patterns (forward and reverse)
	// Tests: Spec.determineSequentialNumerics.js
    this.determineSequentialNumerics = function (lowercasedPassword)
    {
        var sn = this.SequentialNumerics.data + this.SequentialNumerics.data.substring(0, this.SequentialNumerics.length);

		if (lowercasedPassword.length >= this.SequentialNumerics.length)
		{
			for (var s = 0; s < sn.length - this.SequentialNumerics.length; s++)
			{
				var sFwd = sn.substring(s, s + this.SequentialNumerics.length);
				var sRev = this.strReverse(sFwd);

				if (lowercasedPassword.indexOf(sFwd) != -1)
				{
					this.SequentialNumerics.count++;
				}
				if (lowercasedPassword.indexOf(sRev) != -1)
				{
					this.SequentialNumerics.count++;
				}
			}
		}
    }

    // Check common keyboard patterns
	// Tests: Spec.determineKeyboardPatterns.js
    this.determineKeyboardPatterns = function (lowercasedPassword)
    {
        var patternsMatched = new Array();
        if (lowercasedPassword.length >= this.KeyboardPatterns.length)
        {
            for (p in this.KeyboardPatterns.data)
            {
                var pattern = this.KeyboardPatterns.data[p];

                for (var s = 0; s <= pattern.length - this.KeyboardPatterns.length; s++)
                {
                    var sFwd = pattern.substring(s, s + this.KeyboardPatterns.length);
                    var sRev = this.strReverse(sFwd);

                    if (lowercasedPassword.indexOf(sFwd) != -1)
                    {
                        if (patternsMatched[sFwd] == undefined)
                        {
                            this.KeyboardPatterns.count++;
                            patternsMatched[sFwd] = sFwd;
                        }
                    }
                    if (lowercasedPassword.indexOf(sRev) != -1)
                    {
                        if (patternsMatched[sRev] == undefined)
                        {
                            this.KeyboardPatterns.count++;
                            patternsMatched[sRev] = sRev;
                        }
                    }
                }
            }
        }
    }

    // Check that we find nothing that looks like a year
	// Tests: Spec.determineYearPatterns.js
    this.determineYearPatterns = function (password)
    {
        if (password.length >= this.YearPatterns.length)
        {
            for (p in this.YearPatterns.data)
            {
                var pattern = this.YearPatterns.data[p];
                var regexp = new RegExp(pattern, "g");

                while (regexp.exec(password))
                {
                    this.YearPatterns.count++;
                }
            }
        }

        return this.YearPatterns.count;
    };

    // Make sure the numbers are not just at the end
    this.determineMiddleNumerics = function (password)
    {
        for (p in this.MiddleNumerics.data)
        {
            var pattern = this.MiddleNumerics.data[p];
            var regexp = new RegExp(pattern, "g");

            if (regexp.exec(password))
            {
                this.MiddleNumerics.count++;
                break; // count only once
            }
        }

        return this.MiddleNumerics.count;
    };

    // Make sure the numbers are not just at the end
	// Tests: Spec.determineMiddleSymbols.js
    this.determineMiddleSymbols = function (password)
    {
        for (p in this.MiddleSymbols.data)
        {
            var pattern = this.MiddleSymbols.data[p];
            var regexp = new RegExp(pattern, "g");

            if (regexp.exec(password))
            {
                this.MiddleSymbols.count++;
                break; // count only once
            }
        }

        return this.MiddleSymbols.count;
    };

    // Try to find repeated sequences of characters.
	// Tests: Spec.determineRepeatedSequences.js
    this.determineRepeatedSequences = function (password)
    {
        if (password.length > this.RepeatedSequences.length)
        {
            for (var s = 0; s <= password.length - this.RepeatedSequences.length; s++)
            {
                var sFwd = password.substring(s, s + this.RepeatedSequences.length);

                var result = password.indexOf(sFwd, s + this.RepeatedSequences.length);
                if (result != -1)
                {
                    this.RepeatedSequences.count++;
                }
            }
        }
    };

    // Try to find mirrored sequences of characters.
	// Tests: Spec.determineMirroredSequences.js
    this.determineMirroredSequences = function (password)
    {
        if (password.length > this.MirroredSequences.length)
        {
            var patternsMatched = new Array();

            for (var s = 0; s <= password.length - this.MirroredSequences.length; s++)
            {
                var sFwd = password.substring(s, s + this.MirroredSequences.length);
                var sRev = this.strReverse(sFwd);

                if (patternsMatched[sFwd] != undefined || patternsMatched[sRev] != undefined)
                {
                    // saw it already, do not repeat
                    continue;
                }

                var result = password.indexOf(sRev, s + this.MirroredSequences.length);
                if (result != -1)
                {
                    patternsMatched[sFwd] = sFwd;
                    patternsMatched[sRev] = sRev;
                    this.MirroredSequences.count++;
                }
            }
        }
    };

	// this check our password and sets all object properties accordingly
    this.checkPassword = function(password)
    {
        // do we have data to check?
        if (!password)
        {
            // no, leave
            password = "";
        }

		// how long is the password?
        this.PasswordLength.count = password.length;
        this.RecommendedPasswordLength.count = password.length;

        // split it, all characters are permitted so far
        var passwordArray = password.split("");

        // Loop through password to check for Symbol, Numeric, Lowercase
		// and Uppercase pattern matches
        this.determineCharacters(passwordArray);

        // count variance
        this.determineRedundancy(passwordArray);

		var lowercasedPassword = password.toLowerCase();

        // Check for sequential alpha string patterns
        this.determineSequentialLetters(lowercasedPassword);

		// Check for sequential numeric string patterns (forward and reverse)
        this.determineSequentialNumerics(lowercasedPassword);

		// Check common keyboard patterns
        this.determineKeyboardPatterns(lowercasedPassword);

        // Try to find repeated sequences of characters.
        this.determineRepeatedSequences(password);

        // Try to find mirrored sequences of characters.
        this.determineMirroredSequences(password);

        // determine the entropy
        this.calculateEntropy(password);

        // find year patterns
        this.determineYearPatterns(password);

        // find numbers in the middle
        this.determineMiddleNumerics(password);

        // find numbers in the middle
        this.determineMiddleSymbols(password);

		//*************************************************************************
		//* Initial score based on length
		//*************************************************************************
        this.Score.count = 0;

		//*************************************************************************
		//* PasswordLength
		//* credit additional length or punish "under" length
		//*************************************************************************
        this.PasswordLength.rating = (this.PasswordLength.count - this.PasswordLength.minimum) * this.PasswordLength.factor;
		if (this.PasswordLength.count < this.PasswordLength.minimum)
		{
			this.PasswordLength.rating += this.PasswordLength.penalty;
		}
		else if (this.PasswordLength.count >= this.PasswordLength.minimum)
		{
			this.PasswordLength.rating += this.PasswordLength.bonus;
		}
		this.Score.count += this.PasswordLength.rating;


		//*************************************************************************
		//* RecommendedPasswordLength
		//* Credit reaching the recommended password length or put a
		//* penalty on it
		//*************************************************************************
        this.RecommendedPasswordLength.rating =
            ((this.PasswordLength.count - this.RecommendedPasswordLength.minimum) * this.RecommendedPasswordLength.factor);
		if (this.PasswordLength.count >= this.RecommendedPasswordLength.minimum)
		{
            this.RecommendedPasswordLength.rating += this.RecommendedPasswordLength.rating;
			this.RecommendedPasswordLength.rating += this.RecommendedPasswordLength.bonus;
		}
		else
		{
			this.RecommendedPasswordLength.rating += this.RecommendedPasswordLength.penalty;
		}
		this.Score.count += this.RecommendedPasswordLength.rating;

		//*************************************************************************
		//* LowercaseLetters
		//* Honor or punish the Lowercase letter use
		//*************************************************************************
		if (this.LowercaseLetters.count > 0)
		{
			this.LowercaseLetters.rating = this.LowercaseLetters.bonus + (this.LowercaseLetters.count * this.LowercaseLetters.factor);
		}
		else
		{
			this.LowercaseLetters.rating = this.LowercaseLetters.penalty;
		}
		this.Score.count += this.LowercaseLetters.rating;

		//*************************************************************************
		//* UppercaseLetters
		//* Honor or punish the uppercase letter use
		//*************************************************************************
		if (this.UppercaseLetters.count > 0)
		{
			this.UppercaseLetters.rating = this.UppercaseLetters.bonus + (this.UppercaseLetters.count * this.UppercaseLetters.factor);
		}
		else
		{
			this.UppercaseLetters.rating = this.UppercaseLetters.penalty;
		}
		this.Score.count += this.UppercaseLetters.rating;

		//*************************************************************************
		//* Numerics
		//* Honor or punish the Numerics letter use
		//*************************************************************************
		if (this.Numerics.count > 0)
		{
			this.Numerics.rating = this.Numerics.bonus + (this.Numerics.count * this.Numerics.factor);
		}
		else
		{
			this.Numerics.rating = this.Numerics.penalty;
		}
		this.Score.count += this.Numerics.rating;

		//*************************************************************************
		//* Symbols
		//* Honor or punish the Symbols letter use
		//*************************************************************************
		if (this.Symbols.count > 0)
		{
			this.Symbols.rating = this.Symbols.bonus + (this.Symbols.count * this.Symbols.factor);
		}
		else
		{
			this.Symbols.rating = this.Symbols.penalty;
		}
		this.Score.count += this.Symbols.rating;

		//*************************************************************************
		//* MiddleSymbols
		//* Honor or punish the MiddleSymbols letter use
		//*************************************************************************
		if (this.MiddleSymbols.count > 0)
		{
			this.MiddleSymbols.rating = this.MiddleSymbols.bonus + (this.MiddleSymbols.count * this.MiddleSymbols.factor);
		}
		else
		{
			this.MiddleSymbols.rating = this.MiddleSymbols.penalty;
		}
		this.Score.count += this.MiddleSymbols.rating;

		//*************************************************************************
		//* MiddleNumerics
		//* Honor or punish the MiddleNumerics letter use
		//*************************************************************************
		if (this.MiddleNumerics.count > 0)
		{
			this.MiddleNumerics.rating = this.MiddleNumerics.bonus + (this.MiddleNumerics.count * this.MiddleNumerics.factor);
		}
		else
		{
			this.MiddleNumerics.rating = this.MiddleNumerics.penalty;
		}
		this.Score.count += this.MiddleNumerics.rating;

		//*************************************************************************
		//* SequentialLetters
		//* Honor or punish the SequentialLetters letter use
		//*************************************************************************
		if (this.SequentialLetters.count == 0)
		{
			this.SequentialLetters.rating = this.SequentialLetters.bonus;
		}
		else
		{
			this.SequentialLetters.rating = this.SequentialLetters.penalty + (this.SequentialLetters.count * this.SequentialLetters.factor);
		}
		this.Score.count += this.SequentialLetters.rating;

		//*************************************************************************
		//* SequentialNumerics
		//* Honor or punish the SequentialNumerics letter use
		//*************************************************************************
		if (this.SequentialNumerics.count == 0)
		{
			this.SequentialNumerics.rating = this.SequentialNumerics.bonus;
		}
		else
		{
			this.SequentialNumerics.rating = this.SequentialNumerics.penalty + (this.SequentialNumerics.count * this.SequentialNumerics.factor);
		}
		this.Score.count += this.SequentialNumerics.rating;

		//*************************************************************************
		//* KeyboardPatterns
		//* Honor or punish the KeyboardPatterns letter use
		//*************************************************************************
		if (this.KeyboardPatterns.count == 0)
		{
			this.KeyboardPatterns.rating = this.KeyboardPatterns.bonus;
		}
		else
		{
			this.KeyboardPatterns.rating = this.KeyboardPatterns.penalty + (this.KeyboardPatterns.count * this.KeyboardPatterns.factor);
		}
		this.Score.count += this.KeyboardPatterns.rating;

		//*************************************************************************
		//* YearPatterns
		//* We do not want to have common years in the password
		//*************************************************************************
		if (this.YearPatterns.count == 0)
		{
			this.YearPatterns.rating = this.YearPatterns.bonus;
		}
		else
		{
			this.YearPatterns.rating = this.YearPatterns.penalty + (this.YearPatterns.count * this.YearPatterns.factor);
		}
		this.Score.count += this.YearPatterns.rating;


		//*************************************************************************
		//* Count our BasicRequirements and set the status
		//*************************************************************************
		this.BasicRequirements.count = 0;

		// password length
		this.PasswordLength.status = this.determineStatus(this.PasswordLength.count - this.PasswordLength.minimum);
		if (this.PasswordLength.status != this.STATUS.FAILED)
		{
			// requirement met
			this.BasicRequirements.count++;
		}

		// uppercase letters
		this.UppercaseLetters.status = this.determineStatus(this.UppercaseLetters.count - this.UppercaseLetters.minimum);
		if (this.UppercaseLetters.status != this.STATUS.FAILED)
		{
			// requirement met
			this.BasicRequirements.count++;
		}

		// lowercase letters
		this.LowercaseLetters.status = this.determineStatus(this.LowercaseLetters.count - this.LowercaseLetters.minimum);
		if (this.LowercaseLetters.status != this.STATUS.FAILED)
		{
			// requirement met
			this.BasicRequirements.count++;
		}

		// numerics
		this.Numerics.status = this.determineStatus(this.Numerics.count - this.Numerics.minimum);
		if (this.Numerics.status != this.STATUS.FAILED)
		{
			// requirement met
			this.BasicRequirements.count++;
		}

		// symbols
		this.Symbols.status = this.determineStatus(this.Symbols.count - this.Symbols.minimum);
		if (this.Symbols.status != this.STATUS.FAILED)
		{
			// requirement met
			this.BasicRequirements.count++;
		}

		// judge the requirement status
		this.BasicRequirements.status = this.determineStatus(this.BasicRequirements.count - this.BasicRequirements.minimum);
		if (this.BasicRequirements.status != this.STATUS.FAILED)
		{
			this.BasicRequirements.rating =
							this.BasicRequirements.bonus +
							(this.BasicRequirements.factor * this.BasicRequirements.count);
		}
		else
		{
			this.BasicRequirements.rating = this.BasicRequirements.penalty;
		}
		this.Score.count += this.BasicRequirements.rating;

		// no basic requirements
		this.RecommendedPasswordLength.status = this.determineStatus(this.PasswordLength.count - this.RecommendedPasswordLength.minimum);
		this.MiddleNumerics.status = this.determineStatus(this.MiddleNumerics.count - this.MiddleNumerics.minimum);
		this.MiddleSymbols.status = this.determineStatus(this.MiddleSymbols.count - this.MiddleSymbols.minimum);
		this.SequentialLetters.status = this.determineBinaryStatus(this.SequentialLetters.count);
		this.SequentialNumerics.status = this.determineBinaryStatus(this.SequentialNumerics.count);
		this.KeyboardPatterns.status = this.determineBinaryStatus(this.KeyboardPatterns.count);
		this.YearPatterns.status = this.determineBinaryStatus(this.YearPatterns.count);

		this.RepeatedSequences.status = this.determineBinaryStatus(this.RepeatedSequences.count);
		this.MirroredSequences.status = this.determineBinaryStatus(this.MirroredSequences.count);

		// we apply them only, if the length is not awesome ;)
		if (this.RecommendedPasswordLength.status != this.STATUS.EXCEEDED)
		{
			//*************************************************************************
			//* RepeatedSequences
			//* Honor or punish the RepeatedSequences letter use
			//*************************************************************************
			if (this.RepeatedSequences.count == 0)
			{
				this.RepeatedSequences.rating = this.RepeatedSequences.bonus;
			}
			else
			{
				this.RepeatedSequences.rating = this.RepeatedSequences.penalty + (this.RepeatedSequences.count * this.RepeatedSequences.factor);
			}
			this.Score.count += this.RepeatedSequences.rating;

			//*************************************************************************
			//* MirroredSequences
			//* Punish the MirroredSequences
			//*************************************************************************
			if (this.MirroredSequences.count == 0)
			{
				this.MirroredSequences.rating = this.MirroredSequences.bonus;
			}
			else
			{
				this.MirroredSequences.rating = this.MirroredSequences.penalty + (this.MirroredSequences.count * this.MirroredSequences.factor);
			}
			this.Score.count += this.MirroredSequences.rating;
		}

		// save value before redundancy
		this.Score.beforeRedundancy = this.Score.count;

        // consider redundancy only if over start value
        if (this.Redundancy.count > this.Redundancy.maximum)
        {
            // full penalty, because password is not long enough, only for a positive score
            if (this.Score.count > 0)
            {
                this.Score.count = this.Score.count + (this.Redundancy.count * this.Redundancy.factor);
            }
        }

		// level it out
		if (this.Score.count > 100)
		{
			this.Score.adjusted = 100;
		}
		else if (this.Score.count < 0)
		{
			this.Score.adjusted = 0;
		}
		else
		{
			this.Score.adjusted = this.Score.count;
		}

		// judge it
		for (var i = 0; i < this.Complexity.limits.length; i++)
		{
			if (this.Score.adjusted <= this.Complexity.limits[i])
			{
				this.Complexity.value = i;
				break;
			}
		}

		return this.Complexity.value;
    };
}
