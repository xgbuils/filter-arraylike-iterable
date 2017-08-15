function filter (p) {
    const obj = Object.create(this.constructor.prototype)
    obj.ps = this.ps.concat([p])
    obj.iterable = this.iterable
    return obj
}

function FilterArrayLikeIterable (iterable) {
    this.iterable = iterable
    this.ps = []
}

Object.defineProperties(FilterArrayLikeIterable.prototype, {
    filter: {
        value: filter
    },
    [Symbol.iterator]: {
        * value () {
            const iterable = this.iterable
            const length = iterable.length
            for (let i = 0; i < length; ++i) {
                const val = iterable[i]
                if (this.ps.every(p => p(val))) {
                    yield val
                }
            }
        }
    }
})

module.exports = FilterArrayLikeIterable
