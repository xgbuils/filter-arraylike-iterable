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

function apply (value) {
    return this.ps.every(p => p(value)) ? {value} : undefined
}

Object.defineProperties(FilterArrayLikeIterable.prototype, {
    filter: {
        value: filter
    },
    [Symbol.iterator]: {
        value () {
            const self = this
            const iterable = this.iterable
            const length = iterable.length
            let i = 0
            return {
                next () {
                    while (i < length) {
                        const status = apply.call(self, iterable[i])
                        ++i
                        if (status) {
                            return status
                        }
                    }
                    return {done: true}
                }
            }
        }
    }
})

module.exports = FilterArrayLikeIterable
