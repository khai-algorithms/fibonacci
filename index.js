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
  const {argv: {begin, end}} = require('yargs')
    .usage('Usage: fib --begin=2 --end=36')
    .help('help')
    .options({
      begin: {
        alias: ['start', 's', 'from', 'fr', 'f'],
        describe: 'starting index',
        type: 'number',
        demandOption: false,
        default: 0
      },

      end: {
        alias: ['e', 'n', 'finish', 'to', 't'],
        describe: 'finishing index',
        type: 'number',
        demandOption: true
      },

      help: {
        alias: 'h'
      }
    })
    .showHelpOnFail(true)

  const validate = (value, name, minvalue = 0, minname = 'zero') => {
    if (value < minvalue) {
      console.error(`'${name}' must be greater than or equal to '${minname}'`)
      require('process').exit(1)
    }
  }

  const [aa, zz] = [begin, end].map(x => parseInt(x))
  validate(aa, 'begin')
  validate(zz, 'end')
  validate(zz, 'end', aa, 'begin')

  console.log(`Fibonacci[${aa}..${zz}] =`, new Map(
    Array.from(fibonacci(zz))
      .filter(x => x.index >= aa)
      .map(([x, i]) => [i, x])
  ))
} else {
  module.exports = fibonacci
}
