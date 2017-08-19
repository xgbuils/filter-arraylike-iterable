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

function every (p, arr) {
    const length = arr.length
    for (let i = 0; i < length; ++i) {
        if (!p(arr[i])) {
            return false
        }
    }
    return true
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
                if (every(p => p(val), this.ps)) {
                    yield val
                }
            }
        }
    }
})

module.exports = FilterArrayLikeIterable
