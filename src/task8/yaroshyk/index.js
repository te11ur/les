function parseURL(url) {
	var pattern = /^(?:(\w+):\/\/)?([^:\/]+)(?::(\d+))?(\/[^?#]*)?(?:\?([^#]*))?(?:#(.*))?$/;

	var matches = url.match(pattern);

	if (!matches) {
		throw new Error('Неверный формат URL');
	}

	return {
		protocol: matches[1] || null,
		host: matches[2],
		port: matches[3] || null,
		path: matches[4] || '/',
		query: matches[5] || null,
		fragment: matches[6] || null,
	};
}

var url = 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/RegExp';
var parsedURL = parseURL(url);
console.log(parsedURL);

function findOccurrences(text, word) {
	const regex = new RegExp(word, 'giu'); // 'g' - глобальный поиск, 'i' - игнорировать регистр, 'u' - поддержка юникода

	const matches = text.match(regex);

	if (matches) {
		return matches;
	} else {
		return [];
	}
}

const text = 'По сравнению с собаками кошки не так эмоциональны, и их привязанность заслужить намного сложнее.';
const wordToFind = 'кошки';

const occurrences = findOccurrences(text, wordToFind);

console.log(occurrences);

