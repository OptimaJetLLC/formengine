const dbg = !!process.env['DEBUG_LOADER']

const createLogger = (tag) => (...args) => dbg && console.log(tag, ...args)

module.exports = {
  createLogger
}
