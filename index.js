#! /usr/bin/env node
const MAX = 1 << 31

function * fibonacci (n = MAX) {
  const mkval = (value, index) =>
    ({value, index, __proto__: [value, index]})

  let [x, y] = [1, 1]

  for (let i = 0; i !== n; ++i) {
    yield mkval(x, i)
    ; [x, y] = [y, x + y]
  }

  yield mkval(y, n)
}

if (require.main === module) {
  require('./executable.js').main(fibonacci)
} else {
  module.exports = fibonacci
}
