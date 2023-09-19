const parseURL = (url) => {
	const pattern = /(https?):\/\/([^:/]+)(?::(\d+))?([^?#]+)?(#.*)?/;
	const match = url.match(pattern);

	const parsedUrl = {
		protocol: match[1] || '',
		domain: match[2] || '',
		port: match[3] || '',
		path: match[4] || '',
		fragment: match[5] || '',
	};

	return match ? parsedUrl : null;
};

const url = 'https://learn.javascript.ru:80/regexp-backreferences#obratnaya-ssylka-po-nomeru-n';
console.log(parseURL(url));


const findWord = (str, word) => {
	const pattern = new RegExp(word, 'i');

	const matches = str.match(pattern);
	return matches[0] || null;
}
const str = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
const word = "sImPLy";

const matches = findWord(str, word);
console.log(matches);
