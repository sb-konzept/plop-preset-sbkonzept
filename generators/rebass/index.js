/**
 * Component Generator
 */

/* eslint strict: ["off"] */

'use strict'

const path = require('path')
const componentExists = require('../../utils/componentExists')

module.exports = context => {
  const resolveBase = p => path.resolve(context.baseDir, p)
  const resolve = p => path.resolve(__dirname, p)
  return ({
    description: 'Add a rebass component',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: 'Select the type of rebass extension',
        default: 'System Component',
        choices: () => ['System Component']
      },
      {
        type: 'list',
        name: 'rebassComponent',
        message: 'Select the type of rebass component to extend',
        choices: () => require('./rebassComponents.json').sort()
      },
      {
        type: 'input',
        name: 'name',
        message: 'What should the component be called?',
        default: (data) => data.rebassComponent,
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
        name: 'wantStory',
        default: true,
        message: 'Do you want to generate a story?'
      }
    ],
    actions: (data) => {
      // Generate index.js and index.test.js
      let componentTemplate

      switch (data.type) {
        default: {
          componentTemplate = resolve('./system.js.hbs')
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

      // If they want a storyfile
      if (data.wantStory) {
        actions.push({
          type: 'add',
          path: resolveBase(`./${context.componentDir}{{properCase name}}/stories.js`),
          templateFile: resolve('./stories.js.hbs'),
          abortOnFail: true
        })
      }

      return actions
    }
  })
}
