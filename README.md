# an-array-of-catalan-words

[English](./README.md) · [Català](./README.ca.md)

[![NPM version](https://img.shields.io/npm/v/an-array-of-catalan-words.svg)](https://www.npmjs.com/package/an-array-of-catalan-words)

List of ~869,500 Catalan words.

Derived from the [Softcatalà](https://github.com/softcatala/catalan-dict-tools) Hunspell dictionaries,
processed and filtered to include only clean alphabetic words using the Catalan character set
(`[a-zçàèéíïòóúü]`) that contain at least one vowel. Acronyms, abbreviations, and proper nouns are explicitly excluded.

Inspired by the architecture of [`an-array-of-english-words`](https://github.com/words/an-array-of-english-words)
by [Zeke Sikelianos](https://github.com/zeke).

## Install

```sh
npm install an-array-of-catalan-words
```

## Use

```js
const words = require('an-array-of-catalan-words')

console.log(words.length)     // 869422
console.log(words.slice(0, 5))
// [ 'a', 'aa', 'aaleniana', 'aalenianes', 'aalenians' ]

console.log(words.filter(w => w.startsWith('xoc')))
// [ 'xoc', 'xocolata', 'xocolater', ... ]
```

## API

The default export is a `string[]` of Catalan words.

### TypeScript

Types are included:

```ts
import words = require('an-array-of-catalan-words')

const filtered: string[] = words.filter(w => w.length === 5)
```

## Dataset

- **Source**: [catalan-dict-tools](https://github.com/softcatala/catalan-dict-tools) (Softcatalà)
- **License**: GPL-2.0-or-later OR LGPL-2.1-or-later OR MPL-1.1
- **Words**: ~869,500 unique, lowercase Catalan words
- **Filter**: Only characters matching `/^[a-zçàèéíïòóúü]+$/` that contain at least one vowel. Acronyms, abbreviations, and proper nouns are excluded.

## Build

To regenerate `index.json` from source:

```sh
node setup.js               # Download catalan.dic and catalan.aff
# Then expand the dictionary (requires hunspell-reader):
npx hunspell-reader words -o data/raw_words.txt -s -u -l data/catalan.dic
node build.js               # Clean, filter and generate index.json
```

## Credits

- **Linguistic data**: [Softcatalà](https://github.com/softcatala/catalan-dict-tools)
- **Architectural pattern**: [Zeke Sikelianos (@zeke)](https://github.com/zeke) — [`an-array-of-english-words`](https://github.com/words/an-array-of-english-words)

## License

(GPL-2.0-or-later OR LGPL-2.1-or-later OR MPL-1.1) © Pablo G. Guízar
