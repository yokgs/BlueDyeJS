const bluedye = require('./src/bluedye.js');

var BDAssert = function (tested, expected) {
    if (tested !== expected) {
        throw new Error('Something is wrong!');
    }
}
var color = bluedye();

BDAssert(color.RED,0);
BDAssert(color.GREEN,0);
BDAssert(color.BLUE,0);

BDAssert(color.css(), 'rgb(0,0,0)');

color = bluedye('rgb(6,3,7)');

BDAssert(color.RED,6);
BDAssert(color.GREEN,3);
BDAssert(color.BLUE,7);

BDAssert(color.css(), 'rgb(6,3,7)');

color.red(90);
BDAssert(color.RED, 90);
color.green(17);
BDAssert(color.GREEN, 17);
color.blue(86);
BDAssert(color.BLUE, 86);

BDAssert(color.css(), 'rgb(90,17,86)');

BDAssert(color.redToBlue().css(), 'rgb(17,86,90)');

BDAssert(color.red(10).blue(32).green(21).css(), 'rgb(10,21,32)');

BDAssert(color.blueToRed().css(), 'rgb(32,10,21)');

BDAssert(color.gray().css(), 'rgb(21,21,21)');

console.log("Test passed!")