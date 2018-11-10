const compose = (...functions) => data =>
  functions.reduceRight((accumulator, func) => func(accumulator), data)

const pipe = (...functions) => data =>
functions.reduce((accumulator, func) => func(accumulator), data)

module.exports = {compose, pipe}