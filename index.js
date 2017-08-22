const InmutableArray = require('array-inmutable')

function filter (p) {
    const obj = Object.create(this.constructor.prototype)
    obj.ps = this.ps.push(p)
    obj.iterable = this.iterable
    return obj
}

function FilterArrayLikeIterable (iterable) {
    this.iterable = iterable
    this.ps = InmutableArray([])
}

Object.defineProperties(FilterArrayLikeIterable.prototype, {
    filter: {
        value: filter
    },
    [Symbol.iterator]: {
        * value () {
            const iterable = this.iterable
            const length = iterable.length
            const ps = this.ps
            for (let i = 0; i < length; ++i) {
                const val = iterable[i]
                if (ps.every(p => p(val))) {
                    yield val
                }
            }
        }
    }
})

module.exports = FilterArrayLikeIterable
