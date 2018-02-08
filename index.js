const arrayOf = require('immutable-array.of')
const push = require('immutable-array.push')
const every = require('immutable-array.every')

function filter (p) {
    const obj = Object.create(this.constructor.prototype)
    obj.ps = push(p, this.ps)
    obj.iterable = this.iterable
    return obj
}

function FilterArrayLikeIterable (iterable) {
    this.iterable = iterable
    this.ps = arrayOf([])
}

function apply (value) {
    return every(p => p(value), this.ps) ? {value} : undefined
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
