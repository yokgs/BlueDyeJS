const {check, suite} = require('./assert.js');
const bluedye = require('../src/bluedye.js');

suite.start("core functionality");

let d = (new Date()).getTime();

// Create a new color
var color = bluedye();

check(color.RED, 0);
check(color.GREEN, 0);
check(color.BLUE, 0);
check(color.ALPHA, 0);

let r = Math.round(Math.random() * 255);

color.red(r)
check(color.RED, r);

color.green(r)
check(color.GREEN, r);

color.blue(r)
check(color.BLUE, r);

color.alpha(r/255);
check(color.ALPHA, r/255);



suite.complete()