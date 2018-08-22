/**
 * Component Generator
 */

/* eslint strict: ["off"] */

'use strict'

const path = require('path')
const componentExists = require('../../../utils/componentExists')

module.exports = context => {
  const resolveBase = p => path.resolve(context.baseDir, p)
  const resolve = p => path.resolve(__dirname, p)

  return ({
    description: 'Add an unconnected component',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: 'Select the type of component',
        default: 'Stateless Function',
        choices: () => ['Stateless Function', 'Styled Component', 'PureComponent', 'Component']
      },
      {
        type: 'input',
        name: 'name',
        message: 'What should it be called?',
        default: 'Button',
        validate: (value) => {
          if (/.+/.test(value)) {
            return componentExists(context, value)
              ? 'A component or container with this name already exists'
              : true
          }

          return 'The name is required'
        }
      },
      {
        type: 'confirm',
        name: 'wantLoadable',
        default: false,
        message: 'Do you want to load the component asynchronously?'
      },
      {
        type: 'confirm',
        name: 'wantStory',
        default: true,
        message: 'Do you want to generate a story?'
      }
    ],
    actions: (data) => {
      // Generate index.js and index.test.js
      let componentTemplate

      switch (data.type) {
        case 'Styled Component': {
          componentTemplate = resolve('./styled.js.hbs')
          break
        }
        case 'Stateless Function': {
          componentTemplate = resolve('./stateless.js.hbs')
          break
        }
        default: {
          componentTemplate = resolve('./class.js.hbs')
        }
      }

      const actions = [
        {
          type: 'add',
          path: resolveBase(`./${context.componentDir}{{properCase name}}/index.js`),
          templateFile: componentTemplate,
          abortOnFail: true
        },
        {
          type: 'add',
          path: resolveBase(`./${context.componentDir}{{properCase name}}/tests/index.test.js`),
          templateFile: resolve('./test.js.hbs'),
          abortOnFail: true
        }
      ]

      // If they want a i18n messages file
      if (data.wantMessages) {
        actions.push({
          type: 'add',
          path: resolveBase(`./${context.componentDir}{{properCase name}}/messages.js`),
          templateFile: resolve('./messages.js.hbs'),
          abortOnFail: true
        })
      }

      // If they want a storyfile
      if (data.wantStory) {
        actions.push({
          type: 'add',
          path: resolveBase(`./${context.componentDir}{{properCase name}}/stories.js`),
          templateFile: resolve('./stories.js.hbs'),
          abortOnFail: true
        })
      }

      // If want Loadable.js to load the component asynchronously
      if (data.wantLoadable) {
        actions.push({
          type: 'add',
          path: resolveBase(`./${context.componentDir}{{properCase name}}/Loadable.js`),
          templateFile: resolve('./loadable.js.hbs'),
          abortOnFail: true
        })
      }

      return actions
    }
  })
}
