const assert = require('assert');
const app = require('../../src/app');

describe('\'guest\' service', () => {
  it('registered the service', () => {
    const service = app.service('guest');

    assert.ok(service, 'Registered the service');
  });
});
