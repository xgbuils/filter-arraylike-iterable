# filter-arraylike-iterable

[![travis ci][1]][2]
[![npm version][3]][4]
[![Coverage Status][5]][6]
[![Dependency Status][7]][8]

`filter-arraylike-iterable` exports a class that, given an array-like iterable, builds iterables that provide filter method.

## Install

``` bash
$ npm install filter-arraylike-iterable --save
```

## Usage
``` javascript
const FilterArrayLikeIterable = require('filter-arraylike-iterable')

const iterable = new FilterArrayLikeIterable([4, 2, 7, 8, 4, 3, 1]) // (4 7 4 1)
    .filter(e => e % 3 === 1) // (4 7 8 7)
    .filter(e !== 4) // (7 1)

// converting to array:
[...iterable] // [7, 1]

// traversing values:
for (const val of iterable) {
    // ...
}

// creating an iterator that traverses the values
let iterator = iterable[Symbol.iterator]()
iterator.next() // {value: 7, done: false}
iterator.next() // {value: 1, done: false}
iterator.next() // {value: undefined, done: true}

// the same with string
const string = 'abcdef'

new FilterArrayLikeIterable(string) // ('a' 'b' 'c' 'd' 'e' 'f')
    .filter(e => e !== 'c' || e !== 'e') // ('a' 'b' 'd' 'f')

// the same with typed array
const typedArray = new Uint8Array([128, 0, 0, 1])

new FilterArrayLikeIterable(naturals) // (128 0 0 1)
    .filter(e => e !== 0) // (128 1)
```

## Support
- Node.js >=6
- ES2015 transpilers

## License
MIT

  [1]: https://travis-ci.org/xgbuils/filter-arraylike-iterable.svg?branch=master
  [2]: https://travis-ci.org/xgbuils/filter-arraylike-iterable
  [3]: https://badge.fury.io/js/filter-arraylike-iterable.svg
  [4]: https://badge.fury.io/js/filter-arraylike-iterable
  [5]: https://coveralls.io/repos/github/xgbuils/filter-arraylike-iterable/badge.svg?branch=master
  [6]: https://coveralls.io/github/xgbuils/filter-arraylike-iterable?branch=master
  [7]: https://david-dm.org/xgbuils/filter-arraylike-iterable.svg
  [8]: https://david-dm.org/xgbuils/filter-arraylike-iterable
  