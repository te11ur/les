const findMatches = (text, pattern) => {
	// const regex = RegExp(pattern, 'gius');
	const regex = RegExp(`\\b${pattern}\\b`, 'sgimu');
	const matches = text.match(regex) || [];
	return matches;
};

const text = 'Привет, меня зовут Freeplay! \nПриветствую hi!';
const patternFirst = 'привет';
const patternSecond = 'freeplay';
const resultFirst = findMatches(text, patternFirst);
const resultSecond = findMatches(text, patternSecond);
console.log(resultFirst, resultSecond);

const parseURL = (url) => {
	const pattern = /(\w+):\/\/([^:/]+)(?::(\d+))?([^?#]+)?(\?[^#]*)?(#.*)?/;
	const match = url.match(pattern);
	return {
		protocol: match[1] || null,
		domain: match[2] || null,
		port: match[3] || null,
		path: match[4] || null,
		query: match[5] || null,
		fragment: match[6] || null,
	};
};

console.log(parseURL('http://example.com/dresses?color=red&size=m '));