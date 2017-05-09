# obj-stringify

  This small library helps you to deeply serialize your objects perserving inner functions and objects.

  ## How is it different from well-known JSON.stringify method? So it

  - Avoids double quotes around properties and values.
  - Correctly shows inner RegExp, Functions and so on.
  - Allows you to choose single or double quotes for string values.

  ## Installation

  ```sh
  $ npm install obj-stringify --save
  ```

  ## Usage
  You can import it using **CommonJS** format
  ```js
  const objStringify = require('obj-stringify')
  ```

  If you work with **RequireJS** module format:
  ```js
  define([
    'node_modules/obj-stringify/index'
  ], function(objStringify) {
    ...
  })
  ```

  Finally if you don't use any module systems you can insert it via script tag and objStringify function would be accessible in global namespace.
  ```js
  // index.html
  <script src="node_modules/obj-strinfigy/index.js"></script>
  <script src="src/app.js"></script>

  // src/app.js
  console.log(typeof objStringify === 'function') // true
  ```

  ## Params

  ## objStringify(obj [, options])
  ### obj

  Object you want to stringify.

  Type: `Object` `Array`

  Required: `true`

  `Note: for other argument types will be returned serialized value!`

  ### options
  Formatted configuration. Use it to specify required format and depth of transformation

  Type: `Object`

  Required: `false`

  #### You can configure:

  #### options.indent
  If it is a number then such amount of spaces will be used to make string look more readable. In case it is a string, it will be used instead of spaces.

  Type: `Number` `String`

  Default: `2`

  #### options.depth
  The level of accurately transformation. Use it when you don't want to stringify very deep objects

  Type: `Number`

  Default: `1000`

  #### options.inline
  Allows you to return one line string.

  Type: `Boolean`

  Default: `false`

  #### options.singleQuotes
  It defines whether string values inside object should be wrapped in single quotes. Set it to false when you want to get double quotes for string values.

  Type: `Boolean`

  Default: `true`

  ## Examples
  ```js
  const obj = {
    module: {
      rules: [
        {
          test: /test\.js$/,
          exclude: 'libs/js/angular'
        }
      ]
    }
  }

  const options = {
    indent: '  ', // use 2 spaces as indent
    singleQuotes: false // use double quotes
  };

  const res = objStringify(obj, options)

  console.log(res)
  /*
  {
    module: {
      rules: [
        {
          test: /test\.js$/,
          exclude: "libs/js/angular"
        }
      ]
    }
  }
  */
  ```

  Show functions correctly:

  ```js
  const helper = {
    methods: [
      {
        sum: function(a, b) {
          return a + b;
        }
      },

      {
        reverse: (str) => str.split('').reverse().join(''),
      }
    ]
  }

  // convert using default options
  const res = objStringify(helper)

  console.log(res)
  /*
  {
    methods: [
      {
        sum: function (a, b) {
            return a + b;
          }
      },
      {
        reverse: (str) => str.split('').reverse().join('')
      }
    ]
  }
  */
  ```

  Using depth:

  ```js
  const status = {
    tasks: {
      inProgress: [
        {id: 22, name: 'create header'}
      ],

      completed: [
        {id: 3, name: 'setup environment'}
      ]
    },

    backlog: [
      {id: 6, name: 'customize player'}
    ]
  }

  const options = {
    depth: 2 // restrict accurate serialization to 2 levels. Deeper this level would be called toString method.
  }

  const res = objStringify(status, options)

  console.log(res)
  /*
  {
    tasks: {
      inProgress: [object Object],
      completed: [object Object]
    },
    backlog: [
      [object Object]
    ]
  }
  */
  ```

  Serialize dates as well:

  ```js
  const carHistory = {
    issued: new Date(2012, 3, 22),

    beginUsedIn: new Date(2012, 8, 3),

    info: {
      accidents: [
        {
          date: new Date(2014, 6, 6),
          damages: []
        }
      ]
    }
  }

  const res = objStringify(carHistory);

  console.log(res)
  // It prints Belarus Standard Time as I am staying there.
  /*
  {
    issued: 'Sun Apr 22 2012 00:00:00 GMT+0300 (Belarus Standard Time)',
    beginUsedIn: 'Mon Sep 03 2012 00:00:00 GMT+0300 (Belarus Standard Time)',
    info: {
      accidents: [
        {
          date: 'Sun Jul 06 2014 00:00:00 GMT+0300 (Belarus Standard Time)',
          damages: []
        }
      ]
    }
  }
  */
  ```

  Pass array as argument:
  ```js
  const cbs = [
    function(val) {
      return val * 2;
    },

    function(val) {
      return !val;
    }
  ]

  const res = objStringify(cbs)

  console.log(res)
  /*
  [
    function (val) {
      return val * 2;
    },
    function (val) {
      return !val;
    }
  ]
  */
  ```

  Using inline option:
  ```js
  const container = {
    name: 'list',
    children: {
      name: 'popup',
      type: 3
    }
  }

  const options = {
    inline: true // returns inline string
  }

  const res = objStringify(container, options)

  console.log(res)

  /*
  {  name: 'list',  children: {    name: 'popup',    type: 3  }}
  */
  ```

  Using sign as indent:
  ```js
  const phone = {
    manufacturer: 'apple'
  }

  const options = {
    indent: '$'
  }

  const res = objStringify(phone, options)

  console.log(res)

  /*
  {
  $manufacturer: 'apple'
  }
  */
  ```

  ## Keep in mind:
  * It doesn't support **circular** references, **non-enumerable** properties, **symbol** properties.

  * It travers through passed object and gradually serializes its value calling **toString** method. So you can define custom toString method on your object and it will be called during serialization.

  * It doesn't support object's subtypes like **Math**, **Navigator**, **history** etc.

  * It can't serialize very deep objects (approximately 10000 levels deep) as browsers have some restrictions for recursion.
