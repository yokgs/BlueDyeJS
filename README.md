# BlueDyeJS

Lightweight javascript library for color manipulations.

![1.3.0](https://img.shields.io/github/package-json/v/yokgs/BlueDyeJS?color=%23118cff&style=for-the-badge)

![MIT](https://img.shields.io/github/license/yokgs/BlueDyeJS?color=%23007bff&style=for-the-badge)
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

<table>
    <tr>
        <td>input</td>
        <td>equivalent</td>
    </tr>
    <tr>
        <td>undefined</td>
        <td>rgba(0, 0, 0, 0)</td>
    </tr>
    <tr>
        <td>null</td>
        <td>rgba(0, 0, 0, 0)</td>
    </tr>
    <tr>
        <td>''</td>
        <td>rgba(0, 0, 0, 0)</td>
    </tr>
    <tr>
        <td>false</td>
        <td>rgba(0, 0, 0, 1)</td>
    </tr>
    <tr>
        <td>true</td>
        <td>rgba(255, 255, 255, 1)</td>
    </tr>
    <tr>
        <td>rgb(0, 0, 0) ... rgb(255, 255, 255)</td>
        <td>rgba(0, 0, 0, 1) ... rgba(255, 255, 255, 1)</td>
    </tr>
    <tr>
        <td>Number (0 ... 16777215)<td>
        <td> rgba(0, 0, 0, 1) ... rgba(255, 255, 255, 1)</td>
    </tr>
    <tr>
        <td>[n] ([0] ... [255])<td>
        <td> rgba(n, n, n, 1) (rgba(0, 0, 0, 1) ... rgba(255, 255, 255, 1))</td>
    </tr>
    <tr>
        <td>[r, g, b] ([0, 0, 0] ... [255, 255, 255])<td>
        <td> rgba(r, g, b, 1) (rgba(0, 0, 0, 1) ... rgba(255, 255, 255, 1))</td>
    </tr>
    <tr>
        <td>[r, g, b, a] ([0, 0, 0, 0] ... [255, 255, 255, 1])<td>
        <td> rgba(r, g, b, a) (rgba(0, 0, 0, 0) ... rgba(255, 255, 255, 1))</td>
    </tr>
</table>


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
    a.setTag('my-color');
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
    b.setTag('color1').setTag('color2');
    bluedye.getColor('color1') // undefined (why? each color has only one tag)
    c.tag // color2 (tag 'my-color' is updated to 'color2')
```

### Names

```javascript
    var a = bluedye().red(88).blue(11);
    a.RED // 88
    a.BLUE // 11
    a.name('my-color');
    a = 0; // oops our color is gone :(
    // do not worry we can recover it
    var b = bluedye('my-color'); // or bluedye.name('my-color')
    b.RED // 88 
    b.BLUE // 11
    b.green(30);
    b.GREEN // 30
    var c = bluedye('my-color');
    c.GREEN // 0 (my-color is a constant)
    c.red(255);
    c.RED // 255
    b.RED // still 88 (b and c are two diffrent colors)
    b.name('color1').name('color2');
    bluedye.name('color1') // rgb(88,0,11) (!=undefined)
```

> **Note**: Default colors will be added in the future e.g. red:'#f00', yellow:'#ff0'...

## Intallation

```
    $ npm install @yokgs/bluedyejs
```
