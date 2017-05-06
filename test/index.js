const expect = require('expect.js');
const objStringify = require('../index');

describe('objStringify', () => {
  let obj;

  beforeEach(() => {
    obj = {};
  });

  it('should convert object to string', () => {
    expect(objStringify(obj)).to.be('{}');
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

    expect( objStringify(obj) ).to.be(expected);
  });

  it('should convert array to string', () => {
    const expected = '[{name:"James",age:25},2,"Just",false]';
    const options = {
      indent: 0,
      singleQuotes: false
    };

    obj = [{name: 'James', age: 25}, 2, 'Just', false];

    expect( objStringify(obj, options) ).to.be(expected);
  })
});

