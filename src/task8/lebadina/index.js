/*part1*/
function parseURL(urlString) {
    let urlParts;
    urlParts = urlString.match(/^(https?:)(?:\/\/)?([^\/]+)([^?#]*?)?(\?[^#]*)?(#.*)?$/);

    if (!urlParts) {
        const regex = /^((?<disk>[A-Za-z])(?:\:))?(?<path>.+\/)*(?<fileName>[^\/]+)(?<extension>\.\w+)$/;
        const match = urlString.match(regex);
        if (match) {
            const { disk = '', path = '', fileName, extension } = match.groups;
            return {
                disk,
                path: disk ? `${disk}:${path}` : path,
                fileName,
                extension: extension.slice(1)
            };
        } else {
            return null
        }
    } else {
        const [href, protocol, host, pathname, search, hash] = urlParts;
        return {
            origin: `${protocol || 'https:'}//${host}`,
            protocol: protocol || 'https:',
            username: '',
            password: '',
            host,
            hostname: host,
            href,
            port: '',
            pathname: pathname || '/',
            search: search || '',
            searchParams: new URLSearchParams(search || ''),
            hash: hash || ''
        };
    }
}

//const url1 = new URL('https://developer.mozilla.org/en-US/docs/Web/API/URL');
const url2 = parseURL('https://developer.mozilla.org/en-US/docs/Web/API/URL')
const url3 = parseURL('C:/Program Files/Git/dev.exe');
const url4 = parseURL(`../../utils/extends/define.js`);

// console.log(url2)
// console.log(url3)
// console.log(url4)

/*part2*/
const txt = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias culpa deserunt dicta distinctio fugiat inventore minus, molestiae natus odit optio perferendis quibusdam quod rem sit tempore totam unde velit vitae.`;
const str1 = 'omet'
const str2 = 'Lщrem'
const str3 = 'st'

//магия от жпт, но без регулярок, ищет если одна буква заменена либо пропущена
function levenshtein(a, b) {
    const m = a.length, n = b.length;
    const d = [];
    for (let i = 0; i <= m; i++) {
        d[i] = [i];
    }
    for (let j = 0; j <= n; j++) {
        d[0][j] = j;
    }
    for (let j = 1; j <= n; j++) {
        for (let i = 1; i <= m; i++) {
            const cost = (a[i - 1] === b[j - 1]) ? 0 : 1;
            d[i][j] = Math.min(
                d[i - 1][j] + 1,     // удаление
                d[i][j - 1] + 1,     // вставка
                d[i - 1][j - 1] + cost // замена
            );
        }
    }
    return d[m][n];
}
function find1(word, txt) {
    const words = txt.split(/\W+/);
    const matches = [];

    for (const w of words) {
        if (levenshtein(w, word) <= 1) {
            matches.push(w);
        }
    }
    return matches;
}

// console.log(find1(str1, txt))
// console.log(find1(str2, txt))
// console.log(find1(str3, txt))

//с регуляркой, ищет если одна буква заменена
//например строка abcde
//регулярка: 'любой символ + bcde' либо 'a + любой символ + cde' либо 'ab + любой символ + de' и т.д
function find2(str, txt) {
    const regexStr = str
        .split('')
        .map((char, index) => {
            const before = str.slice(0, index);
            const after = str.slice(index + 1);
            return `${before}.?${after}|${before}.${after}`;
        })
        .join('|');

    return txt.match(new RegExp(regexStr, 'ig'));
}

//
// console.log(find2(str1, txt))
// console.log(find2(str2, txt))
// console.log(find2(str3, txt))

