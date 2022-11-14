const readline = require("readline");

exports.prompt = async function(question = ''){
	const reader = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	question = question.trim();
	const answer = await new Promise((resolve) => reader.question(`> ${question}`, resolve));
	reader.close();

	return answer;
}
