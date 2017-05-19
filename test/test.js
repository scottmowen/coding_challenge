const assert = require('chai').assert;
const application = require('../app.js');

describe('Application', () => {

  it('returns desired result', () => {
    assert.deepEqual(application("10s Js Qs Ks As"), 'Royal Flush!');
    assert.deepEqual(application("Ah 2h 3h 4h 5h"), 'Straight Flush, Ace to 5');
    assert.deepEqual(application("Ah Ac As Ad 8s"), 'Four of a kind (Aces)');
    assert.deepEqual(application("Ah Ac As 8c 8s"), 'Full House, Aces full of 8s');
    assert.deepEqual(application("Kh Qh 6h 2h 9h"), 'Flush');
    assert.deepEqual(application("10s Jc Qh Ks As"), 'Straight, 10 to Ace');
    assert.deepEqual(application("Ah 2s 3c 4d 5s"), 'Straight, Ace to 5');
    assert.deepEqual(application("Ah Ac As 10d 8s"), 'Three of a kind (Aces)');
    assert.deepEqual(application("Kh Kc 3s 3h 2d"), 'Two Pair (3s and Kings)');
    assert.deepEqual(application("Ah As 10c 7d 6s"), 'Pair of Aces');
    assert.deepEqual(application("Ah 2c Ks 5c 8s"), 'Ace High');
  })
});
