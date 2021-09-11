# BlueDyeJS

Lightweight javascript library for color manipulations.

## Usage

```javascript
    let color = bluedye('rgb(0,0,255)'), // red
        defaultColor = bluedye(), // transparent
        black = bluedye(false),
        blackToo=bluedye(0),
        white=bluedye(true),
        blue=bluedye('#0000ff'),
        randomColor = bluedye().random();
```

### Supported arguments

input  | equivalent
--- | ---
undefined | rgba(0, 0, 0, 0)
null | rgba(0, 0, 0, 0)
'' | rgba(0, 0, 0, 0)
false | rgba(0, 0, 0, 1)
true | rgba(255, 255, 255, 1)
rgb(0, 0, 0) ... rgb(255, 255, 255) |  rgba(0, 0, 0, 1) ... rgba(255, 255, 255, 1)
Number (0 ... 16777215) | rgba(0, 0, 0, 1) ... rgba(255, 255, 255, 1)



### Export color object as 

#### String

```javascript
    color.css() // "rgb(255,0,0)"
    color.alpha(.6).css() // "rgba(255,0,0,0.6)"
    color.hex() // "#ff0000" (NOTE : hex() does not support alpha values)
    defaultColor.hex() // "#000000"
    defaultColor.css() // "rgba(0,0,0,0)"
```
#### Number
```javascript
    color.number() // 16711680
    black.number() // 0
```

### Tags
```javascript
    var a = bluedye().red(88).blue(11);
    a.RED // 88
    a.BLUE // 11
    a.setTag('red');
    a = 0; // oops our color is gone :(
    // do not worry we can recover it
    var b = bluedye.getColor('my-color');
    b.RED // 88 
    b.BLUE // 11
    b.green(30);
    b.GREEN // 30
    var c = bluedye.getColor('my-color');
    c.GREEN // 30 (my-color is automatically updated)
    c.red(255);
    c.RED // 255
    b.RED // 255 too (b and c represent the same color)
```

## Intallation

```
    $ npm install @yokgs/bluedyejs
```
