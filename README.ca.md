# an-array-of-catalan-words

[English](./README.md) · [Català](./README.ca.md)

[![Versió NPM](https://img.shields.io/npm/v/an-array-of-catalan-words.svg)](https://www.npmjs.com/package/an-array-of-catalan-words)

Llista de ~869.800 paraules en català.

Derivada dels diccionaris Hunspell de [Softcatalà](https://github.com/softcatala/catalan-dict-tools),
processada i filtrada per incloure únicament paraules alfabètiques netes del joc de caràcters català
(`[a-zçàèéíïòóúü]`). Els acrònims i els noms propis estan explícitament exclosos.

Inspirada en l'arquitectura d'[`an-array-of-english-words`](https://github.com/words/an-array-of-english-words)
de [Zeke Sikelianos](https://github.com/zeke).

## Instal·lació

```sh
npm install an-array-of-catalan-words
```

## Ús

```js
const words = require('an-array-of-catalan-words')

console.log(words.length)     // 869829
console.log(words.slice(0, 5))
// [ 'a', 'aaronítica', 'aaronítico', 'ab', 'abaceria' ]

console.log(words.filter(w => w.startsWith('xoc')))
// [ 'xoc', 'xocolata', 'xocolater', ... ]
```

## API

L'exportació per defecte és un `string[]` de paraules en català.

### TypeScript

Els tipus estan inclosos:

```ts
import words = require('an-array-of-catalan-words')

const filtered: string[] = words.filter(w => w.length === 5)
```

## Conjunt de dades

- **Font**: [catalan-dict-tools](https://github.com/softcatala/catalan-dict-tools) (Softcatalà)
- **Llicència**: GPL-2.0-or-later OR LGPL-2.1-or-later OR MPL-1.1
- **Paraules**: ~869.800 paraules úniques en català i en minúscules
- **Filtre**: Només caràcters que coincideixen amb `/^[a-zçàèéíïòóúü]+$/`. S'exclouen els acrònims i els noms propis.

## Construcció

Per regenerar `index.json` des de la font:

```sh
node setup.js               # Descarrega catalan.dic i catalan.aff
npx hunspell-reader words -o data/raw_words.txt -s -u -l data/catalan.dic
node build.js               # Neteja, filtra i genera index.json
```

## Crèdits

- **Dades lingüístiques**: [Softcatalà](https://github.com/softcatala/catalan-dict-tools)
- **Patró arquitectònic**: [Zeke Sikelianos (@zeke)](https://github.com/zeke) — [`an-array-of-english-words`](https://github.com/words/an-array-of-english-words)

## Llicència

(GPL-2.0-or-later OR LGPL-2.1-or-later OR MPL-1.1) © Pablo G. Guízar
