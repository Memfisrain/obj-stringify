const expect = require('expect.js');
const convert = require('../index');

describe('convert', () => {
  let obj;

  beforeEach(() => {
    obj = {};
  });

  it('should convert object to string', () => {
    expect(convert(obj)).to.be('{}');
  });

  it('should correctly convert functions', () => {
    const expected = '{\n' +
                     '  simpleMethod: function () {\n' +
                     '      return \'Hi there\';\n' +
                     '    }\n' +
                     '}';

    obj.simpleMethod = function() {
      return 'Hi there';
    };

    expect( convert(obj) ).to.be(expected);
  });

  it('should convert array to string', () => {
    const expected = '[{name:"James",age:25},2,"Just",false]';
    const options = {
      indentSize: 0,
      singleQuotes: false
    };

    obj = [{name: 'James', age: 25}, 2, 'Just', false];

    expect( convert(obj, options) ).to.be(expected);
  })
});

