/* eslint-env jest */
const pathToUrl = require('./pathToUrl');

describe('pathToUrl', () => {
  it('converts Windows paths to a url path', () => {
    const urlPath = pathToUrl('\\Foo\\bar\\baz');
    expect(urlPath).toMatch('/Foo/bar/baz');
  });

  it('does not affect unix paths', () => {
    const unixPath = pathToUrl('/Foo/bar/baz/');
    expect(unixPath).toMatch('/Foo/bar/baz/');
  });

  it('normalizes path segments', () => {
    const joinedPath = pathToUrl('/','//Foo', 'bar', 'baz/');
    expect(joinedPath).toMatch('/Foo/bar/baz/');
  });
});
