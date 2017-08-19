function filter (p) {
    const obj = Object.create(this.constructor.prototype)
    obj.ps = this.ps.push(p)
    obj.iterable = this.iterable
    return obj
}

function FilterArrayLikeIterable (iterable) {
    this.iterable = iterable
    this.ps = createInmutableRawArray([], 0)
}

function push (val) {
    const length = this.length
    let array = this.array
    if (array.length > length) {
        array = array.concat([])
    }
    array[length] = val
    return createInmutableRawArray(array, length + 1)
}

function createInmutableRawArray (array, length) {
    return {
        array,
        push,
        length
    }
}

function every (p, length, arr) {
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
            const ps = this.ps
            for (let i = 0; i < length; ++i) {
                const val = iterable[i]
                if (every(p => p(val), ps.length, ps.array)) {
                    yield val
                }
            }
        }
    }
})

module.exports = FilterArrayLikeIterable
