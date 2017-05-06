<h1>obj-stringify</h1>
  <p>This small library helps you to deeple serialize your objects perserving inner functions and objects.</p>
  <br>
  <h2>How is it different from well-known JSON.stringify method? So it </h2>
  <ul>
    <li>Avoids double quotes around properties and values.</li>
    <li>Correctly shows inner RegExp, Functions and so on.</li>
    <li>Allows you to choose single or double quotes for string values.</li>
  </ul>
  <br>
  <h2>Installation</h2>
  <p><code>npm install obj-stringify --save</code></p>
  <h2>Params</h2>
  <h3>objStringify(obj [, options])</h3>
  <br>

  <h3>obj</h3>
  <p>Object you want to stringify.</p>
  <p>Type: <code>Object</code> <code>Array</code></p>
  <p>Required: <code>true</code></p>
  <pre>Note: for non object values will be returned serialized value!</pre>

  <h3>options</h3>
  <p>Formatted configuration. Use it to specify required format and depth of transformation</p>
  <p>Type: <code>Object</code></p>
  <p>Required: <code>false</code></p>
  <h4>You can configure:</h4>

  <h4>options.indent</h4>
  <p>If it is a number then such amount of spaces will be used to make string looks more readable. In case it is a string, it will be used instead of spaces.</p>
  <p>Type: <code>Number</code> <code>String</code></p>
  <p>Default: <code>2</code></p>

  <h4>options.depth</h4>
  <p>The level of accurately transformation. Use it when you don't want to stringify very deep objects</p>
  <p>Type: <code>Number</code></p>
  <p>Default: <code>1000</code></p>

  <h4>options.inline</h4>
  <p>Allows you to return one line string.</p>
  <p>Type: <code>Boolean</code></p>
  <p>Default: <code>false</code></p>

  <h4>options.singleQuotes</h4>
  <p>It defines whether string values inside object should be wrapped in single quotes. Set it to false when you want to get double quotes for string values.</p>
  <p>Type: <code>Boolean</code></p>
  <p>Default: <code>true</code></p>

  <h2>Examples</h2>

  <h2>Restrictions</h2>
