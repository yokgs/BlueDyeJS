const bluedye = require('./src/bluedye.min.js');

var BDAssert = function (tested, expected) {
    if (tested !== expected) {
        throw new Error('Something is wrong!\n'+JSON.stringify(tested)+' != '+JSON.stringify(expected));
    }
}
var color = bluedye();

BDAssert(color.RED, 0);
BDAssert(color.GREEN, 0);
BDAssert(color.BLUE, 0);
BDAssert(color.ALPHA, 0);

BDAssert(color.css(), 'rgba(0,0,0,0)');
BDAssert(color.hex(), '#000000');

color = bluedye('rgb(5.8,3.4,7)');

BDAssert(color.RED, 6);
BDAssert(color.GREEN, 3);
BDAssert(color.BLUE, 7);
BDAssert(color.ALPHA, 1);

BDAssert(color.css(), 'rgb(6,3,7)');
BDAssert(color.hex(), '#060307');

color.alpha(.7);
BDAssert(color.ALPHA, .7);
BDAssert(color.css(), 'rgba(6,3,7,0.7)');
BDAssert(color.hex(), '#060307');

color.red(90);
BDAssert(color.RED, 90);
color.green(17);
BDAssert(color.GREEN, 17);
color.blue(86);
BDAssert(color.BLUE, 86);

BDAssert(color.css(), 'rgba(90,17,86,0.7)');
BDAssert(color.hex(), '#5a1156');

color.alpha(-5) // min = 0 => color.alpha(0)
BDAssert(color.ALPHA, 0);

color.alpha(9) // max = 1 => color.alpha(1)
BDAssert(color.ALPHA, 1);

BDAssert(color.redToBlue().css(), 'rgb(17,86,90)');

BDAssert(color.red(10).blue(32).green(21).css(), 'rgb(10,21,32)');

BDAssert(color.blueToRed().css(), 'rgb(32,10,21)');

BDAssert(color.gray().css(), 'rgb(21,21,21)');

color.setTag('myColor');

var sameColor=bluedye.getColor('myColor');

BDAssert(color.hex(),sameColor.hex());

color.random();
BDAssert(color.hex(),sameColor.hex());
sameColor.random();
BDAssert(color.hex(),sameColor.hex());

sameColor.setTag('BD12');

BDAssert(bluedye.getColor('myColor'),undefined); //why? myColor tag is replaced with BD12

var colorNumber=color.random().number(); //random number 

BDAssert(bluedye(colorNumber).number(),colorNumber); // output === input 

BDAssert(bluedye(true).hex(),'#ffffff');
BDAssert(bluedye(false).setTag('black').css(),'rgb(0,0,0)');
BDAssert(bluedye([67,89,90]).css(),"rgb(67,89,90)")

console.log("Test passed!")
