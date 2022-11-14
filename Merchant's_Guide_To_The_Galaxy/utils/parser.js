const utils = require('./utils.js');
const ConversionTable = {};
const MetalPrices = {};

class ParsedAnswer
{
	isValid = false;
	type = '';
	matches = null;
	answer = '';
	constructor(){
	}

	check = function(type, matches){
		return this.isValid;
	}

	getAnswer = function(){
		if (this.isValid)
			return this.answer;
		return null;
	}

	static getInstance(type){
		if (type == 'DEF1')
			return new ParsedAnswerDef1();
		if (type == 'DEF2')
			return new ParsedAnswerDef2();
		if (type == 'QUESTION1')
			return new ParsedAnswerQ1();
		if (type == 'QUESTION2')
			return new ParsedAnswerQ2();
	}
}

// Example: glob is I
// Example: prok is V
class ParsedAnswerDef1 extends ParsedAnswer{
	check = function(type, matches){
		let unit = matches[1];
		let roman = matches[2];
		ConversionTable[unit] = roman;
		return this.isValid = true;
	}
}

// Example: glob glob Silver is 34 Credits
// Example: glob prok Gold is 57800 Credits
class ParsedAnswerDef2 extends ParsedAnswer{
	static galacticToRoman(unitBits){
		var validUnits = unitBits.filter(unit => ConversionTable.hasOwnProperty(unit));
		if (validUnits.length < unitBits.length)
			return false;
		return unitBits.map( bit => ConversionTable[bit]);
	}

	check = function(type, matches){
		var unitBits = matches[1].split(' ');
		var metal = matches[2].toLowerCase();
		var price = parseFloat(matches[3]);
		var priceUnit = matches[4].toLowerCase();
		var romanBits = ParsedAnswerDef2.galacticToRoman(unitBits);
		if (romanBits === false)
			return this.isValid = false;
		var arabicNum = utils.RomanToInt(romanBits.join(''));
		price /= arabicNum;
		MetalPrices[`${metal}/${priceUnit}`] = price;
		return this.isValid = true;
	}
}

// Example: how much is pish tegj glob glob ?
class ParsedAnswerQ1 extends ParsedAnswer{
	check = function(type, matches){
		var unitBits = matches[1].split(' ');
		var romanBits = ParsedAnswerDef2.galacticToRoman(unitBits);
		if (romanBits === false)
			return this.isValid = false;
		this.answer = utils.RomanToInt(romanBits.join(''));
		return this.isValid = true;
	}
}

// Example: how many Credits is glob prok Silver ?
// Example: how many Credits is glob prok Gold ?
// how many Credits is glob prok Iron ?
class ParsedAnswerQ2 extends ParsedAnswer{
	check = function(type, matches){
		var priceUnit = matches[1].toLowerCase();
		var unitBits = matches[2].split(' ');
		var metal = matches[3].toLowerCase();		
		var romanBits = ParsedAnswerDef2.galacticToRoman(unitBits);		
		if (romanBits === false)
			return this.isValid = false;
		var key = `${metal}/${priceUnit}`;
		if (Object.keys(MetalPrices).indexOf(key) == -1)
			return this.isValid = false;
		
		var price = MetalPrices[key];		
		this.answer = utils.RomanToInt(romanBits.join('')) * price;
		return this.isValid = true;
	}
}

exports.parse = (input) => {
	var patterns = {
		'DEF1': /([^\s]+)\s+is\s+([IVXLCDM])/,
		'DEF2': /([^A-Z]+)\s+([A-Z][a-z]*)\s+is\s+([0-9]+)\s+([^\s]+)/,
		'QUESTION1': /[Hh]ow\s+much\s+is\s+(.*)/,
		'QUESTION2' : /[Hh]ow\s+many\s+([A-Z][a-z]+)\s+is\s+(.*)\s+([A-Z][a-z]+)/
	};
	for(var type in patterns)
	{
		var matches = input.match(patterns[type]);
		if (matches == null)
			continue;
		let parsed = ParsedAnswer.getInstance(type);
		let isValid = parsed.check(type, matches);
		if (isValid)
			return parsed.getAnswer();
	}

	return "I have no idea what you're talking about";
};