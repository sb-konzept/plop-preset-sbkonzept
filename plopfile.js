const plopPreset = require('./')
const path = require('path')

module.exports = plopPreset({
  baseDir: path.resolve(__dirname, 'testOut')
})
