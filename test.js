const test = require('tape')
const tapSpec = require('tap-spec')

const FilterArrayLikeIterable = require('./')

const array = Object.freeze([1, 2, 3, 4, 5])

test('constructor', function (t) {
    t.test('empty array', function (st) {
        const iterable = new FilterArrayLikeIterable([])
        st.deepEqual([...iterable], [],
            'must return an empty iterable')
        st.end()
    })
    t.test('non-empty array', function (st) {
        const iterable = new FilterArrayLikeIterable(array)
        st.deepEqual([...iterable], array,
            'must return an iterable with the same values')
        st.end()
    })

    t.test('empty string', function (st) {
        const iterable = new FilterArrayLikeIterable('')
        st.deepEqual([...iterable], [],
            'must return an empty iterable')
        st.end()
    })
    t.test('non-empty string', function (st) {
        const iterable = new FilterArrayLikeIterable('abcd')
        st.deepEqual([...iterable], [...'abcd'],
            'must return an iterable with the same values')
        st.end()
    })

    t.end()
})

test('filter', function (t) {
    t.test('empty array', function (st) {
        const iterable = new FilterArrayLikeIterable([])
            .filter(() => true)
        st.deepEqual([...iterable], [],
            'must return an empty iterable')
        st.end()
    })
    t.test('filter some values', function (st) {
        const iterable = new FilterArrayLikeIterable(array)
            .filter(e => e % 2 === 0)
        const expected = array
            .filter(e => e % 2 === 0)
        st.deepEqual([...iterable], expected,
            'must filter the values that predicate returns true')
        st.end()
    })
    t.test('filter all', function (st) {
        const iterable = new FilterArrayLikeIterable(array)
            .filter(e => e <= 5)
        st.deepEqual([...iterable], array,
            'must filter all of values')
        st.end()
    })
    t.test('filter any', function (st) {
        const iterable = new FilterArrayLikeIterable(array)
            .filter(e => e > 5)
        st.deepEqual([...iterable], [],
            'must not filter any value')
        st.end()
    })
    t.test('chaining', function (st) {
        const iterable = new FilterArrayLikeIterable(array) // (1 2 3 4 5)
            .filter(e => e !== 3) // (1 2 4 5)
            .filter(e => e !== 4) // (1 2 5)
            .filter(e => e >= 2) // (2 5)
        st.deepEqual([...iterable], [2, 5],
            'must behave like Array#filter')
        st.end()
    })

    t.test('using intermediate iterables', function (st) {
        const intermediate = new FilterArrayLikeIterable(array)
            .filter(e => e !== 3) // (1 2 4 5)
        const first = intermediate
            .filter(e => e <= 4) // (1 2 4)
        const second = intermediate
            .filter(e => e > 2) // (4 5)
        st.deepEqual([...first], [1, 2, 4],
            'first result must be correct')
        st.deepEqual([...second], [4, 5],
            'second result must be correct')
        st.end()
    })
    t.end()
})

test.createStream()
    .pipe(tapSpec())
    .pipe(process.stdout)
