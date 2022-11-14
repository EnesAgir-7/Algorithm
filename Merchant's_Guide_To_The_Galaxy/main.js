// Subroutines and other utilities are included at the top
const utils = require('./utils/utils.js');
const reader = require('./utils/reader.js');
const parser = require('./utils/parser.js');

// The main block of the program starts below
(async() => {
	console.log('Welcome to the intergalactic unit/item conversion program');
	console.log('-----------------------------------------\n');
	while(true){
		var input = await reader.prompt();
		var answer = parser.parse(input);
		if (answer)
			console.log(`  ${answer}`);
	}
})();


