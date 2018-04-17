/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs')
const path = require('path')

function componentExists (context, comp) {
  // const pageComponents = fs.readdirSync(
  //   path.join(context.baseDir, './components')
  // )
  // const pageContainers = fs.readdirSync(
  //   path.join(context.baseDir, './containers')
  // )
  // const components = pageComponents.concat(pageContainers)

  // return components.indexOf(comp) >= 0
  return false
}

module.exports = componentExists
