const { check, suite } = require('./assert.js');
const bluedye = require('../src/bluedye.js');

suite.start('Outputs');

// Create a new color
var color = bluedye();

check(color.toArray(), [0, 0, 0, 0]);
check(color.hex(), '#000000');
check(color.css(), 'rgba(0,0,0,0)');
check(color.number(), 0);


let r = Math.round(Math.random() * 255);

check(bluedye().red(r).number(), r * 256 * 256);

check(bluedye().green(r).number(), r * 256);

check(bluedye().blue(r).number(), r);



let random = bluedye.random().alpha(1);

check(bluedye.number(random.number()).number(), random.number());

check(bluedye.rgba(...random.toArray()).css(), random.css());

check(bluedye(random.hex()).hex(), random.hex());

check(bluedye(random.toArray()).number(), random.number());



suite.complete();