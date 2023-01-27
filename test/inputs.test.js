const { check, suite } = require('./assert.js');
const bluedye = require('../src/bluedye.js');

suite.start('inputs');

check(bluedye().toArray(), [0, 0, 0, 0]);

check(bluedye(true).toArray(), [255, 255, 255, 1]);

check(bluedye(false).toArray(), [0, 0, 0, 1]);


let r = Math.round(Math.random() * 255);

check(bluedye(r).toArray(), [0, 0, r, 1]);

check(bluedye(r * 256).toArray(), [0, r, 0, 1]);

check(bluedye(r * 256 * 256).toArray(), [r, 0, 0, 1]);

check(bluedye('#f56').toArray(), [0xff, 0x55, 0x66, 1]);

check(bluedye('#f2576d').toArray(), [0xf2, 0x57, 0x6d, 1]);

check(bluedye([r, 0x57, 0x6d, .1]).toArray(), [r, 0x57, 0x6d, .1]);


let random = bluedye.random();

check(bluedye.number(random.number()).css(), random.css());

check(bluedye(random.toArray()).toArray(), random.toArray());

check(bluedye(random.hex()).hex(), random.hex());


suite.complete()