/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const fs = require('fs')
const path = require('path')
const componentGenerator = require('./generators/react/component/index.js')
const rebassGenerator = require('./generators/rebass/index.js')

module.exports = (userContext) => (plop) => {
  const context = Object.assign({ componentDir: 'components/' }, userContext)
  plop.setGenerator('react:component', componentGenerator(context))
  plop.setGenerator('rebass', rebassGenerator(context))

  plop.addHelper('directory', (comp) => {
    try {
      fs.accessSync(
        path.join(context.baseDir, `./containers/${comp}`),
        fs.F_OK
      )
      return `containers/${comp}`
    } catch (e) {
      return `components/${comp}`
    }
  })
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'))
}
